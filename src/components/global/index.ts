// export all global components
import { App } from 'vue';
import vendorPlugins from './vendor';
import extended from './extensions';

/**
 * install function to component-ize the imported components
 * @param app
 */
function install(app: App<Element>): void {
  const plugins = [...vendorPlugins, extended];

  for (const plugin of plugins) {
    app.use(plugin);
  }
}

export default {
  install,
};
