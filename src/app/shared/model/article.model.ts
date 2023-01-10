import {AuthorModel} from "./author.model";

export interface ArticleModel {
  id: string;
  title: string;
  content: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
  referringSite: string;
  author: AuthorModel;
}
