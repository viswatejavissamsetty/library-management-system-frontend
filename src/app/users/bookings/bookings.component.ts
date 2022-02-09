import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { Component, OnInit } from '@angular/core';
import { BookingModel, BookingService } from '../services/booking.service';
import * as moment from 'moment';

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
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.fetchAllPlannedBooks();
    this.fetchAllTakenBooks();
  }

  private fetchAllPlannedBooks() {
    setTimeout(() => {
      this.bookingService.getAllPlannedBooks().subscribe((plannedBooks) => {
        this.plannedBooks = plannedBooks.reverse();
        this.plannedBooks = this.plannedBooks.map(plannedBook => {
          return {
            ...plannedBook,
            planedDate: moment(plannedBook.planedDate).calendar(),
            returnedDate: moment(plannedBook.planedDate).add({days: 2}).calendar(),
          }
        })
      });
    }, 500);
  }

  private fetchAllTakenBooks() {
    setTimeout(() => {
      this.bookingService.getAllTakenBooks().subscribe((takenBooks) => {
        this.takenBooks = takenBooks.reverse();
        this.takenBooks = takenBooks.map(takenBook => {
          return {
            ...takenBook,
            takenDate: moment(takenBook.takenDate).calendar(),
            returnedDate: moment(takenBook.returnedDate).calendar(),
          }
        })
      });
    }, 500);
  }

  cancelBook(id: string) {
    this.bookingService.cancelBook(id).subscribe(
      (data) => {
        this.bookingService.openSnackBar(
          `Book cancelled succesfully`,
          'SUCCESS'
        );
        this.notificationsService.notificationFetchControl.next(true);
        this.fetchAllPlannedBooks();
      },
      (err) => {
        console.error(err);
        this.bookingService.openSnackBar(err.error.message, 'DANGER');
      }
    );
  }
}
