import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { Book } from '../models/book';

interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookLikesService {
  private readonly STORAGE_KEY = 'liked_books';
  private readonly MOCK_DELAY = 1000; // Simulate network delay

  /**
   * Get all books liked by the user
   */
  getLikedBooks(): Observable<ApiResponse<Book[]>> {
    return of(localStorage.getItem(this.STORAGE_KEY)).pipe(
      delay(this.MOCK_DELAY),
      map(data => {
        if (!data) {
          return { data: [], success: true };
        }
        try {
          const books = JSON.parse(data) as Book[];
          return { data: books, success: true };
        } catch (error) {
          throw new Error('Failed to parse liked books data');
        }
      }),
      catchError(error => {
        return of({
          data: [],
          success: false,
          error: error.message,
        });
      })
    );
  }

  /**
   * Add or remove a book from liked books
   */
  toggleLike(book: Book): Observable<ApiResponse<Book>> {
    try {
      const books = this.getLikedBooksFromStorage();
      const existingIndex = books.findIndex(b => b.id === book.id);

      if (existingIndex === -1) {
        books.push(book);
      } else {
        books.splice(existingIndex, 1);
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(books));

      return of({
        data: book,
        success: true,
      }).pipe(delay(this.MOCK_DELAY));
    } catch (error) {
      return throwError(() => ({
        data: book,
        success: false,
        error: 'Failed to toggle book like status',
      }));
    }
  }

  /**
   * Replace all liked books with a new set
   */
  updateLikedBooks(books: Book[]): Observable<ApiResponse<boolean>> {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(books));
      return of({
        data: true,
        success: true,
      }).pipe(delay(this.MOCK_DELAY));
    } catch (error) {
      return throwError(() => ({
        data: false,
        success: false,
        error: 'Failed to update liked books',
      }));
    }
  }

  /**
   * Remove all liked books
   */
  clearLikedBooks(): Observable<ApiResponse<boolean>> {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return of({
        data: true,
        success: true,
      }).pipe(delay(this.MOCK_DELAY));
    } catch (error) {
      return throwError(() => ({
        data: false,
        success: false,
        error: 'Failed to clear liked books',
      }));
    }
  }

  private getLikedBooksFromStorage(): Book[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) {
      return [];
    }
    try {
      return JSON.parse(data) as Book[];
    } catch {
      return [];
    }
  }
}
