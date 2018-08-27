import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-expirypage',
  templateUrl: './expirypage.component.html',
  styleUrls: ['./expirypage.component.css']
})
export class ExpirypageComponent implements OnInit {

  constructor(private storeService:StoreService) { }

  ngOnInit() {
    this.storeService.updateViewFlag(false);
  }

}
