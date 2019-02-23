import {
  Component,
  OnInit
} from '@angular/core';
import {
  Todo
} from 'src/app/services/todo';
import {
  Router
} from '@angular/router';
import {
  TodoService
} from 'src/app/services/todo.service';
import {
  AuthService
} from 'src/app/services/auth.service';
import {
  CookieService
} from 'ngx-cookie-service';
import {
  User
} from 'src/app/services/user';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  FilterPipe
} from '../../services/filter.pipe';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  todoList: {};
  // user: {};
  btnStyle: string;
  key: string = this.cookieService.get('token');
  todoItem: FormGroup;
  index: any;
  inde: {};
  count: any;
  path: string[] = ['todo'];
  order = 1;
  url: any;

  public userData = JSON.parse(this.cookieService.get(this.cookieService.get('token')));
  public user = new User( this.userData.firstName,
                          this.userData.lastName,
                          this.userData.email,
                          this.userData.phone,
                          this.userData.password );

  constructor(private todoService: TodoService,
              private router: Router,
              private auth: AuthService,
              private cookieService: CookieService,
              private formBuilder: FormBuilder) {}


  ngOnInit() {
    this.todoItem = this.formBuilder.group({
      userId: [this.auth.getCookie(), Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      selected: [false, Validators.required],
      status: ['undone', Validators.required]
    });

    this.getTodo();
  }


  sortTodo(prop: string) {
    this.path = prop.split('.');
    this.order = this.order * (-1);
    return false;
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.todoItem.controls;
  }

  goToProfile() {
    this.router.navigate(['user',  this.cookieService.get('token')]);
  }

  getTodo() {
    this.todoService.getTodo(this.key)
      .subscribe((res) => {
        this.todoList = res;
        console.log(this.todoList);
      });
  }

  checked(i) {
    // console.log(i);
    if (this.todoList[i].status === 'undone') {
      this.todoList[i].status = 'done';
    } else if (this.todoList[i].status === 'done') {
      this.todoList[i].status = 'undone';
    }
    this.todoService.updateTodo(this.todoList[i], this.key).subscribe(
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
  }

  deleteTask(id) {
    const delTask = confirm('Are you sure to delete the task?');
    if (delTask) {
      this.todoService.deleteTodo(id, this.key)
        .subscribe(
          (_) => {
            this.todos = this.todos
              .filter((t) => t._id !== id);
          },
          err => {
            console.log(err);
          },
          () => {
            console.log('complite delete todo');
          });
    }
  }

  fullCardModal(i) {
    const title = this.todoList[i].title;
    const description = this.todoList[i].description;
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

change(idx) {
  const title = this.todoList[idx].title;
  const inputT = document.getElementById('title') as HTMLInputElement;
  const inpputD  = document.getElementById('description') as HTMLInputElement;
  const description = this.todoList[idx].description;
  inputT.value = title;
  inpputD.value = description;
  const button = document.querySelector('.click');
  button.id = idx;
}

  editTask() {
    let idx = document.querySelector('.click').id;
    const inputT = document.getElementById('title') as HTMLInputElement;
    const inputD  = document.getElementById('description') as HTMLInputElement;
    if ((inputT.value !== null && inputT.value !== '') || (inputD.value !== null && inputD.value !== '')) {
      this.todoList[idx].title = inputT.value;
      this.todoList[idx].description = inputD.value;
    }
    this.todoService.updateTodo(this.todoList[idx], this.key).subscribe(
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

    inputD.value = '';
    inputT.value = '';
    idx = '';
  }

  add() {
    console.log(this.todoItem.value);
    this.todoService.createTodo(this.todoItem.value, this.key)
      .subscribe(res => console.log(res));
    this.getTodo();
  }

 }
