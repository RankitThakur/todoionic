import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Todo {
  id?: 'string';
  title: 'string';
  text: 'string';
  time: 'string'
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private firestore: Firestore) {}

  ngOnInit() {}


  getAllTodo(): Observable<Todo[]> {
    const todoRef = collection(this.firestore,'todos');
    return collectionData(todoRef, {idField: 'id'} ) as Observable<Todo[]>;
  }

  getTodoId(id): Observable<Todo> {
    const todoRef = doc(this.firestore, `todos/${id}`)
    return docData(todoRef, {idField: 'id'}) as Observable<Todo>
  }

  addTodo(addTodo : Todo) {
    const todoRef = collection(this.firestore, 'todos')
    return addDoc(todoRef,addTodo)
  }

  deleteTodo(delTodo : Todo) {
    const todoRef = doc(this.firestore, `todos/${delTodo.id}`)
    return deleteDoc(todoRef);
  }


  updateTodo(upTodo: Todo) {
    const todo = doc(this.firestore, `todos/${upTodo.id}`);
    return updateDoc(todo, {  itemCategory: upTodo.id,
    title: upTodo.title,
    text: upTodo.text,
    time:upTodo.time
     })
  }


}

