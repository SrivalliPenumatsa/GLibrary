import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { SSEMessage } from './sse-types';

@Injectable()
export class SseService {
  private eventSubject = new Subject<SSEMessage>();

  getAnnouncementStream(): Observable<SSEMessage> {
    return this.eventSubject.asObservable();
  }

  pushEvent(event: SSEMessage) {
    this.eventSubject.next(event);
  }
}