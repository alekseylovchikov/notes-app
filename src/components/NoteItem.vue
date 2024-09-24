<template>
  <div class="note-item">
    <h2>Название заметки: {{ note.title }}</h2>
    <h4>Список пунктов:</h4>
    <ul class="list">
      <li
        v-for="(todo, index) in truncatedTodos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        {{ todo.text }}
      </li>
    </ul>
    <div class="actions">
      <button class="btn btn-success" @click="editNote">Изменить</button>
      <button class="btn btn-danger" @click="confirmDelete">Удалить</button>
    </div>

    <ModalDialog
      :visible="showDeleteDialog"
      title="Удалить заметку"
      message="Вы уверены, что хотите удалить эту заметку?"
      confirmText="Удалить"
      cancelText="Отмена"
      @confirm="onDeleteConfirm"
      @cancel="onDeleteCancel"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { notesStore } from '../store/notes';
import { Note } from '../models/Note';
import ModalDialog from './ModalDialog.vue';

export default defineComponent({
  name: 'NoteItem',
  components: {
    ModalDialog,
  },
  props: {
    note: {
      type: Object as () => Note,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const showDeleteDialog = ref(false);

    const truncatedTodos = computed(() => props.note.todos.slice(0, 3));

    const editNote = () => {
      router.push({ name: 'NoteEdit', params: { id: props.note.id } });
    };

    const confirmDelete = () => {
      showDeleteDialog.value = true;
    };

    const onDeleteConfirm = () => {
      notesStore.deleteNote(props.note.id);
      showDeleteDialog.value = false;
    };

    const onDeleteCancel = () => {
      showDeleteDialog.value = false;
    };

    return {
      truncatedTodos,
      editNote,
      confirmDelete,
      showDeleteDialog,
      onDeleteConfirm,
      onDeleteCancel,
    };
  },
});
</script>

<style scoped>
.note-item {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
}

.actions {
  margin-top: 8px;
}

.actions button {
  margin-right: 8px;
}

.completed {
  text-decoration: line-through;
  color: gray;
}

.list {
  display: flex;
  list-style: none;
  gap: 2px;
  flex-direction: column;
}
</style>
