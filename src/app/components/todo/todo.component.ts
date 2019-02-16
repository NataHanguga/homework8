import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/services/todo';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/services/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FilterPipe } from '../../services/filter.pipe';

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
  path: string[] = ['todo'];
  order: number = 1;
  url: any;

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
  //  this.check();

   this.url = JSON.parse(localStorage.getItem('avatar'));
  //  console.log(this.url);
  }


  sortTodo(prop: string) {
    this.path = prop.split('.');
    this.order = this.order * (-1);
    return false;
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
          // this.count  = Object.keys(this.todoList).length;
          // this.sortTodo('status');
        console.log(this.todoList);
      });
  }

  // check() {
  //   for ( let j = 0; j < this.count; j++) {
  //   const div = document.getElementById('check' + j);
  //   // console.log(index, this.todoList[index].selected);
  //   if (this.todoList[j].selected === true) {
  //     div[j].checked = true;
  //   } else {
  //     div[j].checked = false;
  //   }
  //   }
  // }


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
   const icon = document.querySelector('.process-icon');
   if ((el.innerHTML === 'done') && (this.todoList[i].status = 'done')) {
      el.innerHTML = 'undone';
      this.todoList[i].status = 'undone';
    } else {
      el.innerHTML = 'done';
      this.todoList[i].status = 'done';
    }
    this.todoService.updateTodo(this.todoList[i]);
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

  fullCardModal(i) {
    const title = this.todoList[i].title;
    const description = this.todoList[i].description;
    // const edit = this.editTask(i);
  //  document.getElementById('fullCardModal').style.display = 'block' ;
  //  document.getElementById('fullCardModalLabel').innerText = title;
  //   document.getElementById('modalBody').innerText = description;
    document.querySelector('.fullCardModal').innerHTML = `
    <modal  class="modal fade bottom" id="fullCardModal" tabindex="-1"
    role="dialog" aria-labelledby="fullCardModalLabel" aria-hidden="true">
    <div class="modal-dialog " role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title w-100 font-weight-bold" id="fullCardModalLabel">` + title + `</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body"style="
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow-wrap: break-word;
        text-align: justify;">
         ` + description + `
        </div>
      </div>
    </div>
  </modal>
  `;
  }

  editTask(idx) {
    const title = this.todoList[idx].title;
    const result = prompt('edit title', title);
    if (result !== null && result !== '') {
      this.todoList[idx].title = result;
      this.todoList[idx].status = 'new';
    }
    this.todoService.updateTodo(this.todoList[idx]).subscribe(
      res => {
        this.getTodo();
        console.log(res);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('complite update todo');
      });
    // this.getTodo();
    // console.log(this.todoList[idx]);
  }

  add() {
    // const data = new Todo(this.todoItem); // JSON.stringify(this.todoItem);
    console.log(this.todoItem.value);
    this.todoService.createTodo(this.todoItem.value)
      .subscribe( res => console.log(res));
    this.getTodo();
  }

  delete(id) {
    this.todoService.deleteTodo(id)
      .subscribe(
        (_) => {
          this.todos = this.todos
            .filter((t) => t._id !== id);
        }
      );
      this.getTodo();
  }
}
