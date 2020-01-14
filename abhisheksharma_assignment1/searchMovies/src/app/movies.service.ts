import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export default class MoviesService {
  movies: [];
  error: string;

  setMovies(movies) {
    this.movies = movies;
  }

  getMovies() {
    return this.movies;
  }
}
