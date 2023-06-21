import ExtBadge from './ExtendedBadge.vue';
import { App } from 'vue';

const wrappers = {
  ExtBadge,
};

function install(app: App<Element>): void {
  for (const [name, comp] of Object.entries(wrappers)) {
    app.component(name, comp);
  }
}

export default {
  install,
};
