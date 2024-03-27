import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/Movie';
import { MatDatepicker } from '@angular/material/datepicker';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDispatcher } from 'src/app/services/movie-dispatcher.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  movie = <Movie>{};
  avatar: string;
  uploadAvatarMessage: string;
  destroy$ = new Subject<void>();

  constructor(
    private movieDispatcher: MovieDispatcher) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      caption: new FormControl('', [Validators.required]),
      releaseYear: new FormControl('', [Validators.required]),
      movieLength: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required])
    });
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

  addMovie() {
    if (this.addForm.valid) {
      const newMovie: Movie = {
        ...this.movie,
        caption: this.addForm.value.caption,
        releaseYear: this.addForm.value.releaseYear,
        movieLength: this.addForm.value.movieLength,
        quantity: this.addForm.value.quantity,
        avatar: this.avatar
      };

      this.movieDispatcher.addMovie(newMovie);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  chosenYearHandler(any: Date, datepicker: MatDatepicker<any>) {
    this.addForm.controls['releaseYear'].setValue(any.getFullYear());
    datepicker.close();
  }

  getCaptionErrorMessage() {
    if (this.addForm.controls['caption'].hasError('required')) {
      return 'You must enter Movie caption';
    }

    return this.addForm.hasError('') ? 'You must enter a value' : '';
  }

  getReleaseErrorMessage() {
    if (this.addForm.controls['releaseYear'].hasError('required')) {
      return 'You must enter Movie release year';
    }

    return this.addForm.hasError('') ? 'You must enter a value' : '';
  }

  getLengthErrorMessage() {
    if (this.addForm.controls['movieLength'].hasError('required')) {
      return 'You must enter Movie length';
    }

    return this.addForm.hasError('') ? 'You must enter a value' : '';
  }

  getQuantityErrorMessage() {
    if (this.addForm.controls['quantity'].hasError('required')) {
      return 'You must enter Movie quantity';
    }

    return this.addForm.hasError('') ? 'You must enter a value' : '';
  }
}
