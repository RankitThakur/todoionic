import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController, ModalController } from '@ionic/angular';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit{
  @Input() id: string;
  todo: Todo;

  constructor(
    private todoservice: TodoService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {  }


ngOnInit(): void {
  this.todoservice.getTodoId(this.id).subscribe((res) => {
    this.todo = res;
    console.log(res)
  })
 }

  async updateTodo() {
    this.todoservice.updateTodo(this.todo);
    const toast = await this.toastCtrl.create({
      message: 'Todo Update',
      duration: 1000,
    });
    toast.present();
    this.modalCtrl.dismiss();

  }

  async deleteTodo() {
    this.todoservice.deleteTodo(this.todo);
    const toast = await this.toastCtrl.create({
      message: 'Todo delete',
      duration: 1000,
    });
    toast.present();

    this.modalCtrl.dismiss();
  }

  async dismis() {
    await this.modalCtrl.dismiss();
  }
}
