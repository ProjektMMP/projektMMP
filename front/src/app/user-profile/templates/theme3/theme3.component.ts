import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-theme3',
  templateUrl: './theme3.component.html',
  styleUrls: ['./theme3.component.css']
})
export class Theme3Component implements OnInit {
  @Input() userDetails;

  constructor() { }

  ngOnInit(): void {
  }

}
