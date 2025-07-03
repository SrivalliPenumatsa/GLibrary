
  export interface User {
    id: string;
    name: string;
    email: string;
  }

  export interface Announcement {
    announcementId : string;
    title: string;
    description: string;
    createdAt: string;
    userName?: string;
  }

  export interface PaginatedAnnouncements {
    announcements: Announcement [];
    total: number;
  }

  export interface CreateAnnouncementDto {
    title: string;
    description: string;
  }

  export interface Book {
    bookId: string;
    title: string;
    author: string;
    genre: string;
    description: string;
  }

  export interface CreateBook {
    title: string;
    author: string;
    genre: string;
    description: string;
  }


  export interface Discussion {
    discussionId: string;
    userName: string;
    content: string;
    createdAt: string;
  }
