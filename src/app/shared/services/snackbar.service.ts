import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

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
