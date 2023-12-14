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
    socialNetworks: SocialNetworkModel[];
}
