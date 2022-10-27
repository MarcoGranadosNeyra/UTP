import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteSelectComponent } from './cliente-select.component';

describe('ClienteSelectComponent', () => {
  let component: ClienteSelectComponent;
  let fixture: ComponentFixture<ClienteSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
