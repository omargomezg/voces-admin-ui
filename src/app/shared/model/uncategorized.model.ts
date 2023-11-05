import {CategoryModel} from "./category.model";

export interface UncategorizedModel{
  id: string;
  uncategorizedName: string;
  category: CategoryModel;
}
