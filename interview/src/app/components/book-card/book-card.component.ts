import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { Book, BookGenre } from "../../models/book";

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input() book!: Book;

  getGenreString(genre: BookGenre): string {
    return BookGenre[genre].charAt(0).toUpperCase() + BookGenre[genre].slice(1);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }

  like() {
    throw new Error("Not implemented");
  }
}
