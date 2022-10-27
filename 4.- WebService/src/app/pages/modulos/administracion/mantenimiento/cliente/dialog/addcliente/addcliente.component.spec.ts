import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclienteComponent } from './addcliente.component';

describe('AddclienteComponent', () => {
  let component: AddclienteComponent;
  let fixture: ComponentFixture<AddclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
