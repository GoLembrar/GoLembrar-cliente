import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RemindersComponent } from './reminders.component'

describe('RemindersComponent', () => {
  let component: RemindersComponent
  let fixture: ComponentFixture<RemindersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemindersComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RemindersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
