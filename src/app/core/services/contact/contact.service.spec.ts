import { TestBed } from '@angular/core/testing'

import { HttpClientModule } from '@angular/common/http'
import { ContactService } from './contact.service'

describe('ContactService', () => {
  let service: ContactService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
    service = TestBed.inject(ContactService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
