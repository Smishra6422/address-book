import {contacts, removeContactActiveClass, displayContactDetail, displayContact,
        contactLists, contactDetail, contactModal, homeNav, addContactNav, 
        addContactButton, updateContactButton } from './contact-template.js';

// delete contact
function deleteContact(contactId) {
    let deletedContactIndex = contacts.findIndex(contact => contact.id == contactId);
    contacts.splice(deletedContactIndex, 1);

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