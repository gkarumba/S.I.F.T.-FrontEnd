import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { delay } from 'q';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public searchterm: string;
  public products: string;
  public loading:boolean = true;
  public load:string;

  DJANGO_SERVER = 'http://127.0.0.1:8000';
  form: FormGroup;
  response;
  imageURL;
  searchtermimg;
  newList = []

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService,private auth: AuthService, private prod: ProductService, private router: Router) { }

  searchProduct() {
    this.prod.searchProduct(this.searchterm).subscribe(res => {
      for (var i =0;i < res.length; i++){
        var re = res[i].image;
        var url = new URL(re);
        url.hostname = 'http://35.177.84.175/'
        res[i].image = url.href
        console.log(url.href)
      }
      this.products = JSON.stringify(res);
      console.log(this.products);
      localStorage.setItem('products', this.products);
      this.load = JSON.stringify(this.loading);
      localStorage.setItem('loading', this.load);
      this.router.navigate(['/retailers']);
    },
    err => {
      console.log(err);
      alert('Could not find the item you\'re looking for');
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      image: ['']
    });
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image').setValue(file);
      console.log(file);
      const formData = new FormData();
      formData.append('file', this.form.get('image').value);
 
      this.uploadService.upload(formData).subscribe(
      (res) => {
        this.response = res;
        this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
        console.log(res);
        this.searchtermimg = res.name;
        this.searchImage(this.searchtermimg);
 
        // console.log(this.imageURL);
      },
      (err) => {
        console.log(err);
      }
    );
    }
  }
  searchImage(image) {
    this.prod.searchProduct(image).subscribe(res => {
      for (var i =0;i < res.length; i++){
        var re = res[i].image;
        var matchProtocolDomainHost = /^.*\/\/[^\/]+:?[0-9]?\//i;

        // Replace protocol, domain and host from url, assign to `myNewUrl`
        var myNewUrl = re.replace(matchProtocolDomainHost, '');
        var me = 'http://35.177.84.175/' + myNewUrl;
        res[i].image = me;
        // var url = new URL(re);
        // url.hostname = '35.177.84.175';
        
        // res[i].image = (url.href) ;
        // console.log(url.href)
        this.newList.push(res[i]);
        console.log(this.newList)
      }
      console.log(this.newList)
      this.products = JSON.stringify(res);
      // console.log(this.products);
      localStorage.setItem('products', this.products);
      this.router.navigate(['/retailers']);
    },
    err => {
      console.log(err);
      alert('Could not find the item you\'re looking for');
    });
  }

}
