import { NgModule } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorCardComponent } from "./components/author-card/author-card.component";
import { BookCardComponent } from './components/book-card/book-card.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
	imports: [
		AuthorCardComponent,
		BookCardComponent,
		BrowserAnimationsModule,
		BrowserModule,
		MatCardModule,
		MatSnackBarModule,
		MatToolbarModule,
		MatTabsModule,
	],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
