import { combineLatest, map, Observable } from "rxjs";
import { Book, Author } from "../../models/book";

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
export function getAuthors(books: Observable<Book>): Observable<Author[]> { return null as any}
