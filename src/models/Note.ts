import { TodoItem } from './TodoItem';

export interface Note {
  id: number;
  title: string;
  todos: TodoItem[];
}
