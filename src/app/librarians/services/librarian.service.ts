import { UserProfileService } from 'src/app/shared/services/user-profile.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

const getAllPlannedBooks = environment.urls.getAllPlannedBooks;
const getAllTakenBooks = environment.urls.getAllTakenBooks;
const takeBook = environment.urls.takeBook;
const returnBook = environment.urls.returnBook;
const cancelBook = environment.urls.cancelBook;
const newBook = environment.urls.newBook;

const book = environment.urls.book;


export interface BookingModel {
  readonly _id: string;
  readonly userId: string;
  readonly bookId: string;
  planedDate: string;
  takenDate: string;
  returnedDate: string;
  readonly status: string;
  fine: number;
  readonly issuer: string | null;
  bookName: string | null;
  readonly __v: 0;
}

export interface BookModel {
  bookTitle: string;
  bookDescription: string;
  authorName: string;
  authorDescription: string;
  price: number;
  fine: number;
  totalNumberOfBooks: number;
  category: string;
  image: File;
  ratings?: number;
}

interface BookType {
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
export class LibrarianService {
  constructor(
    private http: HttpClient,
    private userProfileService: UserProfileService,
    private _snackBar: MatSnackBar
  ) {}

  getAllPlannedBooks(): Observable<BookingModel[]> {
    const userId = this.userProfileService.getUserId();
    return <Observable<BookingModel[]>>(
      this.http.get(getAllPlannedBooks, { params: { userId } })
    );
  }

  getAllTakenBooks(): Observable<BookingModel[]> {
    const userId = this.userProfileService.getUserId();
    return <Observable<BookingModel[]>>(
      this.http.get(getAllTakenBooks, { params: { userId } })
    );
  }

  takeBook(trackingId: string): Observable<any> {
    const librarianId = this.userProfileService.getUserId();
    return <Observable<any>>(
      this.http.patch(takeBook, { librarianId, trackingId })
    );
  }

  returnBook(trackingId: string): Observable<any> {
    const librarianId = this.userProfileService.getUserId();
    return <Observable<any>>(
      this.http.patch(returnBook, { librarianId, trackingId })
    );
  }
  
  cancelBook(id: string): Observable<any> {
    return <Observable<any>>this.http.delete(cancelBook, { params: { id } });
  }

  newBook(bookData: BookModel, image: File): Observable<BookModel> {
    bookData.image = image;
    const newData = this.convertData(bookData);
    return <Observable<BookModel>>this.http.post(newBook, newData);
  }

  private convertData(bookData: any) {
    console.log(bookData);
    const formData = new FormData();
    for (const key of Object.keys(bookData)) {
      formData.append(key, bookData[key]);
    }
    return formData;
  }

  getBook(bookId: string): Observable<BookType> {
    return <Observable<BookType>>this.http.get(book, {
      params: {
        bookId,
      },
    });
  }

  openSnackBar(message: string, level: 'DANGER' | 'SUCCESS' | 'NORMAL') {
    const pannelClasses = {
      DANGER: 'text-danger',
      SUCCESS: 'text-success',
      NORMAL: '',
    };
    this._snackBar.open(message, 'dismiss', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: pannelClasses[level],
    });
  }
}
