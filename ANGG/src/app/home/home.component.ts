import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const util = require('util');
const exec = util.promisify(require('child_process').exec);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currVal = "";
  incR = "";
  incrP = "";
  clearTime: any;

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.clearTime = setInterval(() => {
      this.getResult();
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.clearTime);
  }

  async getResult() {
    let result = await exec(`curl --location --request GET 'https://www.google.com/async/finance_wholepage_price_updates?ei=4v5MXqG6B-Laz7sP0eGxoAU&yv=3&async=mids:%2Fm%2F046k_p,currencies:,_fmt:jspb'`);
    let temp = JSON.parse(result.stdout.split("'")[1]);
    let wrk = temp.PriceUpdate[0][0][0];
    console.log('wrk:', wrk)
    this.currVal = wrk[17][3];
    this.incR = wrk[17][5];
    this.incrP = wrk[17][6];

    console.log('this.currVal:', this.currVal)
    console.log('this.incR:', this.incR)
    console.log('this.incrP:', this.incrP)
  }
}
