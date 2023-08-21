<script lang="ts" setup>
import { ref, computed } from "vue";
import type { Action, Header } from "@/types";
import { sharedDefaultProps } from "@/config";
import { getDefault } from "@/helper";

const props = defineProps({
  /**
   * Define the columns with this header property.
   * If not given the inline b-table-column variation is used.
   */
  header: {
    type: Array as () => Array<Header>,
    default: undefined,
  },
  /** List of actions. */
  actions: {
    type: Array as () => Array<Action>,
    default: undefined,
  },
  /** Columns visibility object */
  columnVisibility: {
    type: Object as () => { [column: string]: boolean },
    default: undefined,
  },
  /** The reactive search value. */
  searchValue: {
    type: String,
    default: "",
  },
  /** Enable column configuration options */
  configurable: {
    type: Boolean,
    default: () => getDefault("datatable.configurable", false),
  },
  /** Enable the searchbar */
  searchable: {
    type: Boolean,
    default: () => getDefault("datatable.searchable", false),
  },
  // add global shared props
  ...sharedDefaultProps,
});

const emits = defineEmits<{
  /**
   * Is emitted when the column config get changed
   * @arg value - columng config object
   */
  (e: "update:columnVisibility", value: { [column: string]: boolean }): void;
  /**
   * Is emitted when search value changed
   * @arg value - size value
   */
  (e: "update:searchValue", value: string): void;
  /**
   * Is emitted when the search is triggered
   * @arg value - search value
   */
  (e: "search", value: string): void;
  /**
   * Is emitted when an action is triggered
   * @arg { Action } value - the triggered action
   */
  (e: "action", value: Action): void;
}>();

const selectedAction = ref();

/** Handle search event */
const onSearch = (): void => {
  emits("search", searchInput.value);
};

/** Handle search change event */
const onSearchChange = (value: string): void => {
  if (value === "") {
    searchInput.value = "";
    emits("search", "");
  }
};

/** Handle action event */
const onAction = (selectedAction: Action): void => {
  emits("action", selectedAction);
};

const visibility = computed<{ [column: string]: boolean }>({
  get() {
    return props.columnVisibility || {};
  },
  set(value: { [column: string]: boolean }) {
    emits("update:columnVisibility", value);
  },
});

const searchInput = computed<string>({
  get() {
    return props.searchValue;
  },
  set(value: string) {
    emits("update:searchValue", value);
  },
});
</script>

<template>
  <div class="datatable-nav">
    <div class="datatable-nav-left">
      <slot name="nav-left" />
      <slot name="actions" :actions="actions">
        <o-field
          v-if="actions != null && actions.length > 0"
          class="datatable-actions"
          addonsClass="datatable-actions-wrapper">
          <o-select
            v-model="selectedAction"
            :placeholder="actionPlaceholder"
            aria-role="list"
            :aria-label="actionPlaceholder">
            <option
              v-for="(action, index) in actions"
              :key="index"
              :value="action">
              {{ action.title }}
            </option>
          </o-select>
          <o-tooltip v-show="selectedAction" :label="actionLabel">
            <o-button
              :iconLeft="actionIcon"
              aria-role="button"
              :aria-label="actionPlaceholder"
              @click="onAction(selectedAction)" />
          </o-tooltip>
        </o-field>
      </slot>
      <slot name="nav" />
    </div>

    <div class="datatable-nav-right">
      <slot name="config">
        <o-field v-if="configurable && visibility" class="datatable-config">
          <o-dropdown
            :triggers="['click']"
            aria-role="list"
            position="bottom-left"
            :closeOnClick="false">
            <template #trigger>
              <o-tooltip :label="columnEditLabel">
                <o-button
                  :iconLeft="columnEditIcon"
                  arioRole="button"
                  :aria-label="columnEditLabel" />
              </o-tooltip>
            </template>
            <o-dropdown-item aria-role="listitem" class="config-item">
              {{ columnEditHeader }}
            </o-dropdown-item>
            <o-dropdown-item
              v-for="h of header"
              :key="h.field"
              class="field config-item"
              style="min-width: 17rem"
              aria-role="listitem"
              custom>
              <o-switch v-model="visibility[h.field]">
                {{ h.label }}
              </o-switch>
            </o-dropdown-item>
          </o-dropdown>
        </o-field>
      </slot>

      <slot name="search">
        <o-field
          v-if="searchable"
          addons
          class="datatable-search"
          role="search">
          <o-input
            v-model="searchInput"
            type="search"
            name="search"
            :placeholder="searchPlaceholder"
            @keyup.enter="onSearch"
            @update:modelValue="onSearchChange" />
          <o-button
            variant="primary"
            :iconLeft="searchIcon"
            :title="searchLabel"
            @click="onSearch" />
        </o-field>
      </slot>
      <slot name="nav-right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.datatable-nav {
  display: flex;
  justify-content: space-between;

  .datatable-actions {
    margin-bottom: 0rem;
    margin-right: 0.5rem;

    .datatable-actions-wrapper {
      margin-bottom: 0.5rem;
    }
    button {
      background-color: transparent !important;
      margin-bottom: 0;
      &:hover {
        color: var(--oruga-primary);
      }
    }
    .datatable-config .config-item {
      background-color: transparent;
    }
  }
  .datatable-nav-left,
  .datatable-nav-right {
    display: flex;
    align-items: flex-start;
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 0;

    &:has(*) {
      margin-bottom: 1em;
    }
  }

  .datatable-nav-left {
    justify-content: flex-start;
    > div:not(:first-child) {
      margin-left: 0.75rem;
    }
  }

  .datatable-nav-right {
    justify-content: flex-end;

    > div:not(:last-child) {
      margin-right: 0.75rem;
    }
  }

  @media only screen and (max-width: 992px) {
    flex-direction: column;
  }
}
</style>
