import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentContact: Contact = {
    name: '',
    codename: '',
    contactPhone: '',
    published: false
  };

    message = '';

    constructor(
      private contactService: ContactService,
      private route: ActivatedRoute,
      private router: Router) { }

    ngOnInit(): void {
      if (!this.viewMode) {
        this.message = '';
        this.getContact(this.route.snapshot.params["id"]);
      }
    }

    getContact(id: string): void {
      this.contactService.get(id)
        .subscribe({
          next: (data) => {
            this.currentContact = data;
          },
          error: (e) => console.error(e)
        });
    }

    updatePublished(status: boolean): void {
      const data = {
        name: this.currentContact.name,
        codename: this.currentContact.codename,
        contactPhone: this.currentContact.contactPhone,
        published: status
      };

      this.message = '';

      this.contactService.update(this.currentContact.id, data)
        .subscribe({
          next: (res) => {
            this.currentContact.published = status;
            this.message = res.message ? res.message : 'The status was updated successfully!';
          },
          error: (e) => console.error(e)
        });
    }

    updateContact(): void {
      this.message = '';

      this.contactService.update(this.currentContact.id, this.currentContact)
        .subscribe({
          next: (res) => {
            this.message = res.message ? res.message : 'This contact was updated successfully!';
          },
          error: (e) => console.error(e)
        });
    }


}
