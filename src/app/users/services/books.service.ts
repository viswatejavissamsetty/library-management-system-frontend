import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const allBooks = environment.urls.allBooks;
const book = environment.urls.book;

export interface BookType {
  _id: string;
  bookTitle: string;
  bookDescription: string;
  authorName: string;
  authorDescription: string;
  imagePath: string;
  price: number;
  fine: number;
  totalNumberOfBooks: number;
  availableNumberOfBooks: number;
  ratings: number;
  category: string;
  __v: string;
}

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<BookType[]> {
    return <Observable<BookType[]>>this.http.get(allBooks);
  }

  getBook(bookId: string): Observable<BookType> {
    return <Observable<BookType>>this.http.get(book, {
      params: {
        bookId,
      },
    });
  }
}
