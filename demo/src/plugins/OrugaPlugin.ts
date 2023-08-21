/*
 * This plugin imports oruga and set a speicifc theme into the vue instance
 */

import type { App } from "vue";
import Oruga from "@oruga-ui/oruga-next";

// Oruga Bootstrap Theme Config
import { bootstrapConfig } from "@oruga-ui/theme-bootstrap";

export default {
  /**
   * Add Oruga to the Vue instance
   * @param app Vue app instance
   * @param options pass external config to oruga via the options property
   */
  install: (app: App, options: any = {}): void => {
    // specific custom default config and override config objects
    const config = {
      iconPack: "fa",
      iconComponent: "fa-icon", // use same component as fotawesomePlugin
      ...bootstrapConfig,
      ...options,
      // component specific global config
      table: {
        mobileCards: false,
      },
    };

    // add oruga plugin
    app.use(Oruga, config);

    console.debug("Oruga Plugin is initialized.");
  },
};
