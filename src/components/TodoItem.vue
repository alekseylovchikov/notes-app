<script lang="ts">

import { defineComponent, PropType } from 'vue';
import CustomCheckbox from './CustomCheckbox.vue';
import { TodoItem } from '../models/TodoItem.ts';

export default defineComponent({
  components: { CustomCheckbox },
  props: {
    todo: {
      type: Object as PropType<TodoItem>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    removeTodo(index: number) {
      this.$emit('removeTodo', index);
    },
  },
  emits: {
    removeTodo: (index: number) => Number.isInteger(index),
  },
});
</script>

<template>
  <li>
    <CustomCheckbox v-model="todo.completed" />
    <input
      class="form-control"
      type="text"
      v-model="todo.text"
      placeholder="Текст пункта"
    />
    <button
      class="btn btn-danger"
      type="button"
      @click="removeTodo(index)"
    >
      Удалить
    </button>
  </li>
</template>
