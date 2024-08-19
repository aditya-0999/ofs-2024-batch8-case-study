import * as AccUtils from "../accUtils";
import * as ko from "knockout";
import 'oj-c/form-layout';
import "oj-c/input-text";
import "ojs/ojswitch";
import 'oj-c/input-password';
import "oj-c/button";

class DetailsViewModel {
    customerId = ko.observable<number | null>(null);
    firstName = ko.observable<string | null>(null);
    lastName = ko.observable<string | null>(null);
    // age = ko.observable<number | null>(null);
    gender = ko.observable<string | null>(null);
    mobile = ko.observable<number | null>(null);
    email = ko.observable<string | null>(null);
    // address = ko.observable<string | null>(null);
    // pan = ko.observable<string | null>(null);
    // aadhar = ko.observable<number | null>(null);
    // Define observables for login details
    loginId = ko.observable<string | null>(null);
    password = ko.observable<string | null>(null);
    loginStatus = ko.observable<string | null>(null);
    loginAttempts = ko.observable<number | null>(null);

    updateSwitch = ko.observable<boolean>(false);

    // loginTime = ko.observable<string | null>(null);
    restServerUrl: string = "http://localhost:8080/bank/getCustomer";
    constructor() {
        // Automatically fetch customer details when the ViewModel is initialized
        this.fetchCustomerDetails();
        // this.updateSwitch(false);
    }
    async fetchCustomerDetails() {
        // Retrieve loginId and password from sessionStorage
        const loginId = sessionStorage.getItem("loginId");
        const password = sessionStorage.getItem("password");
        // Prepare the request payload
        const payload = {
            loginId: loginId,
            password: password
        };
        // Create and send POST request to the server
        const request = new Request(this.restServerUrl, {
            headers: new Headers({
                "Content-type": "application/json; charset=UTF-8",
            }),
            body: JSON.stringify(payload),
            method: "POST",
        });
        try {
            const response = await fetch(request);
            if (response.ok) {
                const data = await response.json();
                // Update observables with the response data
                this.customerId(data.customerId);
                this.firstName(data.firstName);
                this.lastName(data.lastName);
                // this.age(data.age);
                this.gender(data.gender);
                this.mobile(data.mobile);
                this.email(data.email);
                // this.address(data.address);
                // this.pan(data.pan);
                // this.aadhar(data.aadhar);
                // Update login details
                this.loginId(data.login.loginId);
                this.password(data.login.password);
                this.loginStatus(data.login.loginStatus);
                this.loginAttempts(data.login.loginAttempts);
                // this.loginTime(data.login.loginTime);
            } else {
                console.error("Failed to fetch customer details");
            }
        } catch (error) {
            console.error("An error occurred while fetching customer details:", error);
        }
    }

    updateCustomerDetails = async () => {
        // Create the payload based on current observable values
        const payload = {
            customerId: this.customerId(),
            firstName: this.firstName(),
            lastName: this.lastName(),
            // age: this.age(),
            gender: this.gender(),
            mobile: this.mobile(),
            email: this.email(),
            // address: this.address(),
            // pan: this.pan(),
            // aadhar: this.aadhar(),
            login: {
                loginId: this.loginId(),
                password: this.password(), // Assuming password can also be updated
                loginAttempts: this.loginAttempts(),
                loginStatus: this.loginStatus(),
                // loginTime: this.loginTime() // Assuming loginTime remains unchanged
            }
        };
        // Create and send request to REST service to update customer details
        const request = new Request("http://localhost:8080/bank/updatecustomerdetails", {
            headers: new Headers({
                "Content-type": "application/json; charset=UTF-8",
            }),
            body: JSON.stringify(payload),
            method: "PUT",
        });
        try {
            const response = await fetch(request);
            if (response.ok) {
                // If update is successful
                alert('Customer details updated successfully!');
            } else if (response.status === 400) {
                // Handle validation errors or bad request
                alert('Invalid input. Please check the provided details.');
            } else if (response.status === 404) {
                // Handle case where customer ID is not found
                alert('Customer ID not found. Please try again.');
            } else {
                // Handle other possible errors
                alert('Failed to update customer details. Please try again later.');
            }
        } catch (error) {
            // Handle network or other errors
            alert('An error occurred while processing your request. Please try again later.');
        }
    };
    connected(): void {
        AccUtils.announce("Customer details page loaded.");
        document.title = "Customer Details";
    }
    disconnected(): void {
        // implement if needed
    }
    transitionCompleted(): void {
        // implement if needed
    }
}
export =  DetailsViewModel;