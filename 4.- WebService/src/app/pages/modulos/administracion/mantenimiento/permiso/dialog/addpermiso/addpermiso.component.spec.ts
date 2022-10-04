import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpermisoComponent } from './addpermiso.component';

describe('AddpermisoComponent', () => {
  let component: AddpermisoComponent;
  let fixture: ComponentFixture<AddpermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpermisoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
