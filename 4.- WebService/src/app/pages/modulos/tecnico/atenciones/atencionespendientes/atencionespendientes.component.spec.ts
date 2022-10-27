import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionespendientesComponent } from './atencionespendientes.component';

describe('AtencionespendientesComponent', () => {
  let component: AtencionespendientesComponent;
  let fixture: ComponentFixture<AtencionespendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionespendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionespendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
