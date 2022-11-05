import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListventasComponent } from './listventas.component';

describe('ListventasComponent', () => {
  let component: ListventasComponent;
  let fixture: ComponentFixture<ListventasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListventasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
