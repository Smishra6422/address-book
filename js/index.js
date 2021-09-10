let contacts = [];

let contactLists = document.querySelector('.contact-list .list-group');
let contactDetail = document.querySelector('.contact-detail');
let contactModal = document.querySelector('.modal');
let homeNav = document.querySelector('.home-nav-link');
let addContactNav = document.querySelector('.add-contact-modal');
let addContactButton = document.querySelector('.add-contact');
let updateContactButton = document.querySelector('.update-contact');
let addContactForm = document.querySelector('.add-contact-form');

function contactTemplate(contact) {
    return `<li class="list-group-item" data-id="${contact.id}">
                <h2 class="text-capitalize mb-8" >${contact.name}</h2>
                <small class="d-block font-weight-bold">${contact.email}</small>
                <small class="font-weight-bold">+91 ${contact.mobile}</small>
            </li>`;
}

function contactDetailTemplate(contact) {
    return `<div class="d-flex">
                <div class="max-w-350 mr-60">
                <h1 class="mb-16">${contact.name}</h1>
                <div class="d-flex mb-16">
                    <p class="mr-4">Email: </p>
                    <p>${contact.email}</p>
                </div>
                <div class="mb-16">
                    <div class="d-flex">
                        <p class="mr-4">Mobile: +91 </p>
                        <p>${contact.mobile}</p>
                    </div>
                    <div class="d-flex">
                        <p class="mr-4">Landline: </p>
                        <p>${contact.landline}</p>
                    </div>
                </div>
                <div class="d-flex mb-16">
                    <p class="mr-4">Website: </p>
                    <p>${contact.website}</p>
                </div>
                <div class="d-flex mb-16">
                    <p class="mr-4">Address: </p>
                    <pre class="contact-address">${contact.address}</pre>
                </div>
            </div>
            <div class="d-flex align-items-baseline">
                <div id="edit-contact" data-id="${contact.id}" class="d-flex align-items-center cursor-pointer mr-40">
                    <i class="fas fa-pencil-alt mr-8"></i>
                    <span class="font-weight-semi-bold">Edit</span>
                </div>
                <div id="delete-contact" data-id="${contact.id}" class="d-flex align-items-center cursor-pointer">
                    <i class="fas fa-trash-alt mr-8"></i>
                    <span class="font-weight-semi-bold">Delete</span>
                </div>
            </div>
            </div>`;
}

//close the modal
function closeContactModal() {
    homeNav.classList.add('active');
    addContactNav.classList.remove('active');
    contactModal.classList.add('d-none');
    addContactForm.reset();
    addContactButton.classList.remove('d-none');
    updateContactButton.classList.add('d-none');

    document.querySelectorAll('.invalid-feedback').forEach(invalidField => invalidField.innerText = "");
}

function removeContactActiveClass() {
    if(document.querySelector('.contact-list .list-group .active'))
    document.querySelector('.contact-list .list-group .active').classList.remove('active');
}

function addContact(contact) {
    const fragment = document.createRange().createContextualFragment( contactTemplate({...contact}) );
    contactLists.prepend(fragment); // append the new contact to first position
}

function displayContact(contact) {
    contacts.forEach(contact => {
        const fragment = document.createRange().createContextualFragment( contactTemplate({...contact}) );
        contactLists.appendChild(fragment);
   });
}

function displayContactDetail(contact) {
    if(contact) {
        contactDetail.innerHTML = (contactDetailTemplate({...contact}));
    }    
}

// delete contact
function deleteContact(contactId) {
    let deletedContactIndex;
    contacts = contacts.filter((contact, index) => {
        if(contact.id != contactId) {
            return true;
        } else {
            deletedContactIndex = index
        }
    });

    while (contactLists.firstChild) {
        contactLists.removeChild(contactLists.firstChild);
    }

    if(contacts.length) {
        displayContact(contacts);
        if(deletedContactIndex == 0) { // if first element delted then make first element active
            displayContactDetail(contacts[deletedContactIndex]);
            document.querySelectorAll('.contact-list .list-group .list-group-item')[deletedContactIndex].classList.add('active');
        } else {
            displayContactDetail(contacts[deletedContactIndex - 1]);
            document.querySelectorAll('.contact-list .list-group .list-group-item')[deletedContactIndex - 1].classList.add('active');
        }
    } else {
        contactDetail.removeChild(contactDetail.firstChild);
    }
}

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
function isEmailExists(email, contactId) {
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
    if(isEmailExists(document.querySelector('#email').value, contactId)) {
        document.querySelector('#email-error').innerText = "Email already Exists";
        result = 0;
    }

    return result;
}

