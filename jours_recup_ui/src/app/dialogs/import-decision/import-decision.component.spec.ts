import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDecisionComponent } from './import-decision.component';

describe('ImportDecisionComponent', () => {
  let component: ImportDecisionComponent;
  let fixture: ComponentFixture<ImportDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportDecisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
