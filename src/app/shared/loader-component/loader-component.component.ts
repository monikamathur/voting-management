import { Component, OnInit } from '@angular/core';
import { LoaderService } from './../service/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader-component',
  templateUrl: './loader-component.component.html',
  styleUrls: ['./loader-component.component.scss']
})
export class LoaderComponentComponent implements OnInit {

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService){}

  ngOnInit() {
  }

}
