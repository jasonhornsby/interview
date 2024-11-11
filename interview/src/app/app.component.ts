import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './models/book';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly title = 'interview';

  readonly libraryBooks$: Observable<Book[]>;
  readonly storeBooks$: Observable<Book[]>;

  constructor(private readonly bookService: BookService) {
    this.libraryBooks$ = this.bookService.getLibraryBooks();
    this.storeBooks$ = this.bookService.getStoreBooks();
  }

  trackByBookId(_: number, book: Book): string {
    return book.id;
  }
}
