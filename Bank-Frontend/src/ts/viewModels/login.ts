import * as ko from "knockout";
import "oj-c/form-layout";
import "oj-c/input-text";
import "oj-c/input-number";
import 'oj-c/input-password';
import "oj-c/button";

class LoginViewModel {
    
    loginId: ko.Observable<number> | ko.Observable<any>;
    password: ko.Observable<string> | ko.Observable<any>;
    authServerUrl: string = "http://localhost:8080/bank/checklogin";

    constructor() {
        
        this.loginId = ko.observable(null);
        this.password = ko.observable(null);
    }
        addRow = async () => {
            // Create row object based on form inputs
            const row = {
              loginId: this.loginId(),
              password: this.password(),
            //   salary: this.salary()
              // ManagerId: this.inputManagerId(),
            };
            // Create and send request to REST service to add row
            const request = new Request(this.authServerUrl, {
              headers: new Headers({
                "Content-type": "application/json; charset=UTF-8",
              }),
              body: JSON.stringify(row),
              method: "POST",
            });
            const response = await fetch(request);
            const addedRow = await response.text();
            console.log(addedRow);
            // window.location.href
            try {
                // const addedRow = await response.json();
                if (response.ok) {
                  // If login is successful
                //   const addedRow = await response.json();
                  alert('Login successful!');
                  sessionStorage.setItem('loginId', this.loginId());
                  sessionStorage.setItem('password', this.password());
                  window.location.href = "/?ojr=customerDetails";
                } else if (response.status === 401) {
                  // If login fails (e.g., incorrect password)
                  alert('Incorrect login or password. Please try again.');
                } else if (response.status === 423) {
                    // If login fails (e.g., incorrect password)
                    alert('Account is Locked! Please contact admin.');
                  } 
                else {
                  // Handle other possible errors
                  alert('An unexpected error occurred. Please try again later.');
                }
              } catch (error) {
                // Handle network or other errors
                alert('An error occurred while processing your request. Please try again later.');
              }
            

            
        
            // alert("Employee has been added");
        }
          
}

export = LoginViewModel;