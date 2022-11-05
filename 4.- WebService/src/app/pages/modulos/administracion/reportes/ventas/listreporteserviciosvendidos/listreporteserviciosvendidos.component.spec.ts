import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListreporteserviciosvendidosComponent } from './listreporteserviciosvendidos.component';

describe('ListreporteserviciosvendidosComponent', () => {
  let component: ListreporteserviciosvendidosComponent;
  let fixture: ComponentFixture<ListreporteserviciosvendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListreporteserviciosvendidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListreporteserviciosvendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
