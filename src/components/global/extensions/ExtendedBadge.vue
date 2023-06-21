<template>
  <q-badge
    v-bind="{
      ...$props,
      color: variant,
    }"
    :class="['badge', { 'bg-transparent': transparentLabel }]"
  >
    <slot></slot>
  </q-badge>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { QBadge } from 'quasar';

export default defineComponent({
  name: 'ExtendedBadge',
  extends: QBadge,
  props: {
    variant: {
      type: String,
      default: 'primary',
    },
    transparentLabel: Boolean,
  },
});
</script>

<style lang="scss" scoped>
.full-width {
  display: inline-block !important;
  text-align: center;
}
</style>
