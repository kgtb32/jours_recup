import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperationDaysEditComponent } from './recuperation-days-edit.component';

describe('RecuperationDaysEditComponent', () => {
  let component: RecuperationDaysEditComponent;
  let fixture: ComponentFixture<RecuperationDaysEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperationDaysEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperationDaysEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
