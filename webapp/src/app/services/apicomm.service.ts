import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BannerDetails, CategorySelection, ProductDetails } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class ApicommService {

  constructor(private http: HttpClient) { }

  private rootURL = environment.apiURL;

  getBanners(): Observable<BannerDetails[]> {
    return this.http.get<BannerDetails[]>(this.rootURL + '/banners');
  }


  getCategories(): Observable<CategorySelection[]> {
    return this.http.get<CategorySelection[]>(this.rootURL + '/categories');
  }


  getProducts(): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(this.rootURL + '/products');
  }

  addToCart(productId: string): Observable<{}>{
    // return this.http.get<string>(this.rootURL + '/addToCart', {productID: productId});
     return this.http.get<string>(this.rootURL + '/addToCart'); /// Changing from post to get to facilitate testing due to CORS Issue
  }
}