// show contactDetail on clicking the contact
contactLists.addEventListener('click', (e)=> {
    removeContactActiveClass();
    let selectedContact = e.target.tagName == 'LI' ? e.target : e.target.parentNode;
    selectedContact.classList.add('active');
    let contact = contacts.find(contact => contact.id == selectedContact.dataset.id);
    displayContactDetail(contact);
})

// open the contact modal
addContactNav.addEventListener('click', function(e) {
    homeNav.classList.remove('active');
    addContactNav.classList.add('active');
    contactModal.classList.remove('d-none');
})

//close the modal on clicking the close icon
document.querySelector('.close-icon').addEventListener('click', function () {
    closeContactModal();
})

addContactButton.addEventListener('click', function(e) {
    if(isFormValid()) {
        let newContact  = {
            id: Math.random(),
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            mobile: document.querySelector('#mobile').value,
            landline: document.querySelector('#landline').value,
            website: document.querySelector('#website').value,
            address: document.querySelector('#address').value,
        }
    
        //add the new contact
        contacts.unshift(newContact);

        // update the contacts
        addContact(newContact);
        removeContactActiveClass();

        // make the newly added contact active
        document.querySelector('.contact-list .list-group .list-group-item').classList.add('active');
    
        // update the contact detail
        displayContactDetail(newContact);
        closeContactModal();
    }
})

// update contact
updateContactButton.addEventListener('click', function(e) {
    let contactId = document.querySelector('#contact-id').value;
    if(isFormValid(contactId)) {
        let newContact  = {
            id: contactId,
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            mobile: document.querySelector('#mobile').value,
            landline: document.querySelector('#landline').value,
            website: document.querySelector('#website').value,
            address: document.querySelector('#address').value,
        }

        // remove contact from dom
        while (contactLists.firstChild) {
            contactLists.removeChild(contactLists.firstChild);
        }

        //add the new contact
        let contactIndex = contacts.findIndex(contact => contact.id == contactId);
        contacts[contactIndex] = {...newContact};

        // update the contacts
        displayContact(contacts);
        document.querySelectorAll('.contact-list .list-group .list-group-item')[contactIndex].classList.add('active');

        // update the contact detail
        displayContactDetail(newContact);
        closeContactModal();
    }
})

document.querySelector('.contact-detail').addEventListener('click', function(e) {
    let selectedContact = (e.target.id == 'delete-contact' || e.target.id == 'edit-contact' ) ? e.target : (e.target.parentNode.id == 'delete-contact' || e.target.parentNode.id == 'edit-contact' ) ? e.target.parentNode : "";
    if(selectedContact && selectedContact.id == 'delete-contact') {
        deleteContact(selectedContact.dataset.id);
    } else if(selectedContact && selectedContact.id == 'edit-contact') {
        let contactToEdit = contacts.find(contact => contact.id == selectedContact.dataset.id)
        document.querySelector('#name').value = contactToEdit.name;
        document.querySelector('#email').value = contactToEdit.email;
        document.querySelector('#mobile').value = contactToEdit.mobile;
        document.querySelector('#landline').value = contactToEdit.landline;
        document.querySelector('#website').value = contactToEdit.website;
        document.querySelector('#address').value = contactToEdit.address;
        document.querySelector('#contact-id').value = contactToEdit.id;

        updateContactButton.classList.remove('d-none');
        addContactButton.classList.add('d-none');

        homeNav.classList.remove('active');
        addContactNav.classList.add('active');
        contactModal.classList.remove('d-none');
    }
})

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