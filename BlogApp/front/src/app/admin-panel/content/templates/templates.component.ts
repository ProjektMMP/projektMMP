import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  imageSrc = "assets/template3.jpg";

  @Output()
  addThemeToParent: EventEmitter<string>= new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  changeTemplate(value){
    this.addThemeToParent.emit(value)
  }

}
