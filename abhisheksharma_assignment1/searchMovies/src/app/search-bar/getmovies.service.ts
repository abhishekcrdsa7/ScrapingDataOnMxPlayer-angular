import {HttpClient, HttpParams} from '@angular/common/http';
import constants from '../Constants';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export default class GetmoviesService {
  constructor(private http: HttpClient) {}

  getMovies(query) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('term', query);
    return this.http
      .get(constants.serverURL, {
      params: searchParams
    });
  }
}
