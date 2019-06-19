import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDetalheComponent } from './users-detalhe.component';

describe('UsersDetalheComponent', () => {
  let component: UsersDetalheComponent;
  let fixture: ComponentFixture<UsersDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
