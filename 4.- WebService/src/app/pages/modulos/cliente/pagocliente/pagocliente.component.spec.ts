import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoclienteComponent } from './pagocliente.component';

describe('PagoclienteComponent', () => {
  let component: PagoclienteComponent;
  let fixture: ComponentFixture<PagoclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
