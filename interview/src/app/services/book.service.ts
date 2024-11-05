import { Injectable } from '@angular/core';
import { Observable, tap } from "rxjs";
import { getLibraryDs, getStoreDs } from "../mocks/book.ds.mock";
import { Book } from "../models/book";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  libraryDs = getLibraryDs();
  storeDs = getStoreDs();

  public getStoreBooks(): Observable<Book[]> {
    return this.storeDs.pipe(tap(result => console.log(result)));
  }

  public getLibraryBooks(): Observable<Book[]> {
    return this.libraryDs;
  }
}
