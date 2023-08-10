import {ArticleModel} from "./article.model";

export interface ListOfModel {
  items: ArticleModel[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
