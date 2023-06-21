import { QOverlay } from '@quasar/quasar-ui-qoverlay';
import {
  QBadge,
  QKnob,
  QPage,
  QPageContainer,
  Quasar,
  QVirtualScroll,
} from 'quasar';
import iconSet from 'quasar/icon-set/fontawesome-v5';
import { App } from 'vue';

const options = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  iconSet: iconSet,
  config: {
    dark: true,
  },
  components: {
    QBadge,
    QKnob,
    QOverlay,
    QPage,
    QPageContainer,
    QVirtualScroll,
  },
};

export default function install(app: App<Element>) {
  app.use(Quasar, options);
}
