import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaUfcComponent } from './historia-ufc.component';

describe('HistoriaUfcComponent', () => {
  let component: HistoriaUfcComponent;
  let fixture: ComponentFixture<HistoriaUfcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriaUfcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaUfcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
