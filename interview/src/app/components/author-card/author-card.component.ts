import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent {
  // Take in an author
  // Display nicely
  // - name
  // - address
  // - age
  // - height (highlighted)
  // - a like button that notifies parent
}
