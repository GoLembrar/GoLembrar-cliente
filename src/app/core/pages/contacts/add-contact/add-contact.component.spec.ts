import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MessageService } from 'primeng/api'
import { AddContactComponent } from './add-contact.component'

describe('AddContactComponent', () => {
  let component: AddContactComponent
  let fixture: ComponentFixture<AddContactComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddContactComponent, HttpClientModule],
      providers: [MessageService],
    }).compileComponents()

    fixture = TestBed.createComponent(AddContactComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
