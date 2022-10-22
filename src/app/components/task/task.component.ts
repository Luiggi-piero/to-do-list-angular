import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  todo: string[] = [
    'Limpiar la habitación',
    'Ordenar el ropero',
    'Pintar la sala',
    'Bañar al perro',
    'Lavar los servicios',
    'Limpiar el jardín',
    'Realizar la monografía',
    'Pasear al perro',
  ];

  inProcess: string[] = [];
  finished: string[] = [];
  newTask: string = '';
  wasCreated: boolean = false;
  constructor() {
    this.readLists();
  }

  ngOnInit(): void {}

  readLists() {
    let readListToDo = localStorage.getItem('todo');
    let readListInProcess = localStorage.getItem('inProcess');
    let readListFinished = localStorage.getItem('finished');
    if (readListToDo) this.todo = JSON.parse(readListToDo);
    if (readListInProcess) this.inProcess = JSON.parse(readListInProcess);
    if (readListFinished) this.finished = JSON.parse(readListFinished);
  }

  drop(event: CdkDragDrop<string[]>):void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.saveToLocalStorageToDo();
    this.saveToLocalStorageInProcess();
    this.saveToLocalStorageFinished();
  }

  addTask(): void {
    if (this.newTask == '' || this.newTask.trim() == '') return;
    this.wasCreated = true;
    setTimeout(() => {
      this.wasCreated = false;
    }, 3000);
    this.todo.unshift(this.newTask);
    this.saveToLocalStorageToDo();
    this.newTask = '';
  }

  deleteTask(i: number, list: string): void {
    if (list == 'todo') {
      this.todo = this.todo.filter((value, index) => i != index);
      this.saveToLocalStorageToDo();
    } else if (list == 'inProcess') {
      this.inProcess = this.inProcess.filter((value, index) => i != index);
      this.saveToLocalStorageInProcess();
    } else if (list == 'finished') {
      this.finished = this.finished.filter((value, index) => i != index);
      this.saveToLocalStorageFinished();
    }
  }

  saveToLocalStorageToDo():void {
    let todoJSON = JSON.stringify(this.todo);
    localStorage.setItem('todo', todoJSON);
  }
  saveToLocalStorageInProcess():void {
    let inProcessJSON = JSON.stringify(this.inProcess);
    localStorage.setItem('inProcess', inProcessJSON);
  }
  saveToLocalStorageFinished():void {
    let finishedJSON = JSON.stringify(this.finished);
    localStorage.setItem('finished', finishedJSON);
  }
}
