import {SocialNetworkModel} from "./social-network.model";

export interface SiteModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  domain: string;
  name: string;
  description: string;
  url: string;
  logo: string;
  favicon: string;
  keywords: string[];
  categories: CategoryModel[];
  socialNetworks: SocialNetworkModel[];
  totalOfContents: number;
}

interface CategoryModel {
  name: string;
  slug: string;
}
