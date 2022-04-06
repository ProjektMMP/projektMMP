import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme2Component } from './theme2.component';

describe('Theme2Component', () => {
  let component: Theme2Component;
  let fixture: ComponentFixture<Theme2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Theme2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
