import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit , AfterViewInit {
  productForm : FormGroup | any;
  editForm : FormGroup | any;
  productArr : any[] = [];
  err : any = null;
  productId : string |any;
  productTitle : string |any;
  productPrice : number |any;
  productDescription: string |any;
  productImage : string |any;
  selectedProduct : any;


  constructor(private productServe : ProductService , private fb: FormBuilder, private router: Router) { }
  ngAfterViewInit(): void {
  
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      'id' : new FormControl(),
      'title' : new FormControl('', Validators.required),
      'price' : new FormControl('', Validators.required),
      'description' : new FormControl('', Validators.required),
      'image' : new FormControl('', Validators.required)
    })
    this.getProductData()
    //initializing editProduct properties
    this.productId = new FormControl(),
    this.productTitle = new FormControl('', Validators.required),
    this.productPrice = new FormControl('', Validators.required),
    this.productDescription = new FormControl('', Validators.required),
    this.productImage = new FormControl('', Validators.required)
    this.editForm = this.fb.group({
      'id' : this.productId,
      'title' : this.productTitle,
      'price' : this.productPrice,
      'description' : this.productDescription,
      'image' : this.productImage
    }) 
  }
  //Adding new product
  onClickAdd(){
    let newProduct = this.productForm.value
    this.productServe.postNewProduct(newProduct).subscribe((result : any) => {
      console.log(result)
      this.productArr.push(this.productForm.value)
      this.productForm.reset()
      this.getProductData()
    })
    
  }
  //fetching product
  getProductData(){
    this.productServe.fetchProductData().subscribe((data:any) => {
      console.log(data)
      this.productArr = data;
    },(error: any) => {
      this.err = error.message
      console.log(error)
    })
  }
  //on edit modal
  onEditModal(editProduct : any){
    console.log('edit is working')
    this.productTitle.setValue(editProduct.title)
    this.productPrice.setValue(editProduct.price)
    this.productDescription.setValue(editProduct.description)
    this.productImage.setValue(editProduct.image)

    this.editForm.setValue({
      'productId' : this.productId.setValue(editProduct.id).value,
      'productTitle' : this.productTitle.setValue(editProduct.title).value,
      'productPrice' : this.productPrice.value,
      'productDescription' : this.productDescription.value,
      'productImage' : this.productImage.value,
    })
  }


  //updating existing product
  onUpdate(){
    let editProduct = this.editForm.value;
    this.productServe.updateProductData(editProduct.id , editProduct).subscribe((data:any) => {
      console.log(data);
      this.getProductData();
      this.editForm.reset();
    },
    (error: any) => {
      this.err = error.message
      console.log(error)
    })
  }

  //delete existing product
  onDelete(deleteProduct: any){
    this.productServe.deleteProductData(deleteProduct.id).subscribe((data) => {
      console.log(data)
      this.getProductData()
    })
  }

  //list the selected product
  onSelected(product : any){
    this.selectedProduct = product;
    this.router.navigate(['product-details'])
  }
}
