import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, convertToParamMap } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { of } from 'rxjs'
import { ContactsComponent } from './contacts.component'

describe('ContactsComponent', () => {
  let component: ContactsComponent
  let fixture: ComponentFixture<ContactsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsComponent, HttpClientModule],
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

    fixture = TestBed.createComponent(ContactsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
