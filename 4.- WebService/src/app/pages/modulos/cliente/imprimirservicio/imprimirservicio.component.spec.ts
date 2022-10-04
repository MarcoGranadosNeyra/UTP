import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirservicioComponent } from './imprimirservicio.component';

describe('ImprimirservicioComponent', () => {
  let component: ImprimirservicioComponent;
  let fixture: ComponentFixture<ImprimirservicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimirservicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
