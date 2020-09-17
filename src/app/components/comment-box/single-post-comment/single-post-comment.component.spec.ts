import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePostCommentComponent } from './single-post-comment.component';

describe('SinglePostCommentComponent', () => {
  let component: SinglePostCommentComponent;
  let fixture: ComponentFixture<SinglePostCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePostCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePostCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
