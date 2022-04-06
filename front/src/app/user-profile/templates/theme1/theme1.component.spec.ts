import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme1Component } from './theme1.component';

describe('Theme1Component', () => {
  let component: Theme1Component;
  let fixture: ComponentFixture<Theme1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Theme1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
