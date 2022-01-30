import { Component, Input, OnInit } from '@angular/core';
import { BookType } from '../../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  @Input()
  books: BookType[] = [];

  constructor() {}

  ngOnInit(): void {}
}
