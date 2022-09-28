import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcategoriaComponent } from './listcategoria.component';

describe('ListcategoriaComponent', () => {
  let component: ListcategoriaComponent;
  let fixture: ComponentFixture<ListcategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
