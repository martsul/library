export interface Genre {
  id: string;
  title: string;
  subgenres?: Genre[];
}