import { HttpClient, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";


@Injectable()
export class ProductService{
    // productUrl : string = "https://fakestoreapi.com/products";
    productUrl : string = "http://localhost:3000/products";
    constructor(private http : HttpClient){}

    //post method
    postNewProduct(newProduct : any){
        return this.http.post( this.productUrl , newProduct,{
            observe : 'events'
        }).pipe(tap((event : any) => {
            console.log(event)
            if(event.type === HttpEventType.Sent){
                console.log('product added successfully..!')
            }else if(event.type === HttpEventType.UploadProgress){
                console.log('uploading..')
            }else if(event.type === HttpEventType.DownloadProgress){
                console.log('downloading..')
            }
        }))
     }

     //get method
     fetchProductData(){
        return this.http.get(this.productUrl).pipe(map((resData : any) => {
            const prodList : any[] = [];
            for(const key in resData){
                prodList.push({...resData[key]})
            }
            return prodList
        }))
     }
     //update product
     updateProductData(id: any , editProduct: any){
         return this.http.put(this.productUrl+`/${id}`, editProduct)
     }

     //delete product
     deleteProductData(id: any){
         return this.http.delete(this.productUrl+`/${id}`)
     }
}