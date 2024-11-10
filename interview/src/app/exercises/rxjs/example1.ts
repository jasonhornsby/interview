import { combineLatest, Observable } from 'rxjs';
import { Book, Author } from '../../models/book';
import { map, bufferTime } from 'rxjs/operators';

/**
 * - combine sources
 * - sort by author name
 * @param sources
 */
function combineBookSources(
  ...sources: Observable<Book[]>[]
): Observable<Book[]> {
  return combineLatest(sources).pipe(
    map((booksArray: Book[][]) => {
      const allBooks = booksArray.flat();
      return allBooks.sort((a, b) =>
        a.author.name.localeCompare(b.author.name)
      );
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
    bufferTime(2000),
    map(books => {
      const authors = books
        .map(b => b.author)
        .filter(author => author.age < 20);
      const map = new Map<string, Author>();
      authors.forEach(author => {
        if (map.has(author.id)) {
          return;
        }

        map.set(author.id, author);
      });

      return [...map.values()];
    })
  );
}
