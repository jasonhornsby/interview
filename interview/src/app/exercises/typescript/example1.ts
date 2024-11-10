import { Book, Author } from '../../models/book';

export function publishedInYear(books: Book[], year: number): Book[] {
  return books.filter(book => {
    const publishedYear = book.datePublished.getFullYear();
    return publishedYear === year;
  });
}

/**
 * - no duplicates
 * @param books
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
