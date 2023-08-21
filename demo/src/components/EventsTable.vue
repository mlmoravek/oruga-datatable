<script lang="ts" setup>
import type { Header } from "oruga-datatable";

const header = [
  {
    field: "name",
    label: "Event Name",
  },
  {
    field: "props",
    label: "Props",
  },
  {
    field: "desc",
    label: "Description",
  },
] as Header[];

const data = [
  {
    name: "rowClick",
    props: "{ row: TableRow }",
    desc: "Is emitted when an row is clicked",
  },
  {
    name: "udpate:checkedRows",
    props: "{ rows: TableRow[] }",
    desc: "Is two-way binding update hook for checkedRows prop",
  },
  {
    name: "visibilityChange",
    props: "{ columns: { [column: string]: boolean } }",
    desc: "Is emitted when the visibilty for a row change",
  },
  {
    name: "search",
    props: "{ value: string }",
    desc: "Is emitted when the search is triggered",
  },
  {
    name: "filter",
    props: "{ filter: Record<string, string> }",
    desc: "Is emitted when the filter is changed",
  },
  {
    name: "sort",
    props: "{ value: { key: string; dir: string } }",
    desc: "Is emitted when the sort is changed",
  },
  {
    name: "page",
    props: "{ value: { current: number; size: number } }",
    desc: "Is emitted when the page is changed",
  },
  {
    name: "",
    props: "",
    desc: "and all events which came from the original oruga table are possible",
  },
];
</script>

<template>
  <div class="container">
    <h2 class="is-size-3">DataTable Events Definition</h2>
    <DataTable :header="header" :data="data" />
  </div>
</template>
