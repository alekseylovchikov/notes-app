<template>
  <div class="note-item">
    <h1>Название заметки: {{ note.title }}</h1>
    <div class="separator" />
    <h3>Список пунктов:</h3>
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
      <button class="btn btn-primary" @click="editNote">Изменить</button>
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
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
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
  gap: 2px;
  flex-direction: column;
  list-style: none;
}
</style>
