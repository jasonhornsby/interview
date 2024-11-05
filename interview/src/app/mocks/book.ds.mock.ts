import { faker } from "@faker-js/faker";
import { delay, Observable, of } from "rxjs";
import { Book } from "../models/book";
import { getMockBook } from "./book.mock";

function createBookDatasource(source: Book['source']): () => Observable<Book[]> {
  const books = Array.from({ length: 20}, _ => getMockBook({ source: source}));

  return () => {
    return of(books).pipe(delay(faker.number.int({ min: 700, max: 1300})))
  }
}

export const getLibraryDs = createBookDatasource('library');
export const getStoreDs = createBookDatasource('store');
