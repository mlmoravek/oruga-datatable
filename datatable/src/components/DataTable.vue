<script lang="ts" setup>
/** See Oruga documentation https://oruga.io/components/Table.html */
import {
  computed,
  reactive,
  ref,
  useSlots,
  watch,
  type PropType,
  type VNode,
} from "vue";
import TableNavigation from "@/components/TableNavigation.vue";
import TablePagination from "@/components/TablePagination.vue";
import type { Action, Header, LoadFunction, TableRow } from "@/types";
import { getDefault } from "@/helper";
import { sharedDefaultProps } from "@/config";

/*
 * @Slot default default table slot
 * @Slot func for further functionality in the nav bar
 * @Slot footer table footer slot
 *
 * Also all further props and events will be passed to the oruga-table component,
 * so all props and events of the table component can be used.
 */

const props = defineProps({
  /** Defines the columns with this header property. If not given the inline b-table-column variation is used. */
  header: { type: Array as () => Array<Header>, default: undefined },
  /** If no data prop is given, the load function will be  called each time the data should be updated. */
  load: { type: Function as PropType<LoadFunction>, default: undefined },
  /** An alternativ to the async load function, a sync data object can be set. */
  data: { type: Array, default: undefined },
  /** Actions for checked rows */
  actions: { type: Array as () => Array<Action>, default: () => [] },
  /** Set which rows are checked, use v-model:checkedRows to make it two-way binding */
  checkedRows: { type: Array as () => TableRow[], default: () => [] },
  /** Enable the searchbar */
  searchable: {
    type: Boolean,
    default: () => getDefault("datatable.searchable", false),
  },
  /** Enable a checkbox for every row */
  checkable: {
    type: Boolean,
    default: () => getDefault("datatable.checkable", false),
  },
  /** Enable the paginations bar */
  paginated: {
    type: Boolean,
    default: () => getDefault("datatable.paginated", false),
  },
  /**Enable the detail slot */
  detailed: {
    type: Boolean,
    default: () => getDefault("datatable.detailed", false),
  },
  /** Adds class 'is-clickable' to any row */
  clickable: {
    type: Boolean,
    default: () => getDefault("datatable.clickable", false),
  },
  /** Enable column configuration options */
  configurable: {
    type: Boolean,
    default: () => getDefault("datatable.configurable", false),
  },
  /**
   * Enable custom columns instead of o-table-columns.
   * If activated all properties are added to row element.
   */
  customColumns: {
    type: Boolean,
    default: () => getDefault("datatable.customColumns", false),
  },
  defaultPage: {
    type: Number,
    default: () => getDefault("datatable.defaultPage", 0),
  },
  defaultSize: {
    type: Number,
    default: () => getDefault("datatable.defaultSize", 10),
  },
  defaultSort: {
    type: String,
    default: () => getDefault("datatable.defaultSort", "id"),
  },
  defaultSortDirection: {
    type: String,
    validator: (value: string) => ["asc", "desc"].includes(value),
    default: () => getDefault("datatable.defaultSortDirection", "asc"),
  },
  /**
   * Override for show-detail-icon from oruga table.
   * If false the click event will trigger open detail
   */
  showDetailIcon: {
    type: Boolean,
    default: () => getDefault("datatable.showDetailIcon", true),
  },
  /** Add a class to a row based on the return valeue */
  rowClass: {
    type: Function as PropType<(row: TableRow, index: number) => string>,
    default: () => getDefault("datatable.rowClass", undefined),
  },
  /** Define the unique primary key field for the row element */
  rowKey: {
    type: String,
    default: () => getDefault("datatable.rowKey", "id"),
  },
  /** Override loading state */
  loading: { type: Boolean, default: false },
  // add global shared props
  ...sharedDefaultProps,
  // and all props from oruga table are possible
});

const emits = defineEmits<{
  /**
   * Is emitted when an row is clicked
   * @arg row - The object of the row
   */
  (e: "rowClick", row: TableRow): void;
  /**
   * Is two-way binding update hook for checkedRows prop
   * @arg rows - A list of all checked rows
   */
  (e: "update:checkedRows", rows: TableRow[]): void;
  /**
   * Is emitted when the visibilty for a row change
   * @arg {{ [column: string]: boolean }} rows - The config object for the columns
   */
  (e: "visibilityChange", columns: { [column: string]: boolean }): void;
  /**
   * Is emitted when the search is triggered
   * @arg value - The search string
   */
  (e: "search", value: string): void;
  /**
   * Is emitted when the filter is changed
   * @arg filter - The filter record
   */
  (e: "filter", filter: Record<string, string>): void;
  /**
   * Is emitted when the sort is changed
   * @arg {{ key: string; dir: "asc" | "desc"; }} value - The sort value
   */
  (e: "sort", value: { key: string; dir: string }): void;
  /**
   * Is emitted when the page is changed
   * @arg {{ size: number; current: number }} value - The page value
   */
  (e: "page", value: { current: number; size: number }): void;
}>();

