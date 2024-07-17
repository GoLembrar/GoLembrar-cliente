import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { MultiSelectModule } from 'primeng/multiselect'
import { TagModule } from 'primeng/tag'
import { BackButtonComponent } from 'src/app/core/components/back-button/back-button.component'
import { TitleComponent } from 'src/app/core/components/title/title.component'
import { ReminderService } from 'src/app/core/services/reminder/reminder.service'

@Component({
  standalone: true,
  selector: 'gl-show-reminder',
  templateUrl: './show-reminder.component.html',
  styleUrl: './show-reminder.component.scss',
  imports: [
    CommonModule,
    BackButtonComponent,
    TitleComponent,
    ButtonModule,
    TagModule,
    InputTextareaModule,
    MultiSelectModule,
    InputTextModule,
    AvatarModule,
  ],
})
export class ShowReminderComponent {
  private route = inject(ActivatedRoute)
  private reminderService = inject(ReminderService)
  private id = Number(this.route.snapshot.paramMap.get('id') || 0)
  reminder = this.reminderService.findOne(this.id).result

  onEdit() {
    this.reminderService.edit(this.id)
  }
}
