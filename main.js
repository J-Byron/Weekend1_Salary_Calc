class Employee {
    constructor(firstName, lastname, identifier, title, annualSalary) {

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
        </tr>`);
    } // Ends Constructor

    addToDom() {
        // Adds employee to 
        $(`#tableBody`).append(this._$row);

        //updates Salary ++
        let currentMonthlyTotal = parseFloat($(`#salaryTh`).text());
        $(`#salaryTh`).text(`${(currentMonthlyTotal + (this._annualSalary/12)).toFixed(2)}`);

        // Connects button query
        const $deleteButton = $(`#${this._identifier}Button`);

        // create an in instance reference to be used inside event handler
        const self = this;

        // remove button 
        $deleteButton.on(`click`, function () {
            $(self._$row).remove();

            //update salary --
            currentMonthlyTotal = parseFloat($(`#salaryTh`).text()); // grab current monthly
            $(`#salaryTh`).text(`${(currentMonthlyTotal - (self._annualSalary / 12)).toFixed(2)}`); // update salary on dom
            currentMonthlyTotal = parseFloat($(`#salaryTh`).text()); // grab updated salary

            // Change color if < 20000
            if (currentMonthlyTotal < 20000) {
                $(`#monthlySalaryHead`).css(`background-color`, `forestgreen`);
            }
        }); // Ends deleteButton on click
    } // Ends addToDom
} // Ends Employee

$(document).ready(function () {

    // Assigns input to variables (to be called later as $inputFields.lastNameIn.val() for example)
    const $inputFields = {
        firstNameIn: $(`#firstNameIn`),
        lastNameIn: $(`#lastNameIn`),
        iDIn: $(`#iDIn`),
        titleIn: $(`#titleIn`),
        salaryIn: $(`#salaryIn`)
    };

    // Assigns button queries
    const $submitButton = $(`#submitButton`);
    const $populateButton = $(`#populateButton`);

    // Handles Submit click
    $submitButton.on(`click`, function () {

        // verifies no field empty 
        if (($inputFields.firstNameIn.val() == '') ||
            ($inputFields.lastNameIn.val() == '') ||
            ($inputFields.iDIn.val() == '') ||
            ($inputFields.titleIn.val() == '') ||
            ($inputFields.salaryIn.val() === '')) {
            alert(`missing field!`);
        } else {

            // Creates employee instance with fields
            let employee = new Employee($inputFields.firstNameIn.val(),
                $inputFields.lastNameIn.val(),
                $inputFields.iDIn.val(),
                $inputFields.titleIn.val(),
                $inputFields.salaryIn.val()
            );

            // adds employee to Dom
            employee.addToDom();

            // Queries for current Monthly salary and converts to float
            let currentMonthlyTotal = parseFloat($(`#salaryTh`).text());

            // Changes color if >20000
            if (currentMonthlyTotal > 20000) {
                $(`#monthlySalaryHead`).css(`background-color`, `red`);
            }
        }

        // clears input fields of each input
        for (let inputField in $inputFields) {
            $inputFields[inputField].val('');
        }
    }
    )// Ends $submitButton

    // For faster testing
    $populateButton.on(`click`,function() {
        // random people to populate fields
        const people = [
            {
            firstNameIn : "Bobby",
            lastNameIn:   "Tarintino",
            iDIn:         `${Math.floor(Math.random() * 100)}`,
            titleIn :     "Trapper",
            salaryIn :    (Math.random() * 100000).toFixed(2)
            },

            {
            firstNameIn : "Rick",
            lastNameIn:   "Sanchez",
            iDIn:         `${Math.floor(Math.random() * 100)}`,
            titleIn :     "Scientist",
            salaryIn :    0.00
            },

            {
            firstNameIn : "Phillip J.",
            lastNameIn:   "Fry",
            iDIn:         `${Math.floor(Math.random() * 100)}`,
            titleIn :     "Delivery Boy",
            salaryIn :    26549.00
            },

            {
            firstNameIn : "Jon",
            lastNameIn:   "Snow",
            iDIn:         `${Math.floor(Math.random() * 100)}`,
            titleIn :     "King In the North",
            salaryIn :    (Math.random() * 100000).toFixed(2)
            }
        ];
        
        // return random person from people
        let employeeModel = people[Math.floor(Math.random() * people.length)];

        // Populate fields
        $inputFields.firstNameIn.val(employeeModel.firstNameIn),
        $inputFields.lastNameIn.val(employeeModel.lastNameIn),
        $inputFields.iDIn.val(employeeModel.iDIn),
        $inputFields.titleIn.val(employeeModel.titleIn),
        $inputFields.salaryIn.val(employeeModel.salaryIn)
    });
}
) // Ends Docuument ready