import { Stubs } from '@vue/test-utils/dist/types';
import {
  mount,
  MountingOptions,
  RouterLinkStub,
  shallowMount,
  VueWrapper,
} from '@vue/test-utils';
import globalPlugins from '@/components/global';
import { createPinia, setActivePinia } from 'pinia';
import { ComponentPublicInstance } from 'vue';
import App from './App.vue';

/**
 * Stubs transitions by immediately sending render children
 */
const transitionStub = () => ({
  render: function () {
    return this['$options']._renderChildren;
  },
});

/**
 * @description Helper function for mounting a Vue component for testing
 * Note: Shallow-mounting does not render child components, and is preferred for unit-testing
 * @param {Component} component the component to mount
 * @param {MountingOptions} mountOptions optional mounting options to pass to the component
 */
async function mountComponent<T extends ComponentPublicInstance>(
  component,
  mountOptions: MountingOptions<T['$props']> = { shallow: false }
) {
  const pinia = createPinia();
  setActivePinia(pinia);

  const stubs: Stubs = {
    RouterLink: RouterLinkStub,
    'router-view': true,
    transition: transitionStub(),
  };

  const vueInstance: MountingOptions<T['$props']> = {
    global: {
      plugins: [pinia, globalPlugins],
      stubs,
    },
    ...mountOptions,
  };

  const mountMethod = mountOptions.shallow ? shallowMount : mount;
  return mountMethod<T>(component, vueInstance);
}

describe('App.vue', () => {
  let wrapper: VueWrapper | null;

  beforeEach(async () => {
    wrapper = await mountComponent(App);
  });

  afterEach(() => {
    wrapper = null;
  });

  test('should mount correctly', async () => {
    expect(wrapper?.find('#app').exists()).toBe(true);
  });
});
