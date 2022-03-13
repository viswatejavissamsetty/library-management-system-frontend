import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { zip } from 'rxjs';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
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

  constructor(
    private librarianService: LibrarianService,
    private notificationsService: NotificationsService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.fetchBookingData();
  }

  fetchBookingData() {
    setTimeout(() => {
      this.librarianService.getAllTakenBooks().subscribe((books) => {
        this.bookings = books;
        this.filteredBookings = books
          .map((booking) => {
            booking.returnedDate = moment(booking.returnedDate).fromNow();
            booking.takenDate = moment(booking.takenDate).fromNow();
            return booking;
          })
          .sort((book1, book2) => (book1.userId < book2.userId ? 1 : -1));
      });
    }, 500);
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
        this.snackbarService.openSnackBar(
          'Succesfully returned bood',
          'SUCCESS'
        );
        this.notificationsService.notificationFetchControl.next(true);
        this.fetchBookingData();
      },
      (err) => {
        this.snackbarService.openSnackBar(err.error.message, 'DANGER');
      }
    );
  }
}
