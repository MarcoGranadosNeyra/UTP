import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormapagolistComponent } from './formapagolist.component';

describe('FormapagolistComponent', () => {
  let component: FormapagolistComponent;
  let fixture: ComponentFixture<FormapagolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormapagolistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormapagolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
