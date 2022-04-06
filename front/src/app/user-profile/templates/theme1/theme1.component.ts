import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-theme1',
  templateUrl: './theme1.component.html',
  styleUrls: ['./theme1.component.css']
})
export class Theme1Component implements OnInit {

  @Input() userDetails;

  constructor() { }

  ngOnInit(): void {
  }

  onLogout(){

  }
}
