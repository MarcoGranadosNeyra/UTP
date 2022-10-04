import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AditpermisoComponent } from './aditpermiso.component';

describe('AditpermisoComponent', () => {
  let component: AditpermisoComponent;
  let fixture: ComponentFixture<AditpermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AditpermisoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AditpermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
