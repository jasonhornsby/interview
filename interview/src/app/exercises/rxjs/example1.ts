// Book source A
// Book source B

import { Observable } from "rxjs";
import { Book, Person } from "../../models/book";

/**
 * - combine sources
 * - sort by author name
 * @param sources
 */
function combineBookSources(...sources: Observable<Book[]>[]): Observable<Book[]> {
  return null;
}

/**
 * Continuous stream of books,
 * Only emit if Author is under 20 years old filter
 * Emit the author only map
 * Only emit every 2s a list of the authors that came in bufferTime
 * @param books
 */
export function getAuthors(books: Observable<Book>): Observable<Person[]> { return null }
