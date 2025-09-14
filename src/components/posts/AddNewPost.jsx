import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { createPost } from "../../api/postsApi";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";

export default function AddNewPost() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed right-3 bottom-14 z-50">
        <div className="relative group flex items-center">
          <span className="absolute right-12 bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Add New Post
          </span>

          <button
            onClick={() => setIsOpen(true)}
            className="cursor-pointer bg-purple-600 w-10 h-10 flex justify-center 
                     items-center text-2xl text-white rounded-full hover:bg-purple-700"
          >
            +
          </button>
        </div>
      </div>
      {isOpen && <NewPostForm setIsOpen={setIsOpen} />}
    </>
  );
}

// New Post Form Component
function NewPostForm({ setIsOpen }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const queryClient = useQueryClient();

  // mutation
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllPosts"]);
      setContent("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setIsOpen(false);
    },
  });
  // if (isPending) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;

    // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("body", content);
    if (fileInputRef.current?.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    mutate(formData); 
  };
  // handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
      if (fileInputRef.current)
        fileInputRef.current.files = e.dataTransfer.files;
    }
  };

  // handle remove image
  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl w-full max-w-2xl">
        <h2 className="ms-4 text-purble">Add New Post</h2>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Content textarea */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-purble">
              What's on your mind?
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full border-2 border-purble p-4 rounded-xl h-32 resize-none focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Image upload area */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-purble">
              Add an image
            </label>

            {!image ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed border-purble rounded-xl p-8 text-center relative cursor-pointer ${
                  isDragOver
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-300 hover:border-purple-400 hover:bg-gray-50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <p className="text-purple-400">
                  Drag & drop or click to upload
                </p>
              </div>
            ) : (
              <div className="relative group">
                <img
                  src={image}
                  alt="preview"
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer px-6 py-3 border-2 border-purple-300 text-gray-700 rounded-xl hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || (!content.trim() && !image)}
              className="cursor-pointer hover:from-purple-500 hover:via-blue-500 hover:to-indigo-500 px-8 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white rounded-xl disabled:opacity-50"
            >
              {isPending ? <i class="fa-solid fa-spinner fa-spin"></i> : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
