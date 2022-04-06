import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme3Component } from './theme3.component';

describe('Theme3Component', () => {
  let component: Theme3Component;
  let fixture: ComponentFixture<Theme3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Theme3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
