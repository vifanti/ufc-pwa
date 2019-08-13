import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersNovoComponent } from './users-novo.component';

describe('UsersNovoComponent', () => {
  let component: UsersNovoComponent;
  let fixture: ComponentFixture<UsersNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
