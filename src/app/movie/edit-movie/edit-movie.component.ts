import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/Movie';
import { MatDatepicker } from '@angular/material/datepicker';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDispatcher } from 'src/app/services/movie-dispatcher.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  movie: Movie;
  avatar: string;
  uploadAvatarMessage: string;
  destroy$ = new Subject<void>();

  constructor(
    private movieDispatcher: MovieDispatcher,
    public dialogRef: MatDialogRef<EditMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.movie = data.movie;
     }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      caption: new FormControl(this.movie.caption, [Validators.required]),
      releaseYear: new FormControl(this.movie.releaseYear, [Validators.required]),
      movieLength: new FormControl(this.movie.movieLength, [Validators.required]),
      quantity: new FormControl(this.movie.quantity, [Validators.required])
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAvatarChange(event: any) {
    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this.uploadAvatarMessage = "Only images are supported.";
        return;
    }

    this.uploadAvatarMessage = "";

    let src = URL.createObjectURL(files[0]);
    this.compressImage(src, 200).then(compressed => {
      this.avatar = compressed as string;
    });
  }

  compressImage(src: string, maxSideLength: number) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        if(img.width < maxSideLength && img.height < maxSideLength) {
          res(src);
        }

        let newX = 0, newY = 0;

        newX = maxSideLength / img.height * img.width;
        newY = maxSideLength;

        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext('2d');
        ctx!.drawImage(img, 0, 0, newX, newY);
        const data = ctx!.canvas.toDataURL();
        res(data);
      }
      img.onerror = error => rej(error);
    })
  }

  editMovie() {
    if (this.editForm.valid) {
      const updatedMovie: Movie = {
        ...this.movie,
        caption: this.editForm.value.caption,
        releaseYear: this.editForm.value.releaseYear,
        movieLength: this.editForm.value.movieLength,
        quantity: this.editForm.value.quantity,
        avatar: this.avatar || this.movie.avatar
      };

      this.movieDispatcher.editMovie(updatedMovie);
    }
  }

  chosenYearHandler(any: Date, datepicker: MatDatepicker<any>) {
    this.editForm.controls['releaseYear'].setValue(any.getFullYear());
    datepicker.close();
  }

  getCaptionErrorMessage() {
    if (this.editForm.controls['caption'].hasError('required')) {
      return 'You must enter Movie caption';
    }

    return this.editForm.hasError('') ? 'You must enter a value' : '';
  }

  getReleaseErrorMessage() {
    if (this.editForm.controls['releaseYear'].hasError('required')) {
      return 'You must enter Movie release year';
    }

    return this.editForm.hasError('') ? 'You must enter a value' : '';
  }

  getLengthErrorMessage() {
    if (this.editForm.controls['movieLength'].hasError('required')) {
      return 'You must enter Movie length';
    }

    return this.editForm.hasError('') ? 'You must enter a value' : '';
  }

  getQuantityErrorMessage() {
    if (this.editForm.controls['quantity'].hasError('required')) {
      return 'You must enter Movie quantity';
    }

    return this.editForm.hasError('') ? 'You must enter a value' : '';
  }
}
