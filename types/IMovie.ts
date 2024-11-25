export interface IMovie {
  id: string;
  title: string;
  poster: string;
  imageModel?: {
    caption?: string;
    url?: string;
    maxHeight?: number;
    maxWidth?: number;
  };
}