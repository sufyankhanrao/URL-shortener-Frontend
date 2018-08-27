import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirypageComponent } from './expirypage.component';

describe('ExpirypageComponent', () => {
  let component: ExpirypageComponent;
  let fixture: ComponentFixture<ExpirypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpirypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpirypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
