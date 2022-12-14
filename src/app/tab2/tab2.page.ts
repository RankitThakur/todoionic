import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController, ModalController } from '@ionic/angular';
import { Tab1Page } from '../tab1/tab1.page';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  todos = [];
  today: number = Date.now();

  constructor(
    private todoservice: TodoService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.todoservice.getAllTodo().subscribe((res) => {
      this.todos = res;
      console.log(res);
    });
  }

  async openTodo(todoList) {
    const modal = await this.modalCtrl.create({
      component: Tab1Page,
      componentProps: { id: todoList.id },
    });

    modal.present();
  }

  async addTodo() {
    const alert = await this.alertCtrl.create({
      header: 'Add Todo',
      inputs: [
        {
          name: 'title',
          placeholder: 'Name',
          type: 'text',
        },
        {
          name: 'text',
          placeholder: 'Enter Your Todo',
          type: 'textarea',
        },
        {
          name: 'time',
          placeholder: 'Name',
          type: 'date',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel',
        },
        {
          text: 'Add',
          handler: async (res) => {
            if(!res){
              
            }
            else{
              this.todoservice.addTodo({
                title: res.title,
                text: res.text,
                time: res.time,
              });
              const toast = await this.toastCtrl.create({
                message: 'Add Todo',
                duration: 1000,
              });
              toast.present();
            }
          },
          
        },
      ],
    });
    await alert.present();
  }
}
