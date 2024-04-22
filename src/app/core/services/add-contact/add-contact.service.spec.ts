import { TestBed } from '@angular/core/testing';

import { AddContactService } from './add-contact.service';

describe('AddContactService', () => {
  let service: AddContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
