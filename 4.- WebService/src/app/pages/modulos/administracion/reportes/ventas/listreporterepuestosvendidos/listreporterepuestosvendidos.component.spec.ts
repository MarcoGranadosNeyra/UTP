import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListreporterepuestosvendidosComponent } from './listreporterepuestosvendidos.component';

describe('ListreporterepuestosvendidosComponent', () => {
  let component: ListreporterepuestosvendidosComponent;
  let fixture: ComponentFixture<ListreporterepuestosvendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListreporterepuestosvendidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListreporterepuestosvendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
