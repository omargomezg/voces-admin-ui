import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTableComponent } from './article-table.component';

describe('ArticleTableComponent', () => {
  let component: ArticleTableComponent;
  let fixture: ComponentFixture<ArticleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
