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
  categories: string[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.getAllBooks().subscribe((books) => {
      this.books = books;
      this.filteredBooks = books;
      this.categories = books
        .map((book) => book.category)
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        })
        .sort();
    });
  }

  search() {
    const regex = new RegExp(this.searchValue, 'i');
    this.filteredBooks = this.books.filter((book) => {
      return (
        regex.test(book.authorName) ||
        regex.test(book._id) ||
        regex.test(book.category) ||
        regex.test(book.bookTitle)
      );
    });
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
