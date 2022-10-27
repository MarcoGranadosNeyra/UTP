import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritorepuestosComponent } from './carritorepuestos.component';

describe('CarritorepuestosComponent', () => {
  let component: CarritorepuestosComponent;
  let fixture: ComponentFixture<CarritorepuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarritorepuestosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritorepuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
