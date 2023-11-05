export interface OptionsModel {
  orderBy: string;
  orderDir: 'ASC' | 'DESC';
  search: string,
  size: number,
  page: number;
}
