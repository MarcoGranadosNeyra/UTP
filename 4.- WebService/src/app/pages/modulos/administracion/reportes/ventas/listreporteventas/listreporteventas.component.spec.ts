import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListreporteventasComponent } from './listreporteventas.component';

describe('ListreporteventasComponent', () => {
  let component: ListreporteventasComponent;
  let fixture: ComponentFixture<ListreporteventasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListreporteventasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListreporteventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
