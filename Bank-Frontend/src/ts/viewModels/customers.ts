/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
// import * as AccUtils from "../accUtils";
import * as AccUtils from "../accUtils";
import * as ko from "knockout";
import "ojs/ojtable";
import "ojs/ojknockout";
import "oj-c/input-text";
import "oj-c/input-number";
import 'oj-c/input-password';
import "ojs/ojdatetimepicker";
import "ojs/ojknockout";
import "oj-c/button";
import "oj-c/form-layout";
import { RESTDataProvider } from 'ojs/ojrestdataprovider';

type D = { "id": number, "name": string, "salary": number };
type K = D['id'];





class CustomersViewModel {

  id: ko.Observable<number> | ko.Observable<any>;
  name: ko.Observable<string> | ko.Observable<any>;
  salary: ko.Observable<number> | ko.Observable<any>;
  // password: ko.Observable<string> | ko.Observable<any>;
  // date: ko.Observable<string> | ko.Observable<any>;
  // address: ko.Observable<string> | ko.Observable<any>;
  // jsonId: ko.Observable<number> | ko.Observable<any>;
  // email: ko.Observable<string> | ko.Observable<any>;
  // username: ko.Observable<string> | ko.Observable<any>;
  dataprovider: RESTDataProvider<K, D> | undefined;
  restServerUrl: string = "http://localhost:8888/employees";
  constructor() {

    // this.id = ko.observable("");
    this.id = ko.observable(null);
    this.name = ko.observable(null);
    this.salary = ko.observable(null);


    this.dataprovider = new RESTDataProvider({
      keyAttributes: 'id',
      url: 'http://localhost:8888/employees',
      transforms: {
        fetchFirst: {
          request: async (options) => {
            const url = new URL(options.url);
            return new Request(url.href);
          },
          response: async ({ body }) => {
            let data = body;
            return { data };
          }
        }
      }


    })

  };


  addRow = async () => {
    // Create row object based on form inputs
    const row = {
      id: this.id(),
      name: this.name(),
      salary: this.salary()
      // ManagerId: this.inputManagerId(),
    };
    // Create and send request to REST service to add row
    const request = new Request(this.restServerUrl, {
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
      }),
      body: JSON.stringify(row),
      method: "POST",
    });
    const response = await fetch(request);
    const addedRow = await response.json();


    alert("Employee has been added");

    /**
     * Optional ViewModel method invoked after the View is inserted into the
     * document DOM.  The application can put logic that requires the DOM being
     * attached here.
     * This method might be called multiple times - after the View is created
     * and inserted into the DOM and after the View is reconnected
     * after being disconnected.
     */
    // connected(): void {
    //   AccUtils.announce("Customers page loaded.");
    //   document.title = "Customers";
    //   // implement further logic if needed
    // }

    /**
     * Optional ViewModel method invoked after the View is disconnected from the DOM.
     */
    // disconnected(): void {
    //   // implement if needed
    // }

    /**
     * Optional ViewModel method invoked after transition to the new View is complete.
     * That includes any possible animation between the old and the new View.
     */
    // transitionCompleted(): void {
    //   // implement if needed
    // }
  }
}

export = CustomersViewModel;
