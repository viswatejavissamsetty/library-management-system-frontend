import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { zip } from 'rxjs';
import {
  BookingModel,
  LibrarianService,
} from '../../services/librarian.service';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss'],
})
export class ReturnsComponent implements OnInit {
  bookings: BookingModel[] = [];
  filteredBookings: BookingModel[] = [];

  filterValue: string = '';

  constructor(private librarianService: LibrarianService) {}

  ngOnInit(): void {
    this.fetchBookingData();
  }

  fetchBookingData() {
    setTimeout(() => {
      this.librarianService.getAllTakenBooks().subscribe((books) => {
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
            this.filteredBookings[index].takenDate = moment(
              this.filteredBookings[index].takenDate
            ).calendar();
            this.filteredBookings[index].returnedDate = moment(
              this.filteredBookings[index].returnedDate
            ).calendar();
            // Calculating fine
            if (moment().isAfter(this.filteredBookings[index].returnedDate)) {
              this.filteredBookings[index].fine =
                this.filteredBookings[index].fine *
                moment().diff(
                  this.filteredBookings[index].returnedDate,
                  'days'
                );
            } else {
              this.filteredBookings[index].fine = 0;
            }
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

  returnBook(trackingId: string) {
    this.librarianService.returnBook(trackingId).subscribe(
      (data) => {
        console.log(data);
        this.librarianService.openSnackBar(
          'Succesfully returned bood',
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
