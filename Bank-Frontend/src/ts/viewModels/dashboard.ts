/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import * as AccUtils from "../accUtils";
import * as ko from "knockout";
import * as Bootstrap from "ojs/ojbootstrap";
import "oj-c/input-text";
import "oj-c/input-number";
import 'oj-c/input-password';
import "ojs/ojdatetimepicker";
import "ojs/ojknockout";
import "oj-c/form-layout";
import 'ojs/ojswitch';
import "oj-c/button";
import "oj-c/progress-bar";
import "ojs/ojtable";
import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";
import "my-component/loader";




class DashboardViewModel {
  value: ko.Observable<string>;
  firstName: ko.Observable<string> | ko.Observable<any>;
  salary: ko.Observable<number> | ko.Observable<any>;
  password: ko.Observable<string> | ko.Observable<any>;
  date: ko.Observable<string> | ko.Observable<any>;
  address: ko.Observable<string> | ko.Observable<any>;
  jsonId: ko.Observable<number> | ko.Observable<any>;
  email: ko.Observable<string> | ko.Observable<any>;
  username: ko.Observable<string> | ko.Observable<any>;
  
  
  isContrastBackground: ko.Observable<boolean>;
  constructor() {
    this.value = ko.observable("");
    this.jsonId = ko.observable(null);
    this.firstName = ko.observable(null);
    this.salary = ko.observable(null);
    this.password = ko.observable(null);
    this.date = ko.observable(IntlConverterUtils.dateToLocalIsoDateString(new Date()));
    this.isContrastBackground = ko.observable(false);
    this.address = ko.observable(null);
    this.email = ko.observable(null);
    this.username = ko.observable(null);
    // this.tableData = ko.observableArray([]);
    

    this.isContrastBackground.subscribe(function (newValue) {
      // div for legacy components
      let darkContainer = document.getElementById('dark-container');
      // div for corepack components
      // const corepackDarkContainer = document.getElementById('oj-c-dark-container');
      if (darkContainer != null) {
        if (newValue) {
          darkContainer.className = 'oj-panel oj-bg-neutral-170 oj-color-invert';
          // corepackDarkContainer.className =
            // 'oj-panel oj-bg-neutral-170 oj-color-invert oj-c-colorscheme-dependent';
        } else {
          darkContainer.className = 'oj-panel';
          // corepackDarkContainer.className = 'oj-panel';
        }
      }
    });

    // this.loadTableData();
  }

  // private async loadTableData(): Promise<void> {
  //   const URL = 'https://jsonplaceholder.typicode.com/users'; // Replace with your actual URL

  //   try {
  //     const response = await fetch(URL);
  //     const jsonData = await response.json();

  //     // Filter and map data to the format expected by the table
  //     const filteredData = jsonData.map((item: any) => ({
  //       Id: item.id,
  //       Name: item.name,
  //       Username: item.username,
  //       City: item.address.city
  //       // EmployeeCount: Math.floor(Math.random() * 100) // Example field, replace with actual logic if needed
  //     }));

  //     this.tableData(filteredData); // Update the observable array with filtered data
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }
// async ke bina await nahi chalta
  // handling the events when button is clicked
  public handleClick = async (event: Event) => {
    // identify the tag name
    let elementName = (event.currentTarget as HTMLElement).tagName;
    // send request to the REST API
    // alert("Your form has been submitted" 
    //   // + elementName
    //   );
    // alert ("Name: " + this.firstName() + "\nSalary: " + this.salary() + "\nPassword: " + this.password() + "\n Date: " + this.date());
      // alert ("Salary" + this.salary);
      // alert ("Password" + this.password);
      // let id = parseInt(this.firstName());
      let URL = "https://jsonplaceholder.typicode.com/users/"+ this.jsonId();
      let res = await fetch(URL);
      let jsonData = await res.json();
      this.firstName(jsonData.name);
      this.address(jsonData.address.street + ", " + jsonData.address.city);
      this.email(jsonData.email);
      this.username(jsonData.username);
  }

  public fieldProgress = (event: Event) => {
    let value = 0;
    value += (this.jsonId() != null) ? 12.5 : 0;
    value += (this.username() != null) ? 12.5 : 0;
    value += (this.firstName() != null) ? 12.5 : 0;
    value += (this.salary() != null) ? 12.5 : 0;
    value += (this.password() != null) ? 12.5 : 0;
    value += (this.address() != null) ? 12.5 : 0;
    value += (this.email() != null) ? 12.5 : 0;
    value += (this.date() != null) ? 12.5 : 0;
    return value;
  }
}

  

export = DashboardViewModel;
