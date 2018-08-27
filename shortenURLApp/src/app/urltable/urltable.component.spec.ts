import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrltableComponent } from './urltable.component';

describe('UrltableComponent', () => {
  let component: UrltableComponent;
  let fixture: ComponentFixture<UrltableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrltableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrltableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
