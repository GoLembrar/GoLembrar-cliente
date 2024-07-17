import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { MultiSelectModule } from 'primeng/multiselect'
import { TagModule } from 'primeng/tag'
import { switchMap } from 'rxjs'
import { BackButtonComponent } from 'src/app/core/components/back-button/back-button.component'
import { TitleComponent } from 'src/app/core/components/title/title.component'
import { AuthService } from 'src/app/core/services/auth.service'
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
  private authService = inject(AuthService)
  private contactService = inject(ContactService)
  private formBuilder = inject(NonNullableFormBuilder)
  private reminderService = inject(ReminderService)
  private id = Number(this.route.snapshot.paramMap.get('id') || '')
  public reminder$ = this.reminderService.findOne(this.id).result$

  ownerId = this.authService.getJwtPayload().id
  contacts = this.contactService.getContacts()
  loading = false
  readonly minDate = new Date(new Date().getTime() + 30 * 60000)

  protected editReminder = this.formBuilder.group({
    title: ['', [V.required, V.min(2), V.max(20)]],
    description: ['', [V.required, V.min(2), V.max(450)]],
    usersToReminder: [[''], [V.required, V.minLength(1)]],
    scheduled: [new Date(), V.required],
    ownerId: [this.ownerId, V.required],
    categoryId: [1, V.required],
  })

  ngOnInit() {
    this.reminder$
      .pipe(
        switchMap(result => {
          if (result && result.data)
            this.editReminder.patchValue({
              title: result.data.title,
              description: result.data.description,
              scheduled: new Date(result.data.scheduled),
              usersToReminder: result.data.usersToReminder.map(
                contact => contact.id
              ),
            })

          return []
        })
      )
      .subscribe()
  }
}
