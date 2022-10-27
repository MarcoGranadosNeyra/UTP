import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListrecibidosComponent } from './listrecibidos.component';

describe('ListrecibidosComponent', () => {
  let component: ListrecibidosComponent;
  let fixture: ComponentFixture<ListrecibidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListrecibidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListrecibidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
