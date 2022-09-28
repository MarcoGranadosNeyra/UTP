import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtecnicoComponent } from './listtecnico.component';

describe('ListtecnicoComponent', () => {
  let component: ListtecnicoComponent;
  let fixture: ComponentFixture<ListtecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListtecnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
