import React, { useState } from "react";
import { getComments } from "../../api/commentsApi";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../../helpers/formateDate";

export default function CommentList({ postId }) {
  const [comment, setComment] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getComments", postId],
    queryFn: () => getComments(postId),
  });
  console.log("comments", data?.data?.comments);
  const comments = data?.data?.comments || [];

  return (
    <div className="dark:bg-gray-900  my-4 p-4 shadow-lg bg-purple-100 rounded-2xl lg:py-16 antialiased">
      <section className=" ">
        <div className="max-w-2xl mx-auto px-4">
          {/* ========== Add Comment div ========== */}
          <div className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 
                         focus:outline-none dark:text-white dark:placeholder-gray-400 
                         dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center 
                       text-white bg-purble rounded-lg focus:ring-4 focus:ring-blue-200 
                       dark:focus:ring-blue-900 hover:bg-purple-700"
            >
              Post Comment
            </button>
          </div>
          {comments.map((comment) => (
            <CommentItem comment={comment} />
          ))}
          <CommentItem />
        </div>
      </section>
    </div>
  );
}

export function CommentItem({ comment }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (comment.trim() === "") return;
  //   console.log("New Comment:", comment);
  //   setComment("");
  // };

  return (
    <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt="Michael Gough"
            />
            {comment?.commentCreator?.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time dateTime="2022-02-08">{formatDate(comment?.createdAt)}</time>
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => toggleDropdown("comment1")}
            className="inline-flex items-center p-2 text-sm font-medium text-center 
                           text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 
                           focus:ring-4 focus:outline-none focus:ring-gray-50 
                           dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path
                d="M2 0a1.5 1.5 0 1 1 0 3 
                           1.5 1.5 0 0 1 0-3Zm6.041 
                           0a1.5 1.5 0 1 1 0 3 
                           1.5 1.5 0 0 1 0-3ZM14 
                           0a1.5 1.5 0 1 1 0 3 
                           1.5 1.5 0 0 1 0-3Z"
              />
            </svg>
          </button>

          {openDropdown === "comment1" && (
            <div
              className="absolute right-0 mt-2 z-10 w-36 bg-white rounded divide-y 
                                divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Remove
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Report
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </footer>

      <p className="text-gray-500 dark:text-gray-400">
        {comment?.content}
      </p>
    </article>
  );
}
