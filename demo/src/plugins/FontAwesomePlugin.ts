/*
 * This plugin imports specific fontawesome icons into the project
 */

import type { App } from "vue";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faAngleLeft,
  faAngleRight,
  faArrowDown,
  faArrowUp,
  faCaretDown,
  faCaretUp,
  faCheck,
  faCrown,
  faFrown,
  faMagnifyingGlass,
  faPlay,
  faSliders,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

// This is your plugin object. It can be exported to be used anywhere.
export default {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install: (app: App): void => {
    // add all fontawesome icons

    library.add(
      faMagnifyingGlass,
      faCrown,
      faSpinner,
      faArrowUp,
      faArrowDown,
      faAngleLeft,
      faAngleRight,
      faCaretDown,
      faCaretUp,
      faPlay,
      faCheck,
      faSliders,
      faTrash,
      faFrown,
    );

    // add fontawesome icon component
    app.component("fa-icon", FontAwesomeIcon);

    console.debug("FontAwesome Plugin is initialized.");
  },
};
