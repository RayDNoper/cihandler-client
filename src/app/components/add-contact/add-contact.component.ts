import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model'
import { ContactService } from 'src/app/services/contact.service'

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  contact: Contact = {
    name: '',
    codename: '',
    contactPhone: ''
  };
  submitted = false;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void { }

  saveContact(): void {
    const data = {
      name: this.contact.name,
      codename: this.contact.codename,
      contactPhone: this.contact.contactPhone,
      published: false
    };

    this.contactService.create(data)
          .subscribe({
            next: (res) => {
              this.submitted = true;
            },
            error: (e) => console.error(e)
          });
  }

  newContact(): void {
    this.submitted = false;
    this.contact = {
      name: '',
      codename: '',
      contactPhone: '',
      published: false
    };
  }
}
