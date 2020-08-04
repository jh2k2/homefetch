import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HIWComponent } from './hiw.component';

describe('HIWComponent', () => {
  let component: HIWComponent;
  let fixture: ComponentFixture<HIWComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HIWComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HIWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
