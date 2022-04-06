import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-theme2',
  templateUrl: './theme2.component.html',
  styleUrls: ['./theme2.component.css']
})
export class Theme2Component implements OnInit {

  @Input() userDetails;

  constructor() { }

  ngOnInit(): void {
  }

  onLogout(){

  }

}
