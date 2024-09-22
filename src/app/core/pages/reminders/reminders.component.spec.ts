import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, convertToParamMap } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { of } from 'rxjs'
import { RemindersComponent } from './reminders.component'

describe('RemindersComponent', () => {
  let component: RemindersComponent
  let fixture: ComponentFixture<RemindersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemindersComponent, HttpClientModule],
      providers: [
        ConfirmationService,
        MessageService,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({})),
            queryParamMap: of(convertToParamMap({})),
          },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(RemindersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
