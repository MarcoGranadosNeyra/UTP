import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListrecepcionComponent } from './listrecepcion.component';

describe('ListrecepcionComponent', () => {
  let component: ListrecepcionComponent;
  let fixture: ComponentFixture<ListrecepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListrecepcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListrecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
