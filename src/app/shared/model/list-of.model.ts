import {ArticleModel} from "./article.model";

export interface ListOfModel {
  articles: ArticleModel[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
