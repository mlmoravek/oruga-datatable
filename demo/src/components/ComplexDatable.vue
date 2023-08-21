<script lang="ts" setup>
import { ref, reactive } from "vue";
import { loadData, onEvent } from "@/composables";
import type { Action, Header } from "oruga-datatable";

const features = reactive({
  paginated: true,
  searchable: true,
  configurable: true,
  clickable: true,
  checkable: true,
  detailed: true,
  filterable: true,
  customColumns: true,
  navArea: true,
  footer: true,
  loading: false,
});

// define the table columns
const tableHeader = [
  {
    field: "name",
    label: "Name",
    searchable: true,
  },
  {
    field: "first_brewed",
    label: "First Brewed",
  },
  {
    field: "volume.value",
    label: "Volume",
  },
  {
    field: "ingredients.hops.0.name",
    label: "Hops",
    searchable: true,
  },
  {
    field: "ingredients.malt.0.name",
    label: "Malt",
    searchable: true,
  },
  {
    field: "food_pairing",
    label: "Food",
    searchable: true,
    optional: true,
  },
  {
    field: "method",
    label: "Method",
    display: (e) =>
      `${e.mash_temp[0].temp?.value} Mash / ${e.fermentation.temp?.value} Fermentation`,
  },
  {
    field: "brewers_tips",
    label: "Tips",
    optional: true,
  },
] as Header[];

const table = ref();

const actions = [
  {
    title: "Delete",
    f: (rows: any): void => onEvent("Delete", rows),
  },
  {
    title: "Open",
    f: (rows: any): void => onEvent("Open", rows),
  },
] as Action[];

// reload the table data - internaly it calls the given load function
const reload = (): void => {
  table.value?.loadContent();
};
</script>

<template>
  <div class="container">
    <h2 class="is-size-2">Complexe DataTable Example</h2>
    <div class="block">
      <p class="is-size-5">Features</p>
      <o-switch v-model="features.paginated">Pagination</o-switch>
      <o-switch v-model="features.checkable">Checkable</o-switch>
      <o-switch v-model="features.searchable">Searchable (Beer Names)</o-switch>
      <o-switch v-model="features.filterable">Filterable</o-switch>
      <o-switch v-model="features.configurable">Column Configuration</o-switch>
      <o-switch v-model="features.clickable">Row clickable</o-switch>
      <o-switch v-model="features.detailed">Row Detailed</o-switch>
      <o-switch v-model="features.customColumns">Custom Columns</o-switch>
      <o-switch v-model="features.loading">Loading State</o-switch>

      <p class="is-size-5">Slots</p>
      <o-switch v-model="features.navArea">Nav Area</o-switch>
      <o-switch v-model="features.footer">Footer</o-switch>
    </div>

    <DataTable
      :key="features.checkable && features.customColumns && features.filterable"
      ref="table"
      :header="tableHeader"
      :load="loadData"
      :paginated="features.paginated"
      :searchable="features.searchable"
      :checkable="features.checkable"
      :detailed="features.detailed"
      :clickable="features.clickable"
      :configurable="features.configurable"
      :customColumns="features.customColumns"
      :loading="features.loading"
      :actions="features.checkable ? actions : []"
      @rowClick="(row: any) =>features.clickable && onEvent('Click', row)">
      <template v-if="features.navArea" #nav>
        <div class="buttons">
          <o-button
            variant="primary"
            label="Add Beer"
            @click="() => onEvent('Add')" />
          <o-button variant="primary" label="Reload Data" @click="reload()" />
        </div>
      </template>

      <template #detail="{ row, index }">{{ index }}: {{ row }} </template>

      <template #after>
        <o-table-column
          :tdAttrs="() => ({ class: 'has-text-right' })"
          v-slot="{ row }">
          <o-tooltip label="Open Beer">
            <a aria-label="Open Beer">
              <o-icon
                icon="magnifying-glass"
                size="medium"
                variant="primary"
                @click="() => onEvent('Edit', row)" />
            </a>
          </o-tooltip>
          <o-tooltip label="Delete Beer">
            <a aria-label="Delete Beer">
              <o-icon
                icon="trash"
                size="medium"
                variant="danger"
                @click="() => onEvent('Delete', row)" />
            </a>
          </o-tooltip>
        </o-table-column>
      </template>

      <template v-if="features.footer" #footer>
        Custom Footer <o-icon icon="crown" />
      </template>
    </DataTable>
  </div>
</template>
