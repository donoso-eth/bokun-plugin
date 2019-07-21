import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { InventoryService } from './services/inventory-service.service';
import { MatStepper } from '@angular/material/stepper';
import { PluginConfigurationParameter, BasicProductInfo, ProductDescription } from '../models/bokun-types';
import { GuardsCheckEnd } from '@angular/router';
import { ValidationService } from './services/validation.service';
import { defs } from './services/definitions';
import { MatDatepicker } from '@angular/material/datepicker';

enum SearchStatus {
  Input,
  Sending,
  Received,
  Checking,
  Checked,
  Error
}


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
  getAvailableGroup: FormGroup;

  productsSearch: Array<BasicProductInfo>;
  productIDSearch: ProductDescription;

  error: boolean;
  loading: boolean;
  searchFlag: SearchStatus;
  searchIDFlag: SearchStatus;
  getAvailableFlag: SearchStatus;


  constructor(
    private inventoryService: InventoryService,
    private valifationService: ValidationService,
    private formBuilder: FormBuilder
  ) {
    this.searchFlag = SearchStatus.Input;
    this.searchIDFlag = SearchStatus.Input;
    this.getAvailableFlag = SearchStatus.Input;

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
    this.productSearchGroup.valueChanges
    .subscribe(() => this.searchFlag = SearchStatus.Input);


    this.productIdGroup = this.formBuilder.group({
      externalId: ['', Validators.required],
    });

    this.productIdGroup.valueChanges
      .subscribe(() => this.searchIDFlag = SearchStatus.Input);

    this.getAvailableGroup = this.formBuilder.group({
        prodIds: ['', Validators.required],
        startDate: [new Date(), Validators.required],
        endDate: [new Date(), Validators.required]
      });

    // tslint:disable-next-line:no-string-literal
    this.getAvailableGroup.controls['startDate'].valueChanges.subscribe(x => {
      this.endPicker.select(x);

    });

    this.pluginFormGroup = this.formBuilder.group({
      pluginDefinitionGroup: this.pluginDefinitionGroup,
      productSearchGroup: this.productSearchGroup,
      productIdGroup: this.productIdGroup,
      getAvailableGroup: this.getAvailableGroup
    });

    this.pluginFormGroup.valueChanges
      .subscribe(obj => this.inventoryService.formData.next(obj));


  }


  @ViewChild('startPicker', {static: true}) public startPicker: MatDatepicker<any>;
  @ViewChild('endPicker', {static: true}) public endPicker: MatDatepicker<any>;

  definitions(stepper: MatStepper) {
    this.error = false;
    this.loading = true;
    this.inventoryService.getPluginDefinition().subscribe(x => {
      stepper.next();
      this.loading = false;
    }, error => {
      this.error = true;
      this.loading = false;

      console.log(error);
    });

  }

  goNext(stepper: MatStepper) {
    stepper.next();
  }

  // Search PRODUCT
  searchProduct(stepper: MatStepper) {

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

    this.searchFlag = SearchStatus.Checking;
    this.productsSearch = [];

    this.inventoryService.getProductSearch(searchRequest)
      .subscribe(result => {
        this.productsSearch = result;

        this.searchFlag = SearchStatus.Received;
      }, error => {
        this.searchFlag = SearchStatus.Error;
      });

  }

  async searchProductValidate() {
    const isBodyValid = await this.valifationService
    .isRequestBodyValid(this.productsSearch, defs.definitions.SearchProductResponse, 'search');
    if (isBodyValid) {
      this.searchFlag = SearchStatus.Checked;
    } else {
      this.searchFlag = SearchStatus.Error;
    }
  }

// GET PRODUCT ID
  searchProductId(stepper: MatStepper) {
    const idRequest = {};
    if (this.productIdGroup.controls.externalId.value !== '') {
      // tslint:disable-next-line:no-string-literal
      idRequest['externalId'] = this.productIdGroup.controls.externalId.value;
    }
    this.searchIDFlag = SearchStatus.Sending;
    this.inventoryService.getProductById(idRequest)
      .subscribe(result => {
        this.productIDSearch = result;
        this.searchIDFlag = SearchStatus.Received;
      }, error => {
        this.searchIDFlag = SearchStatus.Error;
      });
  }

  async searchProductIDValidate() {
    const isBodyValid = await this.valifationService
    .isRequestBodyValid(this.productIDSearch, defs.definitions.ProductDescription, 'productid');
    console.log(isBodyValid);
    if (isBodyValid) {
      this.searchIDFlag = SearchStatus.Checked;
    } else {
      this.searchIDFlag = SearchStatus.Error;
    }
  }

// GET AVAILABLE
getAvailable(stepper: MatStepper) {
  const idRequest = {};
  if (this.productIdGroup.controls.externalId.value !== '') {
    // tslint:disable-next-line:no-string-literal
    idRequest['externalId'] = this.productIdGroup.controls.externalId.value;
  }
  this.searchIDFlag = SearchStatus.Sending;
  this.inventoryService.getProductById(idRequest)
    .subscribe(result => {
      this.productIDSearch = result;
      this.searchIDFlag = SearchStatus.Received;
    }, error => {
      this.searchIDFlag = SearchStatus.Error;
    });
}

async getAvailableValidate() {
  const isBodyValid = await this.valifationService
  .isRequestBodyValid(this.productIDSearch, defs.definitions.get, 'getAvailable');
  console.log(isBodyValid);
  if (isBodyValid) {
    this.searchIDFlag = SearchStatus.Checked;
  } else {
    this.searchIDFlag = SearchStatus.Error;
  }
}





  ngOnInit() {
  }

}
