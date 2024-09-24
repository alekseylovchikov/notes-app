import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NotesListView from '../views/NotesListView.vue';
import NoteEditView from '../views/NoteEditView.vue';
import AboutView from '../views/AboutView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'NotesList',
    component: NotesListView,
  },
  {
    path: '/note/new',
    name: 'NoteCreate',
    component: NoteEditView,
  },
  {
    path: '/note/edit/:id',
    name: 'NoteEdit',
    component: NoteEditView,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
