import { Observable } from 'rxjs';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

const getAllUserPlannedBooks = environment.urls.getAllUserPlannedBooks;
const getAllUserTakenBooks = environment.urls.getAllUserTakenBooks;
const cancelBook = environment.urls.cancelBook;

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
  readonly bookName: string | null;
  readonly __v: 0;
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(
    private http: HttpClient,
    private userProfileService: UserProfileService
  ) {}

  getAllPlannedBooks(): Observable<BookingModel[]> {
    const userId = this.userProfileService.userId;
    return <Observable<BookingModel[]>>(
      this.http.get(getAllUserPlannedBooks, { params: { userId } })
    );
  }

  getAllTakenBooks(): Observable<BookingModel[]> {
    const userId = this.userProfileService.userId;
    return <Observable<BookingModel[]>>(
      this.http.get(getAllUserTakenBooks, { params: { userId } })
    );
  }

  cancelBook(id: string): Observable<any> {
    return <Observable<any>>this.http.delete(cancelBook, { params: { id } });
  }
}
