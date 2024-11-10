import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { Author, Book } from './models/book';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'interview';

  public libraryBooks: Book[] = [];
  public storeBooks: Book[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private matSnackbar: MatSnackBar,
    private bookService: BookService
  ) {}

  likeAuthor(author: Author) {
    this.matSnackbar.open(`I LIKE ${author.name}`);
  }

  ngOnInit(): void {
    this.bookService
      .getLibraryBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => (this.libraryBooks = result));
    this.bookService
      .getStoreBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => (this.storeBooks = result));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
