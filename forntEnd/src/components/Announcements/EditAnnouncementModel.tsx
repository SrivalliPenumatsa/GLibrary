"use client";
import { Modal } from "@/components/modal/Modal";
import {
  deleteAnnouncement,
  submitUpdatedAnnouncement,
} from "@/services/announcements/actions";

import { Announcement } from "@/lib/types";
import { FormEvent } from "react";

interface EditAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcement: Announcement | null;
  setError: (error: string | null) => void;
  onSuccess: () => void;
  token: string;
}

export const EditAnnouncementModal: React.FC<EditAnnouncementModalProps> = ({
  isOpen,
  onClose,
  announcement,
  setError,
  onSuccess,
  token,
}) => {
  if (!announcement) return null;
  const handleDelete = async () => {
    await deleteAnnouncement(announcement.announcementId, token!);
    onSuccess();
    onClose();
    setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const file = formData.get('imageFile') as File;

      if(file.size <= 100)
      {
        setError("File was empty");
      }
      else
      {formData.append("announcementId", announcement.announcementId);
      formData.set(
        "title",
        `${formData.get("title")}${announcement.title.slice(
          announcement.title.lastIndexOf(".")
        )}`
      );
      await submitUpdatedAnnouncement(formData, token!);
      onSuccess();
      onClose();
      setError(null);}
    } catch (err) {
      console.error("Submit error:", err);
      setError("Failed to update announcement.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#F5F1ED] p-6 rounded-md shadow-inner border border-[#A38579] max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-[#29221F]">
          Edit Announcement
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="edit-title"
              className="block text-sm font-medium text-[#29221F]"
            >
              Title
            </label>
            <input
              id="edit-title"
              name="title"
              type="text"
              defaultValue={announcement.title.slice(
                0,
                announcement.title.lastIndexOf(".")
              )}
              className="w-full p-2 border border-[#A38579] rounded bg-[#DAD7CE] text-[#29221F] placeholder-[#A38579]"
              placeholder="Announcement title"
              maxLength={500}
              required
            />
          </div>
          <div>
            <label
              htmlFor="edit-description"
              className="block text-sm font-medium text-[#29221F]"
            >
              Description
            </label>
            <textarea
              id="edit-description"
              name="description"
              defaultValue={announcement.description}
              className="w-full p-2 border border-[#A38579] rounded bg-[#DAD7CE] text-[#29221F] placeholder-[#A38579]"
              placeholder="Write your announcement..."
              rows={5}
              maxLength={400}
              required
            />
          </div>
          <div>
            <label
              htmlFor="imageFile"
              className="block text-sm font-medium text-[#29221F] mb-1"
            >
              Book Cover Image
            </label>
            <input
              id="imageFile"
              name="imageFile"
              type="file"
              accept="image/*"
              className="w-full p-2 border border-[#A38579] rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#C45E4C] file:text-white hover:file:bg-[#B05444] bg-[#DAD7CE]"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#A38579] text-white rounded hover:bg-[#92786D]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-[#C45E4C] text-white rounded hover:bg-[#B05444]"
            >
              Delete
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#81322A] text-white rounded hover:bg-[#6B2A23]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
