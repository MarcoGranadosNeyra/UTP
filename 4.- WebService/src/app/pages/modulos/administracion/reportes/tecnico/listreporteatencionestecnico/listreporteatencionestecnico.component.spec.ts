import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListreporteatencionestecnicoComponent } from './listreporteatencionestecnico.component';

describe('ListreporteatencionestecnicoComponent', () => {
  let component: ListreporteatencionestecnicoComponent;
  let fixture: ComponentFixture<ListreporteatencionestecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListreporteatencionestecnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListreporteatencionestecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
