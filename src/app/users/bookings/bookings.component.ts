import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { zip } from 'rxjs';
import { BookingModel, BookingService } from '../services/booking.service';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  plannedBooks: BookingModel[] = [];
  takenBooks: BookingModel[] = [];

  constructor(
    private bookingService: BookingService,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.fetchAllPlannedBooks();
    this.fetchAllTakenBooks();
  }

  private fetchAllPlannedBooks() {
    setTimeout(() => {
      this.bookingService.getAllPlannedBooks().subscribe((plannedBooks) => {
        this.plannedBooks = plannedBooks.reverse();
        zip(
          plannedBooks.map((PBook) => this.booksService.getBook(PBook.bookId))
        ).subscribe((books) => {
          books.forEach((book, index) => {
            this.plannedBooks[index].bookTitle = book.bookTitle;
            this.plannedBooks[index].planedDate = moment(
              this.plannedBooks[index].planedDate
            ).calendar();
          });
        });
      });
    }, 1000);
  }

  private fetchAllTakenBooks() {
    setTimeout(() => {
      this.bookingService.getAllTakenBooks().subscribe((takenBooks) => {
        this.takenBooks = takenBooks.reverse();
        zip(
          takenBooks.map((TBook) => this.booksService.getBook(TBook.bookId))
        ).subscribe((books) => {
          books.forEach((book, index) => {
            this.takenBooks[index].bookTitle = book.bookTitle;
            this.takenBooks[index].takenDate = moment(
              this.takenBooks[index].takenDate
            ).calendar();
            this.takenBooks[index].returnedDate = moment(
              this.takenBooks[index].returnedDate
            ).calendar();
            if (moment().isAfter(this.takenBooks[index].returnedDate)) {
              this.takenBooks[index].fine =
                this.takenBooks[index].fine *
                moment().diff(this.takenBooks[index].returnedDate, 'days');
            }else{
              this.takenBooks[index].fine = 0;
            }
            // this.takenBooks[index].fine = (moment() - moment(this.takenBooks[index].returnedDate)).calendar();
          });
        });
      });
    }, 1000);
  }

  cancelBook(id: string) {
    this.bookingService.cancelBook(id).subscribe(
      (data) => {
        console.log(data);
        this.fetchAllPlannedBooks();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
