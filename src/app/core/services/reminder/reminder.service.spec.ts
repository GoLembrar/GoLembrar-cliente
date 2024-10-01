import { TestBed } from '@angular/core/testing'

import { HttpClientModule } from '@angular/common/http'
import { ReminderService } from './reminder.service'

describe('ReminderService', () => {
  let service: ReminderService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
    service = TestBed.inject(ReminderService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
