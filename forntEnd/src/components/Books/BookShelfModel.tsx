"use client";
import { Modal } from "../modal/Modal";
import { useParams } from "next/navigation";

interface BookShelfModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  bookId: string;
//   setError: (error: string | null) => void;
}

import React, { useState } from "react";

export default function BookShelfModel(props: BookShelfModalProps) {
    const params = useParams();
    const [isCompleted, setIsCompleted] = useState(false)
    const [inProgress, setInProgress] = useState(false)
    const [isWaitingOnShelf, setIsWaitingOnShelf  ] = useState(false)
    // const bookId = params.bookId;
    console.log(props.bookId);
    
    const handleSubmit = async () => {
        if(isCompleted) { console.log("isCompleted"); }
        if(inProgress) { console.log("inProgress"); }
        if(isWaitingOnShelf) { console.log("isWaitingOnShelf"); }
        props.onSuccess();

    }
    const handleIsCompleted = () => {
        setIsCompleted(!isCompleted)
        console.log("isCompleted");
    }
    const handleInProgress = () => {
        setInProgress(!inProgress)
        console.log("inProgress"); 
    }
    const handleIsWaitingOnShelf = () => {
        setIsWaitingOnShelf(!isWaitingOnShelf)
        console.log("isWaitingOnShelf");
    }
    const handleClose = () => {
        props.onClose();
    }

  return (
    <div>
      {/* <Model isOpen={props.isOpen} onClose={props.onClose}>
      <div className="bg-gray-200 p-6 rounded-md shadow-inner border border-gray-400 max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Add the book to your Book Shelf </h2>
      <form onSubmit={handleSubmit}>
        <button
            onClick={handleIsCompleted}
            className={`px-4 py-2 rounded ${isCompleted ? 'bg-gray-200' : 'bg-amber-800'}`}
            >
            Finished Tales
        </button>
        <button 
            onClick={handleInProgress}
            className={`px-4 py-2 rounded ${inProgress ? 'bg-gray-200' : 'bg-amber-800'}`}

            >
            Currently Flipping
        </button>
        <button 
            onClick={handleIsWaitingOnShelf}
            className={`px-4 py-2 rounded ${isWaitingOnShelf ? 'bg-gray-200' : 'bg-amber-800'}`}

            >
            Waiting on the Shelf
        </button>

        <button 
            onClick={handleClose}
            className={`px-4 py-2 rounded ${isWaitingOnShelf ? 'bg-gray-200' : 'bg-amber-800'}`}

            >
            Close
        </button>
      </form>
      </div>
      </Model> */}

<Modal
  isOpen={props.isOpen}
  onClose={props.onClose}
>
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 border border-gray-300 animated-scale-up transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
      
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Add the book to your Book Shelf</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Buttons with consistent styling */}
        <button
          type="button"
          onClick={handleIsCompleted}
          className={`px-4 py-3 text-white font-semibold rounded transition-colors duration-300 ${
            isCompleted ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
          }`}
        >
          Finished Tales
        </button>

        <button
          type="button"
          onClick={handleInProgress}
          className={`px-4 py-3 text-white font-semibold rounded transition-colors duration-300 ${
            inProgress ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'
          }`}
        >
          Currently Flipping
        </button>

        <button
          type="button"
          onClick={handleIsWaitingOnShelf}
          className={`px-4 py-3 text-white font-semibold rounded transition-colors duration-300 ${
            isWaitingOnShelf ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-500 hover:bg-gray-600'
          }`}
        >
          Waiting on the Shelf
        </button>
        <button type="submit"
            className="mt-4 px-4 py-3 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition-colors duration-300"
         >Submit</button>
        {/* Cancel/Close button styled appropriately */}
        <button
          type="button"
          onClick={handleClose}
          className="mt-4 px-4 py-3 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition-colors duration-300"
        >
          Close
        </button>
      </form>
    </div>
  </div>
</Modal>
    </div>
  );
}
