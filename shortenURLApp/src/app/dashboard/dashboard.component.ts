import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from "../requests.service";
import { StoreService } from '../store.service';
import { Chart } from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {
  shortURL: String = "";
  longURL: String = ""
  date: any = ""
  totalClicks: any;
  statID: any;
  id: any;
  myLineChart: any;
  myBarChart: any;
  myPiChart: any;
  redirectTo: any;
  constructor(private requestService: RequestsService, private storeService: StoreService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.storeService.updateViewFlag(false);
    this.id = +this.route.snapshot.paramMap.get('id');
    this.updateURLDetails();
    this.generateChartsData();
  }

  ngOnDestroy(){
    this.updateAllURLs();
  }
  refresh() {
    this.totalClicks=Number(this.totalClicks)+1+"";
    this.updateURLDetails();
    this.generateChartsData();
  }

  updateURLDetails() {
    this.requestService.getUrlDetails(this.id).subscribe(data => {
      this.shortURL = data['shortURL'];
      this.longURL = data['longURL'];
      this.date = data['date'];
      this.totalClicks = data['urlClicks'];
      this.redirectTo = 'http://localhost:8080/qrapi/api/v1/url/redirect?shortURL=' + data['shortURL'];
    }
    );
  }

  updateAllURLs() {
    this.requestService.getURLs().subscribe(
      data => {
        this.storeService.setUpdatedUrls(data);
      }
    );
  }

  generateChartsData() {
    this.redirectTo = 'http://localhost:8080/qrapi/api/v1/url/redirect?shortURL=' + this.shortURL;
    this.requestService.getUrlStats(this.id).subscribe(
      data => {
        this.populateLineChart(data[0].labelList, data[0].dataList);
        this.populatePiChart(data[1].labelList, data[1].dataList);
        this.populateBarChart(data[2].labelList, data[2].dataList);
      }
    );
  }

  populateLineChart(labelList: any, valueList: any) {
    this.myLineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: labelList,
        datasets: [
          {
            data: valueList,
            borderColor: '#4675ca',
            fill: true,
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Years'
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: '# of Clicks'
            }
          }]
        }
      }
    });
  }

  populateBarChart(labelList: any, valueList: any) {
    this.myBarChart = new Chart("barChart", {
      type: 'horizontalBar',
      data: {
        labels: labelList,
        datasets: [
          {
            data: valueList,
            backgroundColor: '#4675ca',
            borderColor: '#4675ca',
            borderWidth: 1
          }
        ]
      },
      options: {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          rectangle: {
            borderWidth: 5,
          }
        },
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: '# of Clicks'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Platforms'
            }
          }]
        }
      }
    });
  }

  populatePiChart(labelList: any, valueList: any) {
    this.myPiChart = new Chart('piChart', {
      type: 'pie',
      data: {
        datasets: [{
          data: valueList,
          backgroundColor: ["Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"],
        }],
        labels: labelList
      },
      options: {
        responsive: true
      }
    });
  }
}
