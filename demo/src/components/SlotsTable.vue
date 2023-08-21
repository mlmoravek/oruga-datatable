<script lang="ts" setup>
import type { Header } from "oruga-datatable";

const header = [
  {
    field: "name",
    label: "Slot Name",
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
    name: "actions",
    props: "{ actions: Action[] }",
    desc: "Override the action section.",
  },
  {
    name: "nav-left",
    props: "{}",
    desc: "Area left of actions section.",
  },
  {
    name: "nav",
    props: "{}",
    desc: "Area right of actions section.",
  },
  {
    name: "nav-right",
    props: "{}",
    desc: "Area right of search section.",
  },
  {
    name: "config",
    props: "{}",
    desc: "Override the column configuration section.",
  },
  {
    name: "search",
    props: "{}",
    desc: "Override the search section.",
  },
  {
    name: "size",
    props: "{}",
    desc: "Override the size section.",
  },
  {
    name: "pagination",
    props: "{}",
    desc: "Override the pagination section.",
  },
  {
    name: "default",
    props: "{}",
    desc: "Override oruga table inner default slot.",
  },
  {
    name: "before",
    props: "{}",
    desc: "Area before columns, if customColumns is enabeled.",
  },
  {
    name: "after",
    props: "{}",
    desc: "Area after columns, if customColumns is enabeled.",
  },
  {
    name: "detail",
    props: "{ row: any, index: number }",
    desc: "Detail area of a row. Is shown if detailed is enabeled.",
  },
  {
    name: "footer",
    props: "{}",
    desc: "Override the footer section.",
  },
  {
    name: "empty",
    props: "{}",
    desc: "Override the empty section.",
  },
  {
    name: "loading",
    props: "{}",
    desc: "Override the loading section.",
  },
];
</script>

<template>
  <div class="container">
    <h2 class="is-size-3">DataTable Slots Definition</h2>
    <DataTable :header="header" :data="data" />
  </div>
</template>
