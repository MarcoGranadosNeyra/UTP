import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittecnicoComponent } from './edittecnico.component';

describe('EdittecnicoComponent', () => {
  let component: EdittecnicoComponent;
  let fixture: ComponentFixture<EdittecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittecnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
