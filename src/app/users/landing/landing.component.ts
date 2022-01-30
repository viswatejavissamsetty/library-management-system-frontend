import { Component, OnInit } from '@angular/core';
import { BooksService, BookType } from '../services/books.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  searchValue: string = '';
  books: BookType[] = [];
  filteredBooks: BookType[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.getAllBooks().subscribe((books) => {
      this.books = books;
      this.filteredBooks = books;
    });
  }

  search() {
    console.log('clicked, search value is -> ', this.searchValue);
  }

  filterOnCategory(category: string) {
    this.filteredBooks = this.books.filter(
      (book) => book.category === category
    );
  }

  filterWithRatings() {
    this.filteredBooks = this.books
      .filter((book) => book.ratings >= 4)
      .sort((a, b) => b.ratings - a.ratings);
  }
}
