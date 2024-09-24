import { reactive } from 'vue';
import { Note } from '../models/Note';

let nextNoteId = 1;
let nextTodoId = 1;

export const notesStore = reactive({
  notes: [] as Note[],

  addNote(note: Omit<Note, 'id'>) {
    this.notes.push({ ...note, id: nextNoteId++ });
    this.saveNotes();
  },

  updateNote(updatedNote: Note) {
    const index = this.notes.findIndex((note) => note.id === updatedNote.id);
    if (index !== -1) {
      this.notes[index] = { ...updatedNote };
      this.saveNotes();
    }
  },

  deleteNote(id: number) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.saveNotes();
  },

  getNoteById(id: number): Note | undefined {
    return this.notes.find((note) => note.id === id);
  },

  getNextTodoId() {
    return nextTodoId++;
  },

  loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
      nextNoteId =
        this.notes.length > 0
          ? Math.max(...this.notes.map((n) => n.id)) + 1
          : 1;
      nextTodoId =
        Math.max(...this.notes.flatMap((n) => n.todos.map((t) => t.id)), 0) + 1;
    }
  },

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  },
});

notesStore.loadNotes();
