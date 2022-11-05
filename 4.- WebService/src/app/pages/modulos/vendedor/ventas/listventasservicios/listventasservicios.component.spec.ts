import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListventasserviciosComponent } from './listventasservicios.component';

describe('ListventasserviciosComponent', () => {
  let component: ListventasserviciosComponent;
  let fixture: ComponentFixture<ListventasserviciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListventasserviciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListventasserviciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
