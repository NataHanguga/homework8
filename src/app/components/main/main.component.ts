import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  toReg() {
    const login = document.getElementById('login');
    const reg = document.getElementById('reg');
    const but = document.getElementById('regBut');
    if (but.innerHTML === 'Registration') {
      login.style.display = 'none';
      reg.style.display = 'block';
    }
  }

  toLog() {
    const login = document.getElementById('login');
    const reg = document.getElementById('reg');
    const but = document.getElementById('logBut');
    if (but.innerHTML === 'Login') {
      login.style.display = 'block';
      reg.style.display = 'none';
    }
  }

}
