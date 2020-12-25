
// 1. Function for Validate the element 
function validation(input) {
    let isValidationPassed = true;
    let validateArrays = [];
    let requiredValidate;
    let specialValidate;
    let specialType;
    // Loop For Nodelist
    input.forEach(element => {
        specialType = element.getAttribute("data-isspecial-type");
        if (element.getAttribute("data-isrequired") === "true" && element.getAttribute("data-isspecial") === "false") {
            requiredValidate = isRequired(element);
            specialValidate = true;
        }
        else if (element.getAttribute("data-isrequired") === "false" && element.getAttribute("data-isspecial") === "true") {
            requiredValidate = true;
            specialValidate = isSpecial(element, specialType);
        }
        else if (element.getAttribute("data-isrequired") === "true" && element.getAttribute("data-isspecial") === "true") {
            requiredValidate = isRequired(element);
            specialValidate = isSpecial(element, specialType);
        }
        // If User Dont Want To Validate still can pass the function without Validate
        else {
            requiredValidate = true;
            specialValidate = true;
        }
        validateArrays = createObject(element, requiredValidate, specialValidate, validateArrays, specialType);
        let isValidationArray = addClass(validateArrays);
        isValidationPassed = isValidationArray.every(chkBoolean);
    });
    if (!isValidationPassed) {
        document.getElementById("spanText").style.display = "block";
    }
    return isValidationPassed;
}

function isRequired(input) {
    let isValid = false;
    if (input.value.trim() !== "") {
        isValid = true;
    }
    return isValid;
}

function isSpecial(input, specialType) {
    let isValid = true;
    switch (specialType) {
        case "email":
            let emailId = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
            if (input.value.match(emailId)) {
                isValid = true;
            }
            else {
                isValid = false;
            }
            break;
        case "telephone":
            if (input.value.length !== 10) {
                isValid = false;
            }
            break;
        case "date":
            if (input.value === "") {
                isValid = false;
            }
            break;
        case "checkbox":
            if (input.checked) {
                isValid = true;
            }
            else {
                isValid = false;
            }
            break;
        case "select":
            if (input.value === "") {
                isValid = false;
            }
            break;
    }
    return isValid;
}
function createObject(input, require, special, array, specialType) {
    let object = {};
    object.element = input;
    object.isrequire = require;
    object.isspecial = special;
    object.specialType = specialType;
    array.push(object);
    return array;
}
function addClass(array) {
    let isValid = true;
    let arrayValid = [];
    array.forEach(elem => {
        console.log(array);
        if (!elem.isrequire || !elem.isspecial) {
            elem.element.classList.remove("validateGreenBorder");
            elem.element.classList.add("validateRedBorder");
            isValid = false;
        }
        else {
            elem.element.classList.remove("validateRedBorder");
            elem.element.classList.add("validateGreenBorder");
            isValid = true;
        }
        arrayValid.push(isValid);
    });
    return arrayValid;
}
function chkBoolean(elem) {
    return elem === true;
}