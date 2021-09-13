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

function removeContactActiveClass() {
    if(document.querySelector('.contact-list .list-group .active'))
    document.querySelector('.contact-list .list-group .active').classList.remove('active');
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

export { contacts, contactTemplate, contactDetailTemplate, removeContactActiveClass, displayContact, displayContactDetail, 
    contactLists, contactDetail, contactModal, homeNav, addContactNav, addContactButton,updateContactButton, addContactForm  };