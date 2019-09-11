import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private searchUrl = 'http://35.177.84.175/products/?search=';
  private retailerUrl = 'http://35.177.84.175/retailers/';

  constructor(private http: HttpClient) { }

  searchProduct(product) {
    // this.searchUrl = this.searchUrl + product;
    console.log(this.searchUrl);
    return this.http.get<any>(this.searchUrl + product);
  }
  getNearestShops(coordinates) {
    return this.http.post<any>(this.retailerUrl, coordinates);
  }


}
