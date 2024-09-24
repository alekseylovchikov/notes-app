<template>
  <div>
    <h1>Список заметок</h1>
    <button class="btn btn-success" @click="createNote">
      Создать новую заметку
    </button>
    <div v-if="notesStore.notes.length">
      <NoteItem v-for="note in notesStore.notes" :key="note.id" :note="note" />
    </div>
    <div v-else>
      <p>Заметок пока нет.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { notesStore } from '../store/notes';
import NoteItem from '../components/NoteItem.vue';

export default defineComponent({
  name: 'NotesListView',
  components: {
    NoteItem,
  },
  setup() {
    const router = useRouter();

    const createNote = () => {
      router.push({ name: 'NoteCreate' });
    };

    return {
      notesStore,
      createNote,
    };
  },
});
</script>
