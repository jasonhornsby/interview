import { Book, Author } from '../../models/book';


/**
 * Filters an array of books to return only those published in a specific year.
 *
 * @param books - Array of Book objects to filter
 * @param year - The target publication year to filter by
 * @returns Array of Book objects published in the specified year
 *
 * @example
 * const books = [
 *   { title: 'Book1', datePublished: new Date('2020-01-01') },
 *   { title: 'Book2', datePublished: new Date('2021-01-01') }
 * ];
 * publishedInYear(books, 2020); // Returns [{ title: 'Book1', ... }]
 */
export function publishedInYear(books: Book[], year: number): Book[] {
  return books.filter(book => {
    const publishedYear = book.datePublished.getFullYear();
    return publishedYear === year;
  });
}

/**
 * Extracts a unique list of authors from an array of books.
 * Implementation uses author.id to assure uniqueness
 *
 * @param books - Array of Book objects to extract authors from
 * @returns Array of unique Author objects, deduped by author.id
 *
 * @example
 * const books = [
 *   { title: 'Book1', author: { id: '1', name: 'Author1' } },
 *   { title: 'Book2', author: { id: '1', name: 'Author1' } }  // Same author
 * ];
 * getUniqueAuthors(books); // Returns [{ id: '1', name: 'Author1' }]
 */
export function getUniqueAuthors(books: Book[]): Author[] {
  const authorMap = new Map<string, Author>();

  books.forEach(book => {
    const author = book.author;
    if (!authorMap.has(author.id)) {
      authorMap.set(author.id, author);
    }
  });

  return Array.from(authorMap.values());
}
