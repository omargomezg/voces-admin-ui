export class PaginationModel {
  pageSize: number;
  pageIndex: number;
  length: number;
  pageSizeOptions: number[];

  constructor() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.length = 10;
    this.pageSizeOptions = [10, 25, 50, 100];
  }
}
