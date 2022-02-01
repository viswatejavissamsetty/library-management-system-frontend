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
    private router: Router
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
        this.booksService.openSnackBar('Book taken succesfully', 'SUCCESS');
        this.router.navigateByUrl('users/bookings');
      },
      (err) => {
        console.error(err);
        this.booksService.openSnackBar(err.error.message, 'DANGER');
      }
    );
  }
}
