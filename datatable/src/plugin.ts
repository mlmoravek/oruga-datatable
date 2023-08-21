import type { App } from "vue";
import DataTable from "./components/DataTable.vue";

export default {
  install: (app: App): void => {
    // add datatable component to vue app context
    app.component("DataTable", DataTable);
  },
};
