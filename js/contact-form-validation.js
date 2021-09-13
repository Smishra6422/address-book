import {contacts} from './contact-template.js';

let phoneRegex = /^[9876]\d{9}$/;
let emailRegex = /(^([a-zA-Z0-9_.](?!\.\.))+@[a-zA-Z0-9-]{2,30}[.][a-zA-Z0-9.]{2,5}$)/i;

let invalidMessagesList = {
    "email": "Email is invalid",
    "mobile": "Mobile no is invalid",
    "landline": "Landline no is invalid",
};

let requiredMessagesList = {
    "name": "Name is required",
    "email": "Email is required",
    "mobile": "Mobile no is required",
    "landline": "Landline no is required",
};

//to check existing email
function isEmailExists(email, contactId, contacts) {
    return !!contacts.find(contact => contact.email.toLowerCase() == email.toLowerCase() && contact.id != contactId);
}

function validateRequiredField(requiredField, errorTag) {
    if (requiredField.value == "") {
        errorTag.innerText = requiredMessagesList[requiredField.id];
        return false;
    } else {
        errorTag.innerText = "";
        return true;
    }
}

function validateRegexPattern(field, errorTag, regex) {
    let userInput = field.value;
    if (regex.test(userInput)) {
        errorTag.innerText = "";
        return true;
    } else if (userInput == "") {
        errorTag.innerText = requiredMessagesList[field.id];
        return false;
    } else {
        errorTag.innerText = invalidMessagesList[field.id];
        return false;
    }
}

function isFormValid(contactId = null) {
    let result = true;
    result = validateRequiredField(document.querySelector('#name'), document.querySelector('#name-error')) & result;
    result = validateRegexPattern(document.querySelector('#email'), document.querySelector('#email-error'), emailRegex) & result;
    result = validateRegexPattern(document.querySelector('#mobile'), document.querySelector('#mobile-error'), phoneRegex) & result;
    result = validateRegexPattern(document.querySelector('#landline'), document.querySelector('#landline-error'), phoneRegex) & result;
    if(isEmailExists(document.querySelector('#email').value, contactId, contacts)) {
        document.querySelector('#email-error').innerText = "Email already Exists";
        result = 0;
    }

    return result;
}

//form validation

document.querySelector('#name').addEventListener('keyup', function() {
    validateRequiredField(this, document.querySelector('#name-error'));
})

document.querySelector('#email').addEventListener('keyup', function() {
    validateRegexPattern(this, document.querySelector('#email-error'), emailRegex);
})

document.querySelector('#mobile').addEventListener('keyup', function() {
    validateRegexPattern(this, document.querySelector('#mobile-error'), phoneRegex);
})

document.querySelector('#landline').addEventListener('keyup', function() {
    validateRegexPattern(this, document.querySelector('#landline-error'), phoneRegex);
})



export { isFormValid };