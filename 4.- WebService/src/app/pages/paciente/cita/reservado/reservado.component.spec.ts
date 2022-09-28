import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservadoComponent } from './reservado.component';

describe('ReservadoComponent', () => {
  let component: ReservadoComponent;
  let fixture: ComponentFixture<ReservadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
