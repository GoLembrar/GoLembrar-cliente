import { TestBed } from '@angular/core/testing'

import { NoConnectionService } from './no-connection.service'

describe('NoConnectionService', () => {
  let service: NoConnectionService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(NoConnectionService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
