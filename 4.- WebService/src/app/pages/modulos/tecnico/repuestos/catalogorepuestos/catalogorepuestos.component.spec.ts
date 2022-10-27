import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogorepuestosComponent } from './catalogorepuestos.component';

describe('CatalogorepuestosComponent', () => {
  let component: CatalogorepuestosComponent;
  let fixture: ComponentFixture<CatalogorepuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogorepuestosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogorepuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
