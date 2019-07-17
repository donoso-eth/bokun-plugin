import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { InventoryService } from './services/inventory-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productSearchGroup: FormGroup;
  productSearchResult: string;
  productIdGroup: FormGroup;
  prodIdResult: string;

  constructor(
    private inventoryService: InventoryService,
    private formBuilder: FormBuilder
    ) {
    this.productSearchGroup = this.formBuilder.group({
      cityCtrl: [''],
      countryCtrl: ['', ],
      productNameCtrl: ['']
    });

    this.productIdGroup = this.formBuilder.group({
      externalId: [''],
    });

   }

   idProduct()  {
    const idRequest = {};
    if (this.productIdGroup.controls.externalId.value !== '') {
     // tslint:disable-next-line:no-string-literal
     idRequest['externalId'] = this.productIdGroup.controls.externalId.value;
    }

    this.inventoryService.getProductById(idRequest)
    .subscribe(result =>  { this.prodIdResult = JSON.stringify(result); console.log(result); });

  }


   searchProduct() {
     const searchRequest = {};
     if (this.productSearchGroup.controls.cityCtrl.value !== '') {
      // tslint:disable-next-line:no-string-literal
      searchRequest['externalId'] = this.productSearchGroup.controls.cityCtrl.value;
     }
     if (this.productSearchGroup.controls.countryCtrl.value !== '') {
      // tslint:disable-next-line:no-string-literal
      searchRequest['country'] = this.productSearchGroup.controls.countryCtrl.value;
     }
     if (this.productSearchGroup.controls.countryCtrl.value !== '') {
      // tslint:disable-next-line:no-string-literal
      searchRequest['productName'] = this.productSearchGroup.controls.productNameCtrl.value;
     }

     this.inventoryService.getProductSearch(searchRequest)
     .subscribe(result =>  { this.productSearchResult = JSON.stringify(result); console.log(result); });

   }


  ngOnInit() {
  }

}
