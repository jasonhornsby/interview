import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { Book } from "../models/book";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  public getStoreBooks(): Observable<Book[]> {
    return of([]);
  }

  public getLibraryBooks(name?: string): Observable<Book[]> {
    // Mock implementation of http Call
    return of([])
  }
}
