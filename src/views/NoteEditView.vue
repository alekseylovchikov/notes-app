<template>
  <div>
    <h1>
      {{ isEditMode ? 'Редактировать заметку' : 'Создать новую заметку' }}
    </h1>
    <form @submit.prevent="saveNote">
      <div>
        <label for="title">Заголовок:</label>
        <input class="form-control" id="title" v-model="note.title" required />
      </div>
      <div>
        <h3>Todo пункты:</h3>
        <ul>
          <li v-for="(todo, index) in note.todos" :key="todo.id">
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
        </ul>
        <button class="btn btn-primary" type="button" @click="addTodo">
          Добавить пункт
        </button>
      </div>
      <div class="buttons">
        <button class="btn btn-success" type="submit">Сохранить</button>
        <button class="btn btn-default" type="button" @click="cancelEditing">
          Отменить редактирование
        </button>
        <button
          class="btn btn-default"
          type="button"
          @click="undoChange"
          :disabled="!canUndo"
        >
          Отменить изменение
        </button>
        <button
          class="btn btn-default"
          type="button"
          @click="redoChange"
          :disabled="!canRedo"
        >
          Повторить изменение
        </button>
        <button
          class="btn btn-danger"
          type="button"
          @click="confirmDelete"
          v-if="isEditMode"
        >
          Удалить
        </button>
      </div>
    </form>

    <ModalDialog
      :visible="showCancelDialog"
      title="Отменить редактирование"
      message="Вы уверены, что хотите отменить редактирование? Все несохраненные изменения будут потеряны."
      confirmText="Да"
      cancelText="Нет"
      @confirm="onCancelConfirm"
      @cancel="onCancelCancel"
    />

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
import { defineComponent, reactive, ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { notesStore } from '../store/notes';
import ModalDialog from '../components/ModalDialog.vue';
import CustomCheckbox from '../components/CustomCheckbox.vue';
import { Note } from '../models/Note';
import cloneDeep from 'lodash.clonedeep';

export default defineComponent({
  name: 'NoteEditView',
  components: {
    ModalDialog,
    CustomCheckbox,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id ? Number(route.params.id) : null;
    const isEditMode = computed(() => id !== null);

    const existingNote = id ? notesStore.getNoteById(id) : null;

    const note = reactive<Note>(
      existingNote
        ? cloneDeep(existingNote)
        : {
            id: 0,
            title: '',
            todos: [],
          }
    );

    const showCancelDialog = ref(false);
    const showDeleteDialog = ref(false);

    const cancelEditing = () => {
      showCancelDialog.value = true;
    };

    const confirmDelete = () => {
      showDeleteDialog.value = true;
    };

    const onCancelConfirm = () => {
      router.push({ name: 'NotesList' });
    };

    const onCancelCancel = () => {
      showCancelDialog.value = false;
    };

    const onDeleteConfirm = () => {
      notesStore.deleteNote(note.id);
      router.push({ name: 'NotesList' });
    };

    const onDeleteCancel = () => {
      showDeleteDialog.value = false;
    };

    const addTodo = () => {
      note.todos.push({
        id: notesStore.getNextTodoId(),
        text: '',
        completed: false,
      });
    };

    const removeTodo = (index: number) => {
      note.todos.splice(index, 1);
    };

    // Undo/Redo функциональность
    let isUndoRedoAction = false;
    const undoStack = ref<Note[]>([]);
    const redoStack = ref<Note[]>([]);

    watch(
      () => cloneDeep(note),
      (newValue, oldValue) => {
        if (!isUndoRedoAction) {
          undoStack.value.push(oldValue);
        }
      },
      { deep: true }
    );

    const canUndo = computed(() => undoStack.value.length > 0);
    const canRedo = computed(() => redoStack.value.length > 0);

    const undoChange = () => {
      if (canUndo.value) {
        isUndoRedoAction = true;
        const previousState = undoStack.value.pop()!;
        redoStack.value.push(cloneDeep(note));
        Object.assign(note, previousState);
        isUndoRedoAction = false;
      }
    };

    const redoChange = () => {
      if (canRedo.value) {
        isUndoRedoAction = true;
        const nextState = redoStack.value.pop()!;
        undoStack.value.push(cloneDeep(note));
        Object.assign(note, nextState);
        isUndoRedoAction = false;
      }
    };

    const saveNote = () => {
      note.todos = note.todos.filter((todo) => todo.text.trim() !== '');

      if (isEditMode.value) {
        notesStore.updateNote(cloneDeep(note));
      } else {
        notesStore.addNote({
          title: note.title,
          todos: note.todos,
        });
      }

      router.push({ name: 'NotesList' });
    };

    return {
      note,
      isEditMode,
      addTodo,
      removeTodo,
      saveNote,
      cancelEditing,
      confirmDelete,
      showCancelDialog,
      showDeleteDialog,
      onCancelConfirm,
      onCancelCancel,
      onDeleteConfirm,
      onDeleteCancel,
      undoChange,
      redoChange,
      canUndo,
      canRedo,
    };
  },
});
</script>

<style scoped>
form div {
  margin-bottom: 16px;
}
ul {
  display: flex;
  gap: 8px;
  flex-direction: column;
  list-style: none;
  margin: 8px 0;
}
li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
