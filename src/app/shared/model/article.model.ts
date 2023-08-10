import {AuthorModel} from "./author.model";

export class ArticleModel {
  id!: string;
  title!: string;
  category!: string;
  content!: string;
  summary!: string;
  updatedAt: Date;
  referringSite!: string;
  status!: string;
  featureImageUrl!: string;
  featureImageAlt!: string;
  featureImageTitle!: string;
  tags!: string[];
  author: AuthorModel;
  principalSite!: string;

  constructor() {
    this.updatedAt = new Date();
    this.author = new AuthorModel();
  }

}
