import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserListComponent } from './single-user-list.component';

describe('SingleUserListComponent', () => {
  let component: SingleUserListComponent;
  let fixture: ComponentFixture<SingleUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
