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
import { Platform } from 'src/app/core/models/enums/plataform'
import { Reminder } from 'src/app/core/models/reminder'
import { ControlConfigMap } from 'src/app/core/models/types/control-config-map'
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
  contacts$ = this.contactService.getContacts()
  loading = false

  constructor(
    private reminderService: ReminderService,
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  protected newReminder = this.formBuilder.group<ControlConfigMap<Reminder>>({
    title: ['', [V.required, V.min(3)]],
    description: ['', [V.required, V.min(3)]],
    platform: [Platform.EMAIL, V.required],
    usersToReminder: [[], [V.required, V.minLength(1)]],
    scheduled: [new Date(), V.required],
    ownerId: [this.ownerId, V.required],
    categoryId: [1, V.required],
  })

  onSubmit() {
    this.loading = true
    this.reminderService.create(this.newReminder.value as Reminder).subscribe({
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
