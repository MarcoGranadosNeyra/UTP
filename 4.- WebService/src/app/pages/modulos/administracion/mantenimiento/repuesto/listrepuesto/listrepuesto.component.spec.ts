import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListrepuestoComponent } from './listrepuesto.component';

describe('ListrepuestoComponent', () => {
  let component: ListrepuestoComponent;
  let fixture: ComponentFixture<ListrepuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListrepuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListrepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
