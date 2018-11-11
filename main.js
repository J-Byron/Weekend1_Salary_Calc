/*
The application should have an input form that collects employee 
    first name
    last name
    ID number
    job title
    annual salary.

A 'Submit' button should collect the form information, 
store the information to calculate monthly costs, 
append information to the DOM and clear the input fields.
 Using the stored information, calculate monthly costs and 
 append this to the to DOM. If the total monthly cost exceeds 
 $20,000, add a red background color to the total monthly cost.

Create a delete button that removes an employee from the DOM. 
For Base mode, it does not need to remove that Employee's salary 
from the reported total.
*/

class Employee {
    constructor(firstName,lastname,identifier,title,annualSalary){

        // Employee properties
        this._firstName = firstName;
        this._lastName = lastname;
        this._identifier = identifier;
        this._title = title;
        this._annualSalary = annualSalary;

        // Employee as row in table
        this._$row = $(
       `<tr id= "${this._identifier}">
            <td>${this._firstName}</td>
            <td>${this._lastName}</td>
            <td>${this._identifier}</td>
            <td>${this._title}</td>
            <td>$ ${this._annualSalary}</td>
            <td>
                <button type="button" id= "${this._identifier}Button" class="btn btn-danger"></button>
            </td>
        </tr>
    `);
        
    }
}