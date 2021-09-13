import {contacts, contactTemplate, removeContactActiveClass, displayContact, displayContactDetail,
        contactLists, contactModal, homeNav, addContactNav, addContactButton, 
        updateContactButton, addContactForm } from './contact-template.js';
import {isFormValid} from './contact-form-validation.js';


function closeContactModal() {
    homeNav.classList.add('active');
    addContactNav.classList.remove('active');
    contactModal.classList.add('d-none');
    addContactForm.reset();
    addContactButton.classList.remove('d-none');
    updateContactButton.classList.add('d-none');

    document.querySelectorAll('.invalid-feedback').forEach(invalidField => invalidField.innerText = "");
}

function addContact(contact) {
    const fragment = document.createRange().createContextualFragment( contactTemplate({...contact}) );
    contactLists.prepend(fragment); // append the new contact to first position
}

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

export {removeContactActiveClass, displayContactDetail, displayContact};