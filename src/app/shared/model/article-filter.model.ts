export class ArticleFilterModel {
    category: string;
    principalSite: string;
    text: string;
    sortBy: string;
    direction: string;

    constructor() {
        this.category = '';
        this.principalSite = '';
        this.text = '';
        this.sortBy = 'createdAt';
        this.direction = 'DESC';
    }

}
