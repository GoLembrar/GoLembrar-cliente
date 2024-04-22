import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { ChipModule } from 'primeng/chip'
import { AddContactService } from '../../services/add-contact/add-contact.service'

@Component({
  selector: 'gl-my-contacts',
  standalone: true,
  imports: [CommonModule, RouterModule, ChipModule, ButtonModule],
  templateUrl: './my-contacts.component.html',
  styleUrl: './my-contacts.component.scss',
})
export class MyContactsComponent implements OnInit {
  constructor(private contact: AddContactService) {}

  myContacts: any = []

  ngOnInit(): void {
    this.contact.getContacts().subscribe({
      next: value => (this.myContacts = value),
      error: err => console.log(err),
    })
  }
}
