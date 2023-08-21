<script lang="ts" setup>
import { loadData } from "@/composables";
import type { Header } from "oruga-datatable";

// define the table columns
const tableHeader = [
  {
    field: "name",
    label: "Name",
  },
  {
    field: "first_brewed",
    label: "First Brewed",
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
  },
] as Header[];
</script>

<template>
  <div class="container">
    <h2 class="is-size-2">Simple DataTable Example</h2>
    <div class="block">This is the simplest form of a paginated DataTable.</div>
    <DataTable
      :header="tableHeader"
      :load="loadData"
      paginated
      :defaultSize="5" />
  </div>
</template>
