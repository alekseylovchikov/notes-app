<template>
  <label class="custom-checkbox">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target?.checked)"
    />
    <span class="checkmark"></span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped>
.custom-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: relative;
}

.custom-checkbox input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}

.custom-checkbox .checkmark {
  width: 16px;
  height: 16px;
  background-color: #ccc;
  border-radius: 4px;
  position: relative;
}

.custom-checkbox input:checked + .checkmark {
  background-color: #2196f3;
}

.custom-checkbox .checkmark::after {
  content: '';
  position: absolute;
  display: none;
}

.custom-checkbox input:checked + .checkmark::after {
  display: block;
}

.custom-checkbox .checkmark::after {
  left: 5px;
  top: 1px;
  width: 3px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
