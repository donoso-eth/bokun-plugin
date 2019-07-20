import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { InventoryService } from './services/inventory-service.service';
import { MatStepper } from '@angular/material/stepper';
import { PluginConfigurationParameter } from '../models/bokun-types';

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
  pluginFormGroup: FormGroup;
  pluginDefinitionGroup: FormGroup;
  loading: boolean;
  error: boolean;

  constructor(
    private inventoryService: InventoryService,
    private formBuilder: FormBuilder
    ) {

    this.pluginDefinitionGroup = this.formBuilder.group({
      scheme: ['https', Validators.required],
      host: ['madrid-day-spa.com', Validators.required],
      path: ['bokun', Validators.required],
      port: [''],
      username: ['bokun', Validators.required],
      password: ['sPamaDRidY#', Validators.required]
    });

    this.productSearchGroup = this.formBuilder.group({
      cityCtrl: [''],
      countryCtrl: [''],
      productNameCtrl: ['']
    });


    this.productIdGroup = this.formBuilder.group({
      externalId: [''],
    });

    this.pluginFormGroup = this.formBuilder.group({
        pluginDefinitionGroup: this.pluginDefinitionGroup,
        productSearchGroup : this.productSearchGroup,
        productIdGroup: this.productIdGroup,
    });

    this.inventoryService.formData.subscribe(res => console.log(res));


    this.pluginFormGroup.valueChanges
    .subscribe( obj => this.inventoryService.formData.next(obj));


   }

   definitions(stepper: MatStepper) {
     this.error = false ;
     this.loading = true;
     this.inventoryService.getPluginDefinition().subscribe(x => {
      stepper.next();
      this.loading = false;
    }, error =>  {
      this.error = true ;
      this.loading = false;

      console.log(error); });

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


   searchProduct(stepper: MatStepper) {

      console.log(this.productSearchGroup.controls) ;
      // .forEach(x => {
      //   console.log(x);
      // });


    //   const parameters: Array<PluginConfigurationParameter> = [
    //   {
    //     name: string;
    //     type: PluginParameterDataType;
    //     required: boolean;
    //   }
    // ];
      const searchRequest = {};
      if (this.productSearchGroup.controls.cityCtrl.value !== '') {
      // tslint:disable-next-line:no-string-literal
      searchRequest['externalId'] = this.productSearchGroup.controls.cityCtrl.value;
     }
      if (this.productSearchGroup.controls.countryCtrl.value !== '') {
      // tslint:disable-next-line:no-string-literal
      searchRequest['country'] = this.productSearchGroup.controls.countryCtrl.value;
     }
      if (this.productSearchGroup.controls.productNameCtrl.value !== '') {
      // tslint:disable-next-line:no-string-literal
      searchRequest['productName'] = this.productSearchGroup.controls.productNameCtrl.value;
     }


      this.inventoryService.getProductSearch(searchRequest)
     .subscribe(result =>  { this.productSearchResult = JSON.stringify(result); console.log(result); });

   }


  ngOnInit() {
  }

}
