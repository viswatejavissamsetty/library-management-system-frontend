import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookType } from 'src/app/users/services/books.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent implements OnInit {
  @Input()
  book!: BookType;

  colorIndication: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const percentage =
      (this.book.availableNumberOfBooks / this.book.totalNumberOfBooks) * 100;
    if (percentage <= 10) {
      this.colorIndication = 'text-danger';
    } else if (percentage > 10 && percentage <= 30) {
      this.colorIndication = 'text-warning';
    } else {
      this.colorIndication = 'text-success';
    }
  }

  viewBookDetails() {
    this.router.navigateByUrl('users/books/'+this.book._id);
  }
}
