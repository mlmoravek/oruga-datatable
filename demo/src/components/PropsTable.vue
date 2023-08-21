<script lang="ts" setup>
import type { Header } from "oruga-datatable";

const header = [
  {
    field: "name",
    label: "Prop Name",
  },
  {
    field: "type",
    label: "Type",
  },
  {
    field: "default",
    label: "Default",
  },
  {
    field: "desc",
    label: "Description",
  },
] as Header[];

const data = [
  {
    name: "header",
    type: "Header[]",
    desc: "Defines the columns with this header property. If not given the inline b-table-column variation is used.",
  },
  {
    name: "load",
    type: "LoadFunction",
    desc: "If no data prop is set, this load function is called every time the data should be updated.",
  },
  {
    name: "data",
    type: "any[]",
    desc: "An alternativ to the async load function, a sync data object can be set.",
  },
  {
    name: "searchable",
    type: "boolean",
    desc: "Dis/Enable the searchbar",
    default: "false",
  },
  {
    name: "checkable",
    type: "boolean",
    desc: "Dis/Enable a checkbox for every row",
    default: "false",
  },
  {
    name: "paginated",
    type: "boolean",
    desc: "Dis/Enable the paginations bar",
    default: "false",
  },
  {
    name: "detailed",
    type: "boolean",
    desc: "Dis/Enable the detail slot",
    default: "false",
  },
  {
    name: "clickable",
    type: "boolean",
    desc: "Adds class 'is-clickable' to any row",
    default: "false",
  },
  {
    name: "configurable",
    type: "boolean",
    desc: "Dis/Enable config options",
    default: "false",
  },
  {
    name: "customColumns",
    type: "boolean",
    desc: "Dis/Enable custom columns instead of o-table-columns",
    default: "false",
  },
  {
    name: "actions",
    type: "Action[]",
    desc: "Actions for checked rows",
    default: [],
  },
  {
    name: "defaultPage",
    type: "number",
    desc: "",
    default: "0",
  },
  {
    name: "defaultSize",
    type: "number",
    desc: "",
    default: "10",
  },
  {
    name: "defaultSort",
    type: "string",
    desc: "",
    default: "id",
  },
  {
    name: "defaultSortDirection",
    type: '["asc", "desc"]',
    desc: "",
    default: "asc",
  },
  {
    name: "loading",
    type: "boolean",
    desc: "Override loading state",
    default: false,
  },
  {
    name: "showDetailIcon",
    type: "boolean",
    desc: "Override for show-detail-icon from oruga table. If false the click event will trigger open detail ",
    default: "true",
  },
  {
    name: "checkedRows",
    type: "TableRow[]",
    desc: "Checked Rows",
    default: "[]",
  },
  {
    name: "rowClass",
    type: "(row: TableRow, index: number) => string",
    desc: "Add a class to a row based on the return valeue",
  },
  {
    name: "rowKey",
    type: "string",
    desc: "Define the unique primary key field for the row element",
    default: "id",
  },
  {
    name: "",
    type: "",
    desc: "and all props from the original oruga table are possible",
  },
];
</script>

<template>
  <div class="container">
    <h2 class="is-size-3">DataTable Props Definition</h2>
    <DataTable :header="header" :data="data" />
  </div>
</template>
