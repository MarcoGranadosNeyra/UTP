import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListentregadosComponent } from './listentregados.component';

describe('ListentregadosComponent', () => {
  let component: ListentregadosComponent;
  let fixture: ComponentFixture<ListentregadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListentregadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListentregadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
