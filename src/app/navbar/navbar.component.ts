import { Component, OnInit } from '@angular/core';

declare var $: any
import { from } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.nav-menu > ul').slicknav({
      'prependTo': '.mobile_menu'
    });

  }

}
