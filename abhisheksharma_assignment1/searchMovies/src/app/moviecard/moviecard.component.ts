import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.css']
})
export class MoviecardComponent implements OnInit {
  @Input() movie;
  private name = '';
  private language = '';
  private year = '';
  private rating = '';
  constructor() { }

  ngOnInit() {
    this.name = this.movie.MovieName;
    this.year = this.movie.Year;
    this.rating = this.movie.IMDbRating;
    this.language = this.movie.Language;
  }

}
