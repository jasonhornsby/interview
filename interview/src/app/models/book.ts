export enum BookGenre {
  action,
  history,
  fiction,
  autobiography,
  scifi,
  fantasy,
  romance
}

export type Book = {
  id: string;
  name: string,
  pages: Page[],
  author: Author,
  genres: BookGenre[],
  source: 'library' | 'store',
  dateWritten: Date,
  datePublished: Date,
}

export type Page = {
  content: string,
  pageNumber: number,
}

export type Author = {
  id: string;
  name: string,
  address: string,
  age: number,
  height: number,
}
