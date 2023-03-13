import {AuthorModel} from "./author.model";

export class ArticleModel {
  id!: string;
  title!: string;
  content!: string;
  summary!: string;
  updatedAt: Date;
  referringSite!: string;
  author: AuthorModel;

  constructor() {
    this.updatedAt = new Date();
    this.author = new AuthorModel();
  }

}
