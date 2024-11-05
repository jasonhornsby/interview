import { combineLatest, Observable, of, switchMap } from "rxjs";
import { Book, Author } from "../../models/book";
import { filter, map, bufferTime } from 'rxjs/operators';

/**
 * - combine sources
 * - sort by author name
 * @param sources
 */
function combineBookSources(...sources: Observable<Book[]>[]): Observable<Book[]> {
  return combineLatest(sources).pipe(
    map((booksArray: Book[][]) => {
      const allBooks = booksArray.flat();
      return allBooks.sort((a, b) => a.author.name.localeCompare(b.author.name));
    })
  );
}

/**
 * Continuous stream of books,
 * Only emit if Author is under 20 years old filter
 * Emit the author only map
 * Only emit every 2s a list of the authors that came in bufferTime
 * @param books
 */
export function getAuthors(books: Observable<Book>): Observable<Author[]> {
 return books.pipe(
    switchMap((bookList) =>
      of(bookList).pipe(
        filter((book) => book.author.age < 20),
        map((book) => book.author)
      )
    ),
    bufferTime(2000),
    filter((authors) => authors.length > 0)
  );
}
