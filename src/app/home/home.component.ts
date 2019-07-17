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
  productIdResult: string;
  productIdGroup: FormGroup;

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
    const searchRequest = {};
    if (this.productSearchGroup.controls.cityCtrl.value !== '') {
     // tslint:disable-next-line:no-string-literal
     searchRequest['city'] = this.productSearchGroup.controls.cityCtrl.value;
    }


    this.inventoryService.getProductById(searchRequest)
    .subscribe(result =>  { this.productIdResult = JSON.stringify(result); console.log(result); });

  }


   searchProduct() {
     const idRequest = {};
     if (this.productSearchGroup.controls.cityCtrl.value !== '') {
      // tslint:disable-next-line:no-string-literal
      idRequest['externalId'] = this.productIdGroup.controls.externalId.value;
     }


     this.inventoryService.getProductSearch(idRequest)
     .subscribe(result =>  { this.productSearchResult = JSON.stringify(result); console.log(result); });

   }


  ngOnInit() {
  }

}
