import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLinkComponent } from './article-link.component';

describe('ArticleLinkComponent', () => {
  let component: ArticleLinkComponent;
  let fixture: ComponentFixture<ArticleLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
