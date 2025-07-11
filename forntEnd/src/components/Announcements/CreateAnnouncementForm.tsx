'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { CreateAnnouncement } from '@/services/announcements/actions';
import { useRouter } from 'next/navigation';

export default function CreateAnnouncementForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && !file.type.startsWith('image/')) {
      setError('Only image files are allowed for the cover.');
      setImageFile(null);
    } else {
      setImageFile(file);
      setError(null);
    }
  };

  const handleSubmitCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setError('Please upload an image file.');
      return;
    }

    try {
      await CreateAnnouncement(title, description, imageFile);
      if(imageFile.size < 0)
      {
        setError("empty image");
        setImageFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
      else{
      setTitle('');
      setDescription('');
      setError(null);
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      router.refresh();
      }
      
    } catch (err) {
      setError('Failed to create announcement');
    }
  };

  return (
    <div className="bg-[#F5F1ED] p-6 rounded-xl shadow-md border border-[#A38579] h-fit sticky top-6">
      <h2 className="text-2xl font-bold text-[#29221F] mb-6">Create Announcement</h2>
      <form onSubmit={handleSubmitCreate} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[#29221F] mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-[#A38579] rounded-lg focus:ring-2 focus:ring-[#C45E4C] bg-[#DAD7CE] text-[#29221F]"
            placeholder="Announcement title"
            maxLength={100}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[#29221F] mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-[#A38579] rounded-lg focus:ring-2 focus:ring-[#C45E4C] bg-[#DAD7CE] text-[#29221F]"
            placeholder="Write your announcement..."
            rows={5}
            maxLength={400}
            required
          />
        </div>
        <div>
          <label htmlFor="imageFile" className="block text-sm font-medium text-[#29221F] mb-1">
            Image
          </label>
          <input
            ref={fileInputRef}
            id="imageFile"
            type="file"
            accept="image/*"
            onChange={handleImageFileChange}
            className="w-full p-2 border border-[#A38579] rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#C45E4C] file:text-white hover:file:bg-[#B05444] bg-[#DAD7CE]"
            required
          />
        </div>
        {error && (
          <div className="p-3 bg-[#C45E4C] text-white rounded-lg">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#C45E4C] text-white font-medium rounded-lg hover:bg-[#B05444] transition-colors"
        >
          Create Announcement
        </button>
      </form>
    </div>
  );
}