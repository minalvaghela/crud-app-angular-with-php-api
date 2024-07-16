import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost/todo-api/todo/';

  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'read.php');
  }

  addTodo(todo: { title: string; description: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'create.php', todo);
  }

  updateTodo(todo: { id: number; title: string; description: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'update.php', todo);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.request<any>('DELETE', this.apiUrl + 'delete.php', {
      body: { id }
    });
  }
}
