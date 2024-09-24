<template>
  <div class="modal-overlay" v-if="visible">
    <div class="modal-content">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div class="modal-actions">
        <button class="btn btn-success" @click="onConfirm">
          {{ confirmText }}
        </button>
        <button class="btn btn-default" @click="onCancel">
          {{ cancelText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModalDialog',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Подтверждение',
    },
    message: {
      type: String,
      required: true,
    },
    confirmText: {
      type: String,
      default: 'ОК',
    },
    cancelText: {
      type: String,
      default: 'Отмена',
    },
  },
  emits: ['confirm', 'cancel'],
  setup(props, { emit }) {
    const onConfirm = () => {
      emit('confirm');
    };

    const onCancel = () => {
      emit('cancel');
    };

    return {
      onConfirm,
      onCancel,
    };
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
  max-width: 80%;
}
.modal-actions {
  margin-top: 16px;
  text-align: right;
}
.modal-actions button {
  margin-left: 8px;
}
</style>
