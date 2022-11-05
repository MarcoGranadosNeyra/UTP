import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListreporteproductosvendidosComponent } from './listreporteproductosvendidos.component';

describe('ListreporteproductosvendidosComponent', () => {
  let component: ListreporteproductosvendidosComponent;
  let fixture: ComponentFixture<ListreporteproductosvendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListreporteproductosvendidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListreporteproductosvendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
