import * as ko from "knockout";
import "oj-c/form-layout";
import "oj-c/input-text";
import "oj-c/input-number";
import 'oj-c/input-password';
import "oj-c/button";

class RegisterViewModel {

    firstName: ko.Observable<string> | ko.Observable<any>;
    lastName: ko.Observable<string> | ko.Observable<any>;
    gender: ko.Observable<string> | ko.Observable<any>;
    email: ko.Observable<string> | ko.Observable<any>;
    mobile: ko.Observable<number> | ko.Observable<any>;
    password: ko.Observable<string> | ko.Observable<any>;
    regServerUrl: string = "http://localhost:8080/bank/customers";

    constructor() {

        this.firstName = ko.observable(null);
        this.lastName = ko.observable(null);
        this.gender = ko.observable(null);
        this.email = ko.observable(null);
        this.mobile = ko.observable(null);
        this.password = ko.observable(null);
    }
    addRow = async () => {
        // Create row object based on form inputs
        const row = {
            firstName: this.firstName(),
            lastName: this.lastName(),
            gender: this.gender(),
            email: this.email(),
            mobile: this.mobile(),
            // password: this.password(),
            login: {
                password: this.password(),
                loginStatus: 'NEW'
            },
            customerStatus: 'NEW'
            //   salary: this.salary()
            // ManagerId: this.inputManagerId(),
        };
        // Create and send request to REST service to add row
        const request = new Request(this.regServerUrl, {
            headers: new Headers({
                "Content-type": "application/json; charset=UTF-8",
            }),
            body: JSON.stringify(row),
            method: "POST",
        });
        const response = await fetch(request);
        const addedRow = await response.json();
        console.log(addedRow);
        if(response.ok) {
            alert("Your account has been created!")
        }
        




        // alert("Employee has been added");
    }

}

export = RegisterViewModel;