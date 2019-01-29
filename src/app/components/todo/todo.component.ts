import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/services/todo';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/services/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { container } from '@angular/core/src/render3';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { container } from '@angular/core/src/render3';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  todoList: {};
  user: {};
  btnStyle: string;
  key: string = this.auth.getCookie();
  todoItem: FormGroup;
  index: any;
  inde: {};
  count: any;
  constructor(private todoService: TodoService,
              private router: Router,
              private auth: AuthService,
              private cookieService: CookieService,
              private formBuilder: FormBuilder) { }


  ngOnInit() {
   // const idValue = this.todoService.randomId();
    this.todoItem = this.formBuilder.group({
     // id: [idValue, Validators.required],
      userId: [this.auth.getCookie(), Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      selected: [false, Validators.required],
      status: ['undone', Validators.required]
    });

    //  this.cancelTask(this.index);
    this.getTodo();

      this.getUserData();
   this.check();
  }


  // convenience getter for easy access to form fields
  get f() { return this.todoItem.controls; }

  goToProfile() {
     this.router.navigate(['user', this.key]);
  }
  getUserData() {
    this.user = JSON.parse(this.cookieService.get(this.auth.getCookie()));
      console.log(this.user);
      return this.user;
  }

  getTodo() {
    this.todoService.getTodo()
      .subscribe( (res) => {
          this.todoList =  res;
          this.count  = Object.keys(this.todoList).length;
          Object.keys(res).map(key => {
              // this.inde[this.count].value = key;
              // this.count--;
          });
        console.log(this.count, this.todoList);
      });
  }

  check() {
    for ( let j = 0; j < this.count; j++) {
    const div = document.getElementById('check' + j);
    // console.log(index, this.todoList[index].selected);
    if (this.todoList[j].selected === true) {
      div[j].checked = true;
    } else {
      div[j].checked = false;
    }
    }
  }

  showText(i) {
    const div = document.getElementById(i);
    const conteiner = document.getElementById('button' + i);
    if (conteiner.className === 'show') {
        div.style.display = 'block';
        conteiner.className = 'hidden';
      } else if (conteiner.className === 'hidden') {
        div.style.display =  'none';
        conteiner.className = 'show';
      }

  }
  cancelTask(i) {
   const el = document.getElementById('change' + i);
   if ((el.innerHTML === 'done') && (this.todoList[i].status = 'done')) {
      el.innerHTML = 'undone';
      this.todoList[i].status = 'undone';
    } else {
      el.innerHTML = 'done';
      this.todoList[i].status = 'done';
    }
  }

  deleteTask(id) {
    const delTask = confirm('Are you sure to delete the task?');
    if (delTask) {
      this.todoService.deleteTodo(id)
      .subscribe(
        (_) => {
          this.todos = this.todos
            .filter((t) => t._id !== id);
        }
      );
    }
  }
  showBut(idx) {
    const conteiner = document.getElementById('menu' + idx);
    const buts = document.getElementById('butts');
    // conteiner.className = 'menu-show';
    console.log(idx);
    if (conteiner.className === 'menu-show') {
      buts.style.display = 'block';
      conteiner.className = 'menu-hidden';
    } else if (conteiner.className === 'menu-hidden') {
      buts.style.display = 'none';
      conteiner.className = 'menu-show';
    }
  }

  checkCall(i) {
    const div = document.getElementById('check' + i);
    // if (div[i].checked) {
    //   this.todoList[i].selected = true;
    //   // make put request to server
    // }
  }
  editTask(idx) {
    const title = this.todoList[idx].title;
    const result = prompt('edit title', title);
    if (result !== null && result !== '') {
      this.todoList[idx].title = result;
    }
  }

  addTodo() {
    const div = document.getElementById('container');
    const but = document.getElementById('addTodo');
    if (but.innerHTML === 'Add todo') {
      div.style.display = 'flex';
      but.innerHTML = 'Hidden add todo';
    }  else if (but.innerHTML === 'Hidden add todo') {
      div.style.display = 'none';
      but.innerHTML = 'Add todo';
    }
  }

  add() {
    // const data = new Todo(this.todoItem); // JSON.stringify(this.todoItem);
    console.log(this.todoItem.value);
    this.todoService.createTodo(this.todoItem.value)
      .subscribe( res => console.log(res));
    this.getTodo();
  }

  change(id: string) {
    console.log(id);
    this.todoService.getTodoById(id)
      .subscribe(res => console.log(res));
  }

  delete(id) {
    this.todoService.deleteTodo(id)
      .subscribe(
        (_) => {
          this.todos = this.todos
            .filter((t) => t._id !== id);
        }
      );
  }
/*
  addTodo() {
    // this.todoService.addTodo(this.newTodo);
   // this.newTodo = new Todo();
    const data = JSON.parse(this.cookieService.get(this.auth.getCookie()));
    data.todoList.todos = this.todoService.addTodo(this.newTodo);

    console.log(JSON.stringify(this.newTodo));
    this.cookieService.set(this.auth.getCookie(), data);
   this.newTodo = new Todo();
   console.log(data);
  }

  toggleTodoComplete(todo) {
    // this.todoService.getTodo()
    //   .subscribe( res => {
    //       todo = res;
    //   });
    this.todoService.toggleTodoComplete(todo);

  }

  removeTodo(todo) {
    this.todoService.deleteTodoById(todo.id);
  }

  get todoes() {
    // console.log(this.todoService.getAllTodos());
    return this.todoService.getAllTodos();
  }
*/
}
