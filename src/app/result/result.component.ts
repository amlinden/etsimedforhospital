import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk';  
import {CdkTableModule} from '@angular/cdk';  
import {MdTableModule} from '@angular/material';
import { TranslateService } from '../translate.service';
//to use sex and age
import {AgesexComponent} from '../agesex/agesex.component';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

//import {AgesexComponent} from '../agesex;

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit {
  displayedColumns = ['diseaseId', 'userName', 'probability'];
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;
  //selectedSex = AgesexComponent.selectedSex;
  
  //selected diseases are stored in selectedvalue
  selectedValue = [];
  diseases = [
    {diseasetype:'Abdominal distention'}, 
    {diseasetype:'Abdominal pain'}, 
    {diseasetype:'Abnormal appearing skin'}, 
    {diseasetype:'Abnormal appetite'}, 
    {diseasetype:'Fever'}
  ];  
  
  change(e, type){
    console.log(e.checked);
    console.log(type);
    
    if(e.checked){
      //puch only type to get the whole object (now only the name of disease)
      this.selectedValue.push(type.diseasetype);
    }
    else{
     let updateItem = this.selectedValue.find(this.findIndexToUpdate, type.diseasetype);
     let index = this.selectedValue.indexOf(updateItem);
     this.selectedValue.splice(index, 1);
    }
  }
  findIndexToUpdate(type) { 
        return type.diseasetype === this;
    }


  constructor(){
  }
  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase);
  }
}
const NAMES = ['Abdominal distention', 'Abdominal pain', 'Abnormal appearing skin', 'Abnormal appetite', 'Fever'];
// selected diseases

export interface DiseaseData {
  id: string;
  name: string;
  probability: string;
  // color: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<DiseaseData[]> = new BehaviorSubject<DiseaseData[]>([]);
  get data(): DiseaseData[] { return this.dataChange.value; }

  constructor() {
    // Fill up the database with max 4.
    for (let i = 0; i < 5; i++) { this.addDisease(); }
  }

  /** Adds a new user to the database. */
  addDisease() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewDisease());
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new Disease. */
  private createNewDisease() {
    const name =
        NAMES[Math.round(Math.random() * (NAMES.length - 1))];

    return {
      id: (this.data.length + 1).toString(),
      name: name,
      //random probability
      probability: Math.round(Math.random() * 100).toString()
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: ExampleDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<DiseaseData[]> {
    return this._exampleDatabase.dataChange;
  }

  disconnect() {}
}