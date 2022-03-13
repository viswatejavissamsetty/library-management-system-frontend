import { LibrarianService } from './../../services/librarian.service';
import { Component, OnInit } from '@angular/core';
import { BookingModel } from 'src/app/users/services/booking.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
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
      this.librarianService.getAllPlannedBooks().subscribe((books) => {
        this.bookings = books;
        this.filteredBookings = books.sort((book1, book2) =>
          book1.userId < book2.userId ? 1 : -1
        );
      });
    }, 500);
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
        this.notificationsService.notificationFetchControl.next(true);
        this.snackbarService.openSnackBar('Succesfully taken book', 'SUCCESS');
        this.fetchBookingData();
      },
      (err) => {
        this.snackbarService.openSnackBar(err.error.message, 'DANGER');
      }
    );
  }

  cancelBook(id: string) {
    this.librarianService.cancelBook(id).subscribe(
      (data) => {
        this.notificationsService.notificationFetchControl.next(true);
        this.snackbarService.openSnackBar(
          'Succesfully cancelled book',
          'SUCCESS'
        );
        this.fetchBookingData();
      },
      (err) => {
        this.snackbarService.openSnackBar(err.error.message, 'DANGER');
      }
    );
  }
}