const slots = useSlots();

const tableRef = ref();
const isLoading = ref(false);

const page = reactive({
  current: props.defaultPage,
  size: props.defaultSize,
});
const sort = reactive({
  key: props.defaultSort,
  dir: props.defaultSortDirection,
});
const content = reactive({
  rows: Array<TableRow>(),
  total: 0,
});
const search = ref("");
const filters = ref<Record<string, string>>({});

const cRows = ref(props.checkedRows);
watch(
  () => props.checkedRows,
  (v) => (cRows.value = v),
);
watch(cRows, (rows) => emits("update:checkedRows", rows));

const columnVisibility = ref({} as { [column: string]: boolean });

const columns = computed((): Header[] => {
  // filter the columns in header if they should shown
  return (
    props.header?.map((h: Header) => {
      const visible = columnVisibility.value[h.field];
      h.visible = visible === undefined ? !h.optional : visible;
      return h;
    }) || []
  );
});

const isAsync = computed(() => typeof props.data === "undefined");

watch(
  [
    () => props.header,
    () => props.data,
    () => ({ ...page, ...sort, ...filters.value }),
  ],
  () => loadContent(),
);

watch(
  () => props.header,
  () => setColumnVisibility(),
);
watch(
  () => columnVisibility,
  () => {
    // emit visibility change event
    emits("visibilityChange", columnVisibility.value);
    // set costum column visabiltiy based on columnVisibility
    setCustomColumnVisability();
  },
);

/**
 * Internal function to load data. Use Data Prop or else loadFunc Prop if given.
 * This function can be called from outside to trigger load event.
 **/
const loadContent = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (props.data) {
      // load content from data prop
      content.rows = props.data.map(formatRow);
      content.total = props.data.length;
      resolve();
    } else if (typeof props.load === "function") {
      // else call load function to fetch data async
      isLoading.value = true;
      props
        .load(
          page.current,
          page.size,
          sort.key,
          sort.dir == "asc",
          search.value,
          filters.value,
        )
        .then((data: { rows: TableRow[]; total: number }) => {
          if (!data || !data.rows) return;
          // transforms cells via display property in header settings
          content.rows = data.rows.map(formatRow);
          content.total = props.paginated ? data.total : data.rows.length;
          resolve();
        })
        .catch((e) => reject(e))
        .finally(() => (isLoading.value = false));
    } else {
      reject("Either prop 'data' or 'loadFunc' must be given.");
    }
  });
};

/** Create tableRow object and transforms cells via display property in header settings */
const formatRow = (row: any): TableRow => {
  const tableRow: TableRow = {
    _value: row,
    id: row[props.rowKey],
  };
  // add necessary fields for header to row element
  for (const header of props.header || []) {
    let prop = row[header.field];
    if (header.field?.includes(".")) {
      // override prop with deep value
      prop = row;
      const arr = header.field.split(".");
      while (arr.length && (prop = prop[arr.shift() as string]));
    }
    tableRow[header.field] = header.display ? header.display(prop, row) : prop;
  }
  // add all properties to row element if custom columns are activated
  if (props.customColumns) return Object.assign({}, row, tableRow);
  // else return only row element with props from headers
  else return tableRow;
};

/** set the columnVisibility object based on the header property */
const setColumnVisibility = (): void => {
  columnVisibility.value =
    props.header?.reduce(
      (obj: Header, h: Header) => ({ ...obj, [h.field]: !h.optional }),
      {} as Header,
    ) || {};
  setCustomColumnVisability();
};

/** set the visability for custom columns based on header visability if activated */
const setCustomColumnVisability = (): void => {
  // check defaultSlot o-table-columns and set the visablity there if options.customColumns is activated
  if (props.customColumns && slots.default) {
    const defaultSlots = slots.default();
    (defaultSlots as Array<VNode>).forEach((column: any) => {
      // check if column is included in visible columns
      const visible = columns.value.some(
        (column: Header) =>
          column.props.field && column.field == column.props.field,
      );
      // and always show columns which are no listed in header
      const notInHeader = props.header?.some(
        (h: Header) => h.field != column.props.field,
      );
      // create props object if not exist
      if (!column.props) column.props = {};
      // set column visible property
      if (notInHeader && column.props.visible == undefined)
        column.props.visible = true;
      else if (!notInHeader) column.props.visible = visible;
    });
  }
};

/** emit click event */
const onClick = (obj: any): void => {
  // open detail if detailed is activated and the detail icon isn't shown
  if (props.detailed && !props.showDetailIcon)
    tableRef.value.toggleDetails(obj);

  // emit click event
  emits("rowClick", obj._value);
};

/** handle search value change event */
const onSearch = (searchValue: string): void => {
  page.current = 0;
  emits("search", searchValue);
  loadContent();
};

