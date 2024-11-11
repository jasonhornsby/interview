import {
  bufferTime,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  withLatestFrom,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { Author, Book } from '../../models/book';

/**
 * Combines multiple observable streams of book arrays into a single stream,
 * flattening the arrays and sorting the books by author name.
 *
 * Requirements:
 * 1. Combine multiple Observable<Book[]> sources into a single stream
 * 2. Flatten all book arrays into a single array
 * 3. Sort the combined array by author name alphabetically
 *
 * Implementation notes:
 * - The flattening should handle any number of source observables
 * - Sorting should be case-sensitive
 *
 * Example:
 * ```typescript
 * const source1$ = of([{ author: { name: 'Zoe' } }, { author: { name: 'Amy' } }]);
 * const source2$ = of([{ author: { name: 'Bob' } }]);
 *
 * combineBookSources(source1$, source2$).subscribe(books => {
 *   // books will be sorted: [Amy's book, Bob's book, Zoe's book]
 * });
 * ```
 *
 * @param sources - Array of Observable<Book[]> sources to combine
 * @returns Observable<Book[]> - Single stream of sorted books
 */
export function combineBookSources(
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
 * Processes a stream of individual books to emit arrays of unique young authors (age < 20)
 * at regular intervals.
 *
 * Requirements:
 * 1. Buffer incoming books for 2 seconds
 * 2. Filter for authors under 20 years old
 * 3. Remove duplicate authors (based on author.id)
 * 4. Emit array of remaining unique authors every 2 seconds
 *
 * Implementation notes:
 * - Empty time windows should emit empty arrays
 *
 * Example:
 * ```typescript
 * const books$ = from([
 *   { author: { id: '1', age: 19, name: 'Young Writer' } },
 *   { author: { id: '2', age: 25, name: 'Adult Writer' } },
 *   { author: { id: '1', age: 19, name: 'Young Writer' } } // duplicate
 * ]);
 *
 * getAuthors(books$).subscribe(authors => {
 *   // After 2 seconds, emits: [{ id: '1', age: 19, name: 'Young Writer' }]
 * });
 * ```
 *
 * @param books - Observable stream of individual Book objects
 * @returns Observable<Author[]> - Stream emitting arrays of unique young authors every 2 seconds
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
        if (!map.has(author.id)) {
          map.set(author.id, author);
        }
      });

      return Array.from(map.values());
    })
  );
}


/**
 * Implements a search functionality that searches books by title and author name.
 * Tests knowledge of: debouncing, switching streams, string manipulation
 *
 * Requirements:
 * 1. Debounce search input by 300ms
 * 2. Search both book title and author name
 * 3. Ignore case and trim whitespace
 * 4. Don't emit if search term is less than 2 characters
 * 5. Don't emit duplicate search results
 *
 * @param searchTerm$ - Observable of search string inputs
 * @param books$ - Observable of all available books
 * @returns Observable of books matching search criteria
 */
export function implementBookSearch(
  searchTerm$: Observable<string>,
  books$: Observable<Book[]>
): Observable<Book[]> {
  return searchTerm$.pipe(
    debounceTime(300),
    map(term => term.trim().toLowerCase()),
    filter(term => term.length >= 2),
    distinctUntilChanged(),
    withLatestFrom(books$),
    map(([term, books]) =>
      books.filter(book =>
        book.name.toLowerCase().includes(term) ||
        book.author.name.toLowerCase().includes(term)
      )
    )
  );
}
