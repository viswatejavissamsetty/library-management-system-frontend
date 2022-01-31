import { BookType } from './../../../services/books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/users/services/books.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private _snackBar: MatSnackBar
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
        this.router.navigateByUrl('users/bookings')
        this.openSnackBar("Book taken succesfully");
      },
      (err) => {
        console.error(err);
        this.openSnackBar(err.error.message)
      }
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'dismiss', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
