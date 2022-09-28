import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirventaComponent } from './imprimirventa.component';

describe('ImprimirventaComponent', () => {
  let component: ImprimirventaComponent;
  let fixture: ComponentFixture<ImprimirventaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimirventaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
