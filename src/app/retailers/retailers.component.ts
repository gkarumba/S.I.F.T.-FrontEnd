import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { delay } from 'q';


@Component({
  selector: 'app-retailers',
  templateUrl: './retailers.component.html',
  styleUrls: ['./retailers.component.css']
})
export class RetailersComponent implements OnInit {
  public searchterm: string;
  public prod: string;
  products;
  public retail: string;
  retailers;
  Arr = Array;
  dealers = [];
  private minPrice: number;
  private maxPrice: number;
  public modalIsVisible = false;
  public ratingVisible = false;
  public loading:boolean;
  private ratingValue;
  public num:number;
  minValue = 500;
  maxValue = 30000;
  options: Options = {
    floor: 0,
    ceil: 50000,
    animate: false,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          this.minPrice = value;
          return '<b></b>' + value;
        case LabelType.High:
          this.maxPrice = value;
          return '<b></b>' + value;
            default:
              return 'Kes'+ value;
      }
    }
  };
  toggle() {
    this.modalIsVisible  = !this.modalIsVisible;
    this.ratingVisible = false;
  }

  toggleRating() {
    this.ratingVisible = !this.ratingVisible;
    this.modalIsVisible = false;
  }

  constructor(private prods: ProductService, private router: Router) { }
  ngOnInit() {
    this.prod = localStorage.getItem('products');
    this.products = JSON.parse(this.prod);
    console.log(this.products);
    this.retail = localStorage.getItem('locations');
    this.retailers = JSON.parse(this.retail);
    this.loading = JSON.parse(localStorage.getItem('loading'));
    setTimeout(() => {
      this.loading = false;
    }, 3000);
    if (this.retailers.length < 1) {
      alert('This service couldn\'t get your location, Please allow browser to access your location');
    }
    for ( let i = 0; i < this.retailers.length; i++) {
      for (let j = 0; j < this.products.length; j++) {
        if (this.products[j].retailer === this.retailers[i].id) {
          this.retailers[i].products = this.products[j];
          this.dealers.push(this.retailers[i]);
        }
      }
    }
    this.num = this.dealers.length;

    console.log(this.dealers);
  }

  searchProduct() {
    this.prods.searchProduct(this.searchterm).subscribe(res => {
      for (var i =0;i < res.length; i++){
        var re = res[i].image;
        var matchProtocolDomainHost = /^.*\/\/[^\/]+:?[0-9]?\//i;

        // Replace protocol, domain and host from url, assign to `myNewUrl`
        var myNewUrl = re.replace(matchProtocolDomainHost, '');
        var me = 'http://35.177.84.175/' + myNewUrl;
        res[i].image = me;
      }
      this.products = JSON.stringify(res);
      console.log(this.products);
      localStorage.setItem('products', this.products);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/retailers']));
    },
    err => {
      console.log(err);
      alert('Could not find the item you\'re looking for');
    });
  }

}
