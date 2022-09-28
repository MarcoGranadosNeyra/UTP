import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormapagoComponent } from './dialog-formapago.component';

describe('DialogFormapagoComponent', () => {
  let component: DialogFormapagoComponent;
  let fixture: ComponentFixture<DialogFormapagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFormapagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFormapagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
