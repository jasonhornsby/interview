import { Injectable } from '@angular/core';
import { Observable, of, tap } from "rxjs";
import { getLibraryDs, getStoreDs } from "../mocks/book.ds.mock";
import { Book } from "../models/book";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  libraryDs = getLibraryDs();
  storeDs = getStoreDs();

  constructor() { }

  public getStoreBooks(): Observable<Book[]> {
    return this.storeDs.pipe(tap(result => console.log(result)));
  }

  public getLibraryBooks(name?: string): Observable<Book[]> {
    return this.libraryDs;
  }
}
