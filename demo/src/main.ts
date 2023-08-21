import { createApp } from "vue";

// Import Plugins for Demo Environment
import FontAwesomePlugin from "./plugins/FontAwesomePlugin";
import OrugaPlugin from "./plugins/OrugaPlugin";

// Import Datatable Plugin
import DatatablePlugin from "oruga-datatable";

// Import App Component
import App from "./App.vue";

// Import CSS Styles
import "./styles/style.scss";

createApp(App)
  .use(OrugaPlugin)
  .use(FontAwesomePlugin)
  .use(DatatablePlugin)
  .mount("#app");
