import {ArticleModel} from "./article.model";

export interface ListOfModel {
  content: ArticleModel[];
  currentPage: number;
  totalElements: number;
  totalPages: number;
}
