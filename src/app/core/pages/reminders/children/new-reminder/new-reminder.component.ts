import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms'

import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { MultiSelectModule } from 'primeng/multiselect'
import { TagModule } from 'primeng/tag'

import { BackButtonComponent } from 'src/app/core/components/back-button/back-button.component'
import { TitleComponent } from 'src/app/core/components/title/title.component'
import { Contact } from 'src/app/core/models/contact'
import { Platform } from 'src/app/core/models/enums/plataform'
import { AuthService } from 'src/app/core/services/auth.service'
import { ContactService } from 'src/app/core/services/contact/contact.service'
import { ReminderService } from 'src/app/core/services/reminder/reminder.service'

@Component({
  standalone: true,
  selector: 'gl-new-reminder',
  templateUrl: './new-reminder.component.html',
  styleUrl: './new-reminder.component.scss',
  imports: [
    CommonModule,
    TitleComponent,
    BackButtonComponent,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    MultiSelectModule,
    CalendarModule,
    ReactiveFormsModule,
    TagModule,
  ],
})
export class NewReminderComponent implements OnInit {
  ownerId = this.authService.getJwtPayload().id

  contacts: Contact[] = []

  constructor(
    private reminderService: ReminderService,
    private contactService: ContactService,
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe({
      next: contacts => {
        this.contacts = contacts
      },
    })
  }

  protected newReminder = this.formBuilder.group({
    title: ['', [V.required, V.min(3)]],
    description: ['', [V.required, V.min(3)]],
    platform: [Platform.EMAIL, V.required],
    usersToReminder: [[], [V.required, V.minLength(1)]],
    scheduled: [new Date(), V.required],
    ownerId: [this.ownerId, V.required],
    categoryId: [1, V.required],
  })

  onSubmit() {
    // console.log(this.newReminder.value)
    console.log(this.contacts)
  }
}
