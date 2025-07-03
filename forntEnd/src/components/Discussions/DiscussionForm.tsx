'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitDiscussion } from '@/services/discussions/actions';

interface DiscussionFormProps {
  bookId: string;
  token:string
}

export default function DiscussionForm({ bookId, token }: DiscussionFormProps) {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) {
      setError('Content is required');
      return;
    }

    try {
      await submitDiscussion(bookId, content, token!);
      setContent('');
      setError(null);
      router.refresh();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create discussion';
      setError(errorMessage);
      console.error('Error creating discussion:', err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      {error && <p className="text-red-500 mb-3 p-2 bg-red-50 rounded-md">{error}</p>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border border-[#C45E4C] rounded-lg focus:ring-2  focus:border-transparent"
        placeholder="Add a discussion point..."
        rows={4}
      />
      <button 
        type="submit" 
        className="px-4 py-2 bg-[#C45E4C] text-white rounded-lg hover:bg-[#B05444] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
        Post Discussion
      </button>
    </form>
  );
}