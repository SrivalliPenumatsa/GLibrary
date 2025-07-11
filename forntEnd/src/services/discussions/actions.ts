'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

async function GetTokenFromCookie()
{
  const token = (await cookies()).get("accessToken")?.value;
  return token;

}


export async function submitDiscussion(bookId: string, content: string): Promise<void> {
  console.log('Server Action | Submitting discussion:', { bookId, content }, await GetTokenFromCookie());

  try {

    const response = await fetch(`${BASE_URL}/api/discussions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await GetTokenFromCookie()}`,
        'JwtToken': `${await GetTokenFromCookie()}`,
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

export async function getDiscussions(bookId: string): Promise<any> {
  try {

    const response = await fetch(`${BASE_URL}/api/discussions?bookId=${bookId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accessToken': `${await GetTokenFromCookie()}`,
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