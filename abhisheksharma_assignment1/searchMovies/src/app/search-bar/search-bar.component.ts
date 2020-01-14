import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import GetmoviesService from './getmovies.service';
import MoviesService from '../movies.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  @Output() refreshList = new EventEmitter();
  inp: string;
  autoCmpList: [];
  showList = false;
  constructor(private getMoviesService: GetmoviesService, private moviesService: MoviesService) { }

  ngOnInit() {
  }

  onSubmit(q: string) {
    const query = q.trim();
    this.showList = false;
    this.inp = q;
    if (query !== '') {
      this.searchMovies(query)
        .subscribe((responseData: {resp?: [], error?: string}) => {
          if (responseData.error) {
            this.moviesService.error = responseData.error;
          } else {
            this.moviesService.setMovies(responseData.resp);
          }
          this.refreshList.emit();
        });
    }
  }

  autoCmp(val: string) {
    if (val && val.trim().length > 1) {
      this.showList = true;
      this.searchMovies(val)
        .subscribe((responseData: {resp: []}) => {
          this.autoCmpList = responseData.resp;
        });
    } else {
      this.showList = false;
      this.autoCmpList = [];
    }
  }

  private searchMovies(query) {
    return this.getMoviesService.getMovies(query);
  }
}
