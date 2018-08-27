import { Component, OnInit} from '@angular/core';
import { RequestsService } from "../requests.service";
import { trigger, transition, animate, style, state } from '@angular/animations'
import { StoreService } from '../store.service';
import { Url } from '../Models/UrlModel';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('FadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000)
      ]),
    ])
  ]

})
export class LandingComponent implements OnInit{

  tb_show: boolean = true;
  db_updated: boolean = false;
  url_validity: boolean = false;
  db_already_exist: boolean = false;
  newURL: any;
  oldURLs:any;
  constructor(private requestService: RequestsService, private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.updateViewFlag(true);
  }

  // Create a POST request through requestService
  generateShortenURL(URL) {
    if (this.validateURL(URL)) {
      this.requestService.shortenURL({ "longURL": URL }).subscribe(
        data => {
          if (data == null) {
            this.db_already_exist = true;
            this.db_updated = false;
            this.url_validity = false;
          }
          if (data != null) {
            this.newURL = data;
            this.newURL.urlStatList=[];
            this.storeService.urls.subscribe(data =>
            {
              this.oldURLs=data;
            });
            this.oldURLs.push(this.newURL);
            this.storeService.setUpdatedUrls(this.oldURLs);
            this.db_already_exist = false;
            this.db_updated = true;
            this.url_validity = false;
          }
        }
      );
    }
    else {
      console.log("Invalid URL");
      this.url_validity = true;
      this.db_updated = false;
    }
  }

  // Validate the provided URL
  validateURL(URL) {
    var regex = "^(http|https|ftp)\\://([a-zA-Z0-9\\.\\-]+(\\:[a-zA-Z0-9\\.&amp;%\\$\\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\\-]+\\.)*[a-zA-Z0-9\\-]+\\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\\:[0-9]+)*(/($|[a-zA-Z0-9\\.\\,\\?\\'\\\\\\+&amp;%\\$#\\=~_\\-]+))*$"
    return new RegExp(regex).test(URL);
  }
}
