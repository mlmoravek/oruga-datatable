<script lang="ts" setup>
import { computed } from "vue";
import { sharedDefaultProps } from "@/config";

const props = defineProps({
  /** The current page */
  page: {
    type: Number,
    required: true,
  },
  /** The page size */
  size: {
    type: Number,
    required: true,
  },
  /** Total number of pages */
  total: {
    type: Number,
    required: true,
  },
  // add global shared props
  ...sharedDefaultProps,
});

const emits = defineEmits<{
  /**
   * Is emitted when the current page prop changed
   * @arg value - page value
   */
  (e: "update:page", value: number): void;
  /**
   * Is emitted when the page size prop changed
   * @arg value - size value
   */
  (e: "update:size", value: number): void;
  /**
   * Is emitted when the page  changed
   * @arg value - page value
   */
  (e: "change", value: number): void;
}>();

const currentSize = computed({
  get() {
    return props.size;
  },
  set(value: number) {
    emits("update:size", value);
  },
});

const currentPage = computed({
  get() {
    return props.page + 1;
  },
  set(value: number) {
    emits("update:page", --value);
  },
});

/** Handle page-change event */
const onPageChange = (pageNumber: number): void => {
  emits("change", pageNumber);
};
</script>

<template>
  <div class="datatable-pagination">
    <div class="datatable-pagination-left">
      <slot name="size">
        <o-field horizontal :label="sizesLabel" class="datatable-size">
          <o-select v-model="currentSize" name="size" :aria-label="sizesLabel">
            <option v-for="size in sizes" :key="size" :value="size">
              {{ size }}
            </option>
          </o-select>
        </o-field>
      </slot>
    </div>

    <div class="datatable-pagination-right">
      <slot name="pagination">
        <o-pagination
          v-model:current="currentPage"
          class="pagination"
          order=""
          :perPage="currentSize"
          :total="total"
          :aria-next-label="pageNextLabel"
          :aria-previous-label="pagePreviousLabel"
          :aria-page-label="pageLabel"
          :aria-current-label="pageCurrentLabel"
          @change="onPageChange" />
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.datatable-pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 1em;

  .datatable-pagination-left,
  .datatable-pagination-right {
    display: flex;
    align-items: center;
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 0;
  }
}

.datatable-size {
  align-items: center;
  &,
  :deep(.input-field) {
    margin-bottom: unset;
  }
  :deep(label) {
    margin-right: -5px;
    white-space: nowrap;
  }
  :deep(select) {
    width: auto;
  }
}
</style>
