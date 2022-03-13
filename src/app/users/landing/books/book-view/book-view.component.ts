import { BookType } from './../../../services/books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/users/services/books.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
})
export class BookViewComponent implements OnInit {
  bookDetails!: BookType;

  constructor(
    private booksService: BooksService,
    private aRoute: ActivatedRoute,
    private notificationsService: NotificationsService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    const bookId = this.aRoute.snapshot.params['book'];
    this.booksService.getBook(bookId).subscribe((book) => {
      this.bookDetails = book;
    });
  }

  takeBook() {
    this.booksService.planToTakeBook(this.bookDetails._id).subscribe(
      (data) => {
        this.notificationsService.notificationFetchControl.next(true);
        this.snackbarService.openSnackBar('Book taken succesfully', 'SUCCESS');
        this.router.navigateByUrl('users/bookings');
      },
      (err) => {
        console.error(err);
        this.snackbarService.openSnackBar(err.error.message, 'DANGER');
      }
    );
  }
}
