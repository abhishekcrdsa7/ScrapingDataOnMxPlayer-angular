import {Component} from '@angular/core';
import MoviesService from './movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  movies = [];
  showMessage = false;
  message: string;

  constructor(private movieService: MoviesService) {}

  onRefreshList() {
    this.showMessage = false;
    if (this.movieService.getMovies()) {
      this.movies = this.movieService.getMovies();
      if (this.movies.length <= 0) {
        this.showMessage = true;
        this.message = 'Sorry! No movies were found matching your query.';
      }
    } else {
      this.showMessage = true;
      this.message = 'Sorry! There was an error. Please try again.';
    }
    this.movieService.error = '';
  }
}
