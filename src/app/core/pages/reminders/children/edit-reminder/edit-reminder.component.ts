import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { MultiSelectModule } from 'primeng/multiselect'
import { TagModule } from 'primeng/tag'
import { switchMap } from 'rxjs'
import { BackButtonComponent } from 'src/app/core/components/back-button/back-button.component'
import { TitleComponent } from 'src/app/core/components/title/title.component'
import { UpdateReminder } from 'src/app/core/models/reminder'
import { ContactService } from 'src/app/core/services/contact/contact.service'
import { ReminderService } from 'src/app/core/services/reminder/reminder.service'

@Component({
  standalone: true,
  selector: 'gl-edit-reminder',
  templateUrl: './edit-reminder.component.html',
  styleUrl: './edit-reminder.component.scss',
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
export class EditReminderComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private contactService = inject(ContactService)
  private formBuilder = inject(FormBuilder)
  private reminderService = inject(ReminderService)
  private messageService = inject(MessageService)
  private id = this.route.snapshot.paramMap.get('id') || ''
  public reminder$ = this.reminderService.findOne(this.id).result$

  public readonly contacts = this.contactService.getContacts()
  public loading = false
  public readonly minDate = new Date(new Date().getTime() + 30 * 60000)

  protected editReminder = this.formBuilder.group({
    title: ['', [V.required, V.minLength(2), V.maxLength(120)]],
    description: ['', [V.required, V.minLength(2), V.maxLength(500)]],
    usersToReminder: [<string[]>[], [V.required, V.minLength(1)]],
    scheduled: [new Date(), V.required],
  })

  ngOnInit() {
    this.reminder$
      .pipe(
        switchMap(result => {
          if (result && result.data) {
            const contacts = result.data.usersToReminder.map(
              userToReminder => userToReminder.contactId
            )
            this.editReminder.patchValue({
              title: result.data.title,
              description: result.data.description,
              scheduled: new Date(result.data.scheduled),
              usersToReminder: contacts,
            })
          }
          return []
        })
      )
      .subscribe()
  }

  onSubmit() {
    if (this.editReminder.valid) {
      this.loading = true

      this.reminderService
        .update(this.editReminder.value as UpdateReminder, this.id)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Feito',
              detail: 'Lembrete editado',
            })
            this.loading = false
            this.router.navigateByUrl('/')
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao editar contato',
            })
            this.loading = false
          },
        })
    }
  }
}
