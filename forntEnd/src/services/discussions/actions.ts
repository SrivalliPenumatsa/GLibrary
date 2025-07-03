'use server';

import { revalidateTag } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function submitDiscussion(bookId: string, content: string, token:string): Promise<void> {
  console.log('Server Action | Submitting discussion:', { bookId, content });

  try {

    const response = await fetch(`${BASE_URL}/api/discussions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'JwtToken': `${token}`,
      },
      body: JSON.stringify({ bookId, content }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit discussion');
    }

    console.log('Server Action... Discussion posted... Revalidating cache tag...');
    revalidateTag('discussions');
  } catch (error) {
    console.error('Error in submitDiscussion:', error);
    throw error;
  }
}

export async function getDiscussions(bookId: string, token : string): Promise<any> {
  console.log('Server Action | Fetching discussions for bookId:', bookId);

  try {

    const response = await fetch(`${BASE_URL}/api/discussions?bookId=${bookId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'JwtToken': `${token}`,
      },
      next: { tags: ['discussions'] },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch discussions');
    }

    const data = await response.json();
    console.log('Discussions fetched:', { count: data.length });
    return data;
  } catch (error) {
    console.error('Error in getDiscussions:', error);
    throw error;
  }
}