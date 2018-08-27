import { Component, OnInit } from '@angular/core';
import { RequestsService } from "../requests.service";
import { StoreService } from '../store.service';
import { trigger, transition, animate, style, state, group } from '@angular/animations';

@Component({
  selector: 'app-urltable',
  templateUrl: './urltable.component.html',
  styleUrls: ['./urltable.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ width: 120, transform: 'translateX(0)', opacity: 1 })),
      transition('void => *', [
        style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
        group([
          animate('1.5s 0.2s ease', style({
            transform: 'translateX(0)'
          })),
          animate('1s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.3s ease', style({
            transform: 'translateX(50px)',
            width: 10
          })),
          animate('0.3s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class UrltableComponent implements OnInit{
  urls = [];
  viewFlag: boolean;
  constructor(private requestService: RequestsService, private storeService: StoreService) { }

  ngOnInit() {
    this.getAllURLs();
    this.storeService.tableFlag.subscribe(data => {
      this.viewFlag = data;
    });
    this.storeService.updatedurls.subscribe(data => {
      this.urls = data;
    });
  }

  getAllURLs() {
    this.requestService.getURLs().subscribe(
      data => {
        this.urls = data;
        this.storeService.setURLs(data);
      }
    );
  }
}
