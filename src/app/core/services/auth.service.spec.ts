import { TestBed } from '@angular/core/testing'

import { HttpClientModule } from '@angular/common/http'
import { MessageService } from 'primeng/api'
import { AuthService } from './auth.service'

describe('authService', () => {
  let service: AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MessageService],
    })
    service = TestBed.inject(AuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
