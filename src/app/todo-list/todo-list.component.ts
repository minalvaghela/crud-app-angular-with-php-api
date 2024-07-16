import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: any[] = [];
  newTodo: any = {};
  errorMessage: string | null = null;
  isEditMode: boolean = false;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getAllTodos().subscribe(
      data => {
        this.todos = data.records;
      },
      error => {
        console.error('Error fetching todos', error);
      }
    );
  }

  saveTodo(): void {
    if (!this.newTodo.title || !this.newTodo.description) {
      this.errorMessage = 'Title and Description are required.';
      return;
    }

    if (this.isEditMode) {
      this.todoService.updateTodo(this.newTodo).subscribe(
        response => {
          this.loadTodos();
          this.resetForm();
        },
        error => {
          this.errorMessage = 'Error updating todo. Please try again.';
          console.error('Error updating todo', error);
        }
      );
    } else {
      this.todoService.addTodo(this.newTodo).subscribe(
        response => {
          this.loadTodos();
          this.resetForm();
        },
        error => {
          this.errorMessage = 'Error adding todo. Please try again.';
          console.error('Error adding todo', error);
        }
      );
    }
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(
      response => {
        this.loadTodos();
      },
      error => {
        console.error('Error deleting todo', error);
      }
    );
  }

  editTodo(todo: any): void {
    this.newTodo = { ...todo };
    this.isEditMode = true;
    this.errorMessage = null;
  }

  resetForm(): void {
    this.newTodo = {};
    this.isEditMode = false;
    this.errorMessage = null;
  }
}
