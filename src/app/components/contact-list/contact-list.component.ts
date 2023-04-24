import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts?: Contact[];
  currentContact: Contact = {};
  currentIndex = -1;
  name = '';

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.retrieveContacts();
  }

  retrieveContacts(): void {
    this.contactService.getAll()
      .subscribe({
        next: (data) => {
          this.contacts = data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveContacts();
    this.currentContact = {};
    this.currentIndex = -1;
  }

  setActiveContact(contact: Contact, index: number): void {
    this.currentContact = contact;
    this.currentIndex = index;
  }

  searchContact(): void {
    this.currentContact = {};
    this.currentIndex = -1;

    this.contactService.findByNameOrCodename(this.name)
      .subscribe({
        next: (data) => {
          this.contacts = data;
        },
        error: (e) => console.error(e)
      });
  }

}
