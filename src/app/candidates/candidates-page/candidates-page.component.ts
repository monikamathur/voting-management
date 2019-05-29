import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../../candidates/service/candidates.service';

@Component({
  selector: 'app-candidates-page',
  templateUrl: './candidates-page.component.html',
  styleUrls: ['./candidates-page.component.scss']
})
export class CandidatesPageComponent implements OnInit {

  constructor(private candidatesService: CandidatesService) { }
  candidatesData;
  ngOnInit() {
    this.getCandidates();
  }
  getCandidates() {
    this.candidatesService.getCandidates().subscribe((data) => {
      this.candidatesData = data;
    });
  }

}
