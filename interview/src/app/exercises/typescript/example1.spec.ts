import { getMockBook } from '../../mocks/book.mock';
import { getUniqueAuthors, publishedInYear } from './example1';

describe('Book Utilities', () => {

  const author1 = getMockBook().author;
  const author2 = getMockBook().author;

  const book1 = getMockBook({ datePublished: new Date('2020-01-01'), author: author1 });
  const book2 = getMockBook({ datePublished: new Date('2021-01-01'), author: author2 });
  const book3 = getMockBook({ datePublished: new Date('2020-05-15'), author: author1 });

  it('should filter books published in the specified year', () => {
    const books = [book1, book2, book3];
    const result = publishedInYear(books, 2020);

    expect(result.length).toBe(2);
    expect(result).toContain(book1);
    expect(result).toContain(book3);
  });

  it('should return an empty array if no books are published in the specified year', () => {
    const books = [book1, book2, book3];
    const result = publishedInYear(books, 2019);

    expect(result.length).toBe(0);
  });

  it('should return unique authors from a list of books', () => {
    const books = [book1, book2, book3];
    const result = getUniqueAuthors(books);

    expect(result.length).toBe(2);
    expect(result).toContain(book1.author);
    expect(result).toContain(book2.author);
  });

  it('should not include duplicate authors when there are multiple books by the same author', () => {
    const books = [book1, book3];
    const result = getUniqueAuthors(books);

    expect(result.length).toBe(1);
    expect(result[0]).toBe(book1.author);
  });

});