/** Handle page-change event */
const onPageChange = (pageNumber: number): void => {
  page.current = pageNumber;
  emits("page", page);
};

/** Handle sort event */
const onSort = (field: string, order: string): void => {
  sort.dir = order;
  sort.key = field;
  emits("sort", sort);
};

/** Handle filter event */
const onFilterChange = (filtersRecord: Record<string, string>): void => {
  filters.value = filtersRecord;
  emits("filter", filters.value);
};

/** handle action event */
const doAction = (action: Action): void => {
  action.f(cRows.value).then(() => (cRows.value = []));
};

/** the row-class function add classed to any row from the table */
const rowClassFunction = (row: TableRow, index: number): string => {
  let classStr = "";
  if ((props.detailed && !props.showDetailIcon) || props.clickable)
    classStr += "is-clickable ";
  if (props.rowClass) classStr += props.rowClass(row, index);
  return classStr;
};

// instanziate columnVisibility object
setColumnVisibility();
// emit first load
loadContent();

/**
 * Components using <script setup> are closed by default and will not expose any of the bindings declared inside.
 * To explicitly expose properties in a component, the defineExpose function must be used.
 */
defineExpose({
  loadContent,
});
</script>

<template>
  <article class="datatable">
    <TableNavigation
      v-model:columnVisibility="columnVisibility"
      v-model:searchValue="search"
      :header="header"
      :actions="actions"
      :searchable="searchable"
      :configurable="configurable"
      @search="onSearch"
      @action="doAction">
      <!-- pass slots down -->
      <template v-for="(index, name) in $slots" #[name]>
        <slot :name="name" />
      </template>
    </TableNavigation>

    <o-table
      v-bind="$attrs"
      ref="tableRef"
      v-model:checked-rows="cRows"
      :data="content.rows"
      :columns="customColumns ? [] : columns"
      customRowKey="id"
      :rowClass="rowClassFunction"
      hoverable
      striped
      :checkable="(actions != null && actions.length > 0) || checkable"
      :customIsChecked="(a: TableRow, b: TableRow) => a.id == b.id"
      :detailed="detailed"
      detailTransition="fade"
      detailKey="id"
      :showDetailIcon="showDetailIcon"
      :paginated="paginated"
      :backendPagination="isAsync"
      :backendFiltering="isAsync"
      :debounceSearch="800"
      :total="content.total"
      :perPage="paginated ? page.size : content.total"
      :currentPage="page.size < content.rows.length ? page.current + 1 : 1"
      :backendSorting="isAsync"
      :defaultSort="[sort.key, sort.dir]"
      wrapperClass="table-wrapper"
      @page-change="onPageChange"
      @sort="onSort"
      @click="onClick"
      @filtersChange="onFilterChange">
      <!-- Pagination Slot -->
      <template #pagination>
        <TablePagination
          v-model:size="page.size"
          v-model:page="page.current"
          :total="content.total"
          @change="onPageChange">
          <!-- pass slots down -->
          <template v-for="(index, name) in $slots" #[name]>
            <slot :name="name" />
          </template>
        </TablePagination>
      </template>
      <!-- Default Slot -->
      <template v-if="customColumns || $slots.default">
        <slot>
          <slot name="before" />
          <o-table-column
            v-for="column in columns"
            :key="column.field"
            v-bind="column"
            customKey="id">
            <template #default="{ row }">
              {{ row[column.field] }}
            </template>
            <template v-if="column.searchable" #searchable="props">
              <o-input
                v-model="props.filters[column.field]"
                :placeholder="filterPlaceholder"
                :icon="filterIcon"
                size="small"
                type="search" />
            </template>
          </o-table-column>
          <slot name="after" />
        </slot>
      </template>
      <!-- Detail Slot -->
      <template #detail="{ row, index }">
        <slot name="detail" :row="row._value" :index="index" />
      </template>
      <!-- Footer Slot -->
      <template #footer>
        <slot name="footer" />
      </template>
      <!-- Empty Slot -->
      <template #empty>
        <slot name="empty">
          <section class="section empty">
            <p>
              <o-icon :icon="emptyIcon" size="is-large" />
              {{ emptyLabel }}
            </p>
          </section>
        </slot>
      </template>
      <template #loading>
        <slot name="loading">
          <o-loading
            :active="loading || isLoading"
            :fullPage="false"
            iconClass="is-primary"
            :icon="loadingIcon"
            iconSize="large"
            role="status"
            aria-hidden="true" />
        </slot>
      </template>
    </o-table>
  </article>
</template>

<style lang="scss" scoped>
.datatable {
  width: 100%;

  .section.empty {
    text-align: center;
    padding: 3rem 0;

    .icon {
      margin-right: 0.5em;
    }
  }

  table thead tr th:empty {
    padding: 0;
  }

  :deep(.table tfoot th:empty) {
    border-bottom: unset;
  }
}
</style>
