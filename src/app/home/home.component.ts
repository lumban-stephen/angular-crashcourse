import { Component } from '@angular/core';
import { ProductsService } from '../services/product.service';
import { ProductComponent } from "../components/product/product.component";
import { Product, Products } from '../../types';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private productsService: ProductsService
  ) {}

  products: Product[] = [];
  rows: number = 5;
  totalRecords: number = 0;

  onProductOutput(product: Product) {
    console.log(product, "Output")
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  } 

  fetchProducts(page: number, perPage: number) {
    this.productsService.getProducts('http://localhost:3000/clothes', {page: 0, perPage: 5})
    .subscribe((products: Products) => {
      this.products = products.items;
      this.totalRecords = products.total;
    })
  }

  ngOnInit() {
    this.fetchProducts(0,5);
  }
}
