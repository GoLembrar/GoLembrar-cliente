import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MessageService } from 'primeng/api'
import { NewReminderComponent } from './new-reminder.component'

describe('NewReminderComponent', () => {
  let component: NewReminderComponent
  let fixture: ComponentFixture<NewReminderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewReminderComponent, HttpClientModule],
      providers: [MessageService],
    }).compileComponents()

    fixture = TestBed.createComponent(NewReminderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
