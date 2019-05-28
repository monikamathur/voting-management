import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {APP_CONSTANTS} from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  candidateApiURL: any = APP_CONSTANTS.CANDIDATES_API;
  voteCandidateApiURL: any = APP_CONSTANTS.VOTE_API;

  constructor(private httpClient: HttpClient) { }

  public getCandidates() {
    return this.httpClient.get(this.candidateApiURL);
  }

  public voteCandidates(data) {
    return this.httpClient.put(this.voteCandidateApiURL, data);
  }
}
