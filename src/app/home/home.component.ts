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
  productSearchResult: Array<any>;

  constructor(
    private inventoryService: InventoryService,
    private formBuilder: FormBuilder
    ) {
    this.productSearchGroup = this.formBuilder.group({
      cityCtrl: [''],
      countryCtrl: ['', ],
      productNameCtrl: ['']
    });
   }



   searchProduct() {
     const searchRequest = {};
     if (this.productSearchGroup.controls.cityCtrl.value !== undefined) {
      // tslint:disable-next-line:no-string-literal
      searchRequest['city'] = this.productSearchGroup.controls.cityCtrl.value;
     }
     if (this.productSearchGroup.controls.countryCtrl.value !== undefined) {
      // tslint:disable-next-line:no-string-literal
      searchRequest['country'] = this.productSearchGroup.controls.country.value;
     }
     if (this.productSearchGroup.controls.countryCtrl.value !== undefined) {
      // tslint:disable-next-line:no-string-literal
      searchRequest['productName'] = this.productSearchGroup.controls.productNameCtrl.value;
     }

     this.inventoryService.getProductSearch(searchRequest)
     .subscribe(result =>  { this.productSearchResult = result; console.log(result);});

   }


  ngOnInit() {
  }

}
