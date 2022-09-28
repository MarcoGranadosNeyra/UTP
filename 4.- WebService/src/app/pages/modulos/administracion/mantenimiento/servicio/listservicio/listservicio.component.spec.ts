import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListservicioComponent } from './listservicio.component';

describe('ListservicioComponent', () => {
  let component: ListservicioComponent;
  let fixture: ComponentFixture<ListservicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListservicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
