import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Author, Book } from "./models/book";
import { BookService } from "./services/book.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'interview';

  public books: Book[] = [];

  constructor(private matSnackbar: MatSnackBar, private bookService: BookService) {
  }

  likeAuthor(author: Author) {
    this.matSnackbar.open(`I LIKE ${ author.name }`)
    // Open
  }

  ngOnInit(): void {
    // This could be a exercise
    // TODO: Get all the books from the library and the store
    this.bookService.getLibraryBooks();
    this.bookService.getStoreBooks();
  }
}
