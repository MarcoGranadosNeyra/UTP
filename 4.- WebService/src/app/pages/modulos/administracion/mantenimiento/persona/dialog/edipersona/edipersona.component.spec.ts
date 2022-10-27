import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdipersonaComponent } from './edipersona.component';

describe('EdipersonaComponent', () => {
  let component: EdipersonaComponent;
  let fixture: ComponentFixture<EdipersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdipersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdipersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
