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
  name: string,
  pages: Page[],
  author: Person,
  genres: BookGenre[],
  dateWritten: Date,
  datePublished: Date,
}

export type Page = {
  content: string,
  pageNumber: number,
}

export type Person = {
  name: string,
  address: string,
  age: number,
  height: number,
}
