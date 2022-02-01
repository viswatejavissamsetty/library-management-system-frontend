import { LibrarianService } from './../../services/librarian.service';
import { Component, OnInit } from '@angular/core';
import { BookingModel } from 'src/app/users/services/booking.service';
import { zip } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  bookings: BookingModel[] = [];
  filteredBookings: BookingModel[] = [];

  filterValue: string = '';

  constructor(private librarianService: LibrarianService) {}

  ngOnInit(): void {
    this.fetchBookingData();
  }

  fetchBookingData() {
    setTimeout(() => {
      this.librarianService.getAllPlannedBooks().subscribe((books) => {
        this.bookings = books;
        this.filteredBookings = books.sort((book1, book2) =>
          book1.userId < book2.userId ? 1 : -1
        );
        zip(
          this.bookings.map((PBook) =>
            this.librarianService.getBook(PBook.bookId)
          )
        ).subscribe((books) => {
          books.forEach((book, index) => {
            this.filteredBookings[index].bookTitle = book.bookTitle;
          });
        });
      });
    }, 1500);
  }

  filterData() {
    const regex = new RegExp(this.filterValue, 'i');
    this.filteredBookings = this.bookings.filter(
      (booking) => regex.test(booking._id) || regex.test(booking.userId)
    );
  }

  acceptBook(trackingId: string) {
    this.librarianService.takeBook(trackingId).subscribe(
      (data) => {
        // console.log(data);
        this.librarianService.openSnackBar('Succesfully taken book', 'SUCCESS');
        this.fetchBookingData();
      },
      (err) => {
        console.error(err);
        this.librarianService.openSnackBar(err.error.message, 'DANGER');
      }
    );
  }

  cancelBook(id: string) {
    this.librarianService.cancelBook(id).subscribe(
      (data) => {
        // console.log(data);
        this.librarianService.openSnackBar(
          'Succesfully cancelled book',
          'SUCCESS'
        );
        this.fetchBookingData();
      },
      (err) => {
        console.error(err);
        this.librarianService.openSnackBar(err.error.message, 'DANGER');
      }
    );
  }
}
