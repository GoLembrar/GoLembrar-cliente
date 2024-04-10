import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MyContactsComponent } from './my-contacts.component'

describe('MyContactsComponent', () => {
  let component: MyContactsComponent
  let fixture: ComponentFixture<MyContactsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyContactsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(MyContactsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
