import { TestBed } from '@angular/core/testing';

import { PostUserService } from './post-user.service';

describe('PostUserService', () => {
  let service: PostUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
