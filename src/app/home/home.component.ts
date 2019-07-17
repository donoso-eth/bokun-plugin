import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor( private formBuilder: FormBuilder) {
    this.productSearchGroup = this.formBuilder.group({
      cityCtrl: [""],
      countryCtrl: ["",],
      productNameCtrl: [""]
    });
   }

  ngOnInit() {
  }

}
