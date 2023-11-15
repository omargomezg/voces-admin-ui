import {AuthorModel} from "./author.model";

export class ArticleModel {
    id!: string;
    title!: string;
    permalink!: string;
    category!: Category;
    content!: string;
    summary!: string;
    createdAt!: string;
    updatedAt!: string;
    referringSite!: string;
    status!: string;
    featureImage: FeatureImage;
    tags!: string[];
    author: AuthorModel;
    principalSite!: string;

    constructor() {
        this.author = new AuthorModel();
        this.featureImage = new FeatureImage();
    }

}

class Category {
    id!: string;
    name!: string;
}

class FeatureImage {
    title!: string;
    alt!: string;
    url!: string;
}
