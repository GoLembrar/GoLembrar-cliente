import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms'
import { MessageService } from 'primeng/api'

import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { MultiSelectModule } from 'primeng/multiselect'
import { TagModule } from 'primeng/tag'

import { BackButtonComponent } from 'src/app/core/components/back-button/back-button.component'
import { TitleComponent } from 'src/app/core/components/title/title.component'
import { Reminder } from 'src/app/core/models/reminder'
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
export class NewReminderComponent {
  ownerId = this.authService.getJwtPayload().id
  contacts = this.contactService.getContacts()
  loading = false
  readonly minDate = new Date(new Date().getTime() + 30 * 60000)

  protected newReminder = this.formBuilder.group({
    title: ['', [V.required, V.min(2), V.max(20)]],
    description: ['', [V.required, V.min(2), V.max(255)]],
    usersToReminder: [[], [V.required, V.minLength(1)]],
    scheduled: ['', V.required],
    ownerId: [this.ownerId, V.required],
    categoryId: [1, V.required],
  })

  constructor(
    private reminderService: ReminderService,
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  onSubmit() {
    if (this.newReminder.valid) {
      this.loading = true
      this.reminderService
        .create(this.newReminder.value as unknown as Reminder)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Lembrete foi cadastrado',
            })
            this.loading = false
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao cadastrar lembrete',
            })
            this.loading = false
          },
        })
    }
  }
}
