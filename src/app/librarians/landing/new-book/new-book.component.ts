import { LibrarianService } from './../../services/librarian.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss'],
})
export class NewBookComponent implements OnInit {
  categoryOptions: string[] = [
    'ECE',
    'CSE',
    'EEE',
    'MECH',
    'IT',
    'AERONOTICAL',
    'AEROSPACE',
    'CHEMICAL',
    'GENERAL',
    'CIVIL',
  ].sort((cat1, cat2) => (cat1 > cat2 ? 1 : -1));
  image: File | null = null;

  newBookFormData: FormGroup;

  constructor(
    private fb: FormBuilder,
    private librarianService: LibrarianService
  ) {
    this.newBookFormData = fb.group({
      bookTitle: ['', Validators.required],
      bookDescription: ['', Validators.required],
      authorName: ['', Validators.required],
      authorDescription: ['', Validators.required],
      price: ['', Validators.required],
      fine: [1, Validators.required],
      totalNumberOfBooks: ['', Validators.required],
      category: ['', Validators.required],
      ratings: [0],
      image: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  addImage(event: any) {
    this.image = event.target.files[0]
    // this.newBookFormData.patchValue({
    //   image: event.target.files[0],
    // });
  }

  submitForm() {
    if(this.image){
      this.librarianService.newBook(this.newBookFormData.value, this.image).subscribe(
        (data) => {
          if(data){
            this.librarianService.openSnackBar("Successfully added book", "SUCCESS")
          }
        },
        (err) => {
          console.error(err);
          this.librarianService.openSnackBar(err.error.message, "DANGER");
        }
      );
    }
    console.log(this.newBookFormData);
  }
}
