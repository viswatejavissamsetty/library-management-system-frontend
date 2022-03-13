import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';
import { environment } from 'src/environments/environment';

const allBooks = environment.urls.allBooks;
const book = environment.urls.book;
const planToTakeBook = environment.urls.newBookOrder;

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
  constructor(
    private http: HttpClient,
    private userProfileService: UserProfileService
  ) {}

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

  planToTakeBook(bookId: string): Observable<any> {
    const userId = this.userProfileService.userId;
    return <Observable<any>>this.http.post(planToTakeBook, { bookId, userId });
  }
}
