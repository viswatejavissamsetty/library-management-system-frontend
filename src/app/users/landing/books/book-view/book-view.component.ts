import { BookType } from './../../../services/books.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/users/services/books.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {

  bookDetails!: BookType;

  constructor(private booksService: BooksService, private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const bookId = this.aRoute.snapshot.params['book'];
    this.booksService.getBook(bookId).subscribe(book=>{
      this.bookDetails = book;
    })
  }

}
