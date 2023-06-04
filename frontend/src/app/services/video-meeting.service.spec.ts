import { TestBed } from '@angular/core/testing';

import { VideoMeetingService } from './video-meeting.service';

describe('VideoMeetingService', () => {
  let service: VideoMeetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoMeetingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
