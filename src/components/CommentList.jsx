import React, { useEffect, useState } from "react";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../api/commentsApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "../helpers/formateDate";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { getLoggedUserData } from "../api/getLoggedUser";
import { getPostById } from "../api/postsApi";

export default function CommentList({ postId, isOpen }) {
  const [comment, setComment] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getComments", postId],
    queryFn: () => getComments(postId),
  });
  console.log("comments", data?.data?.comments);

  const comments = data?.data?.comments || [];
  const commentsItem = comments.map((comment, index) => {
    return <CommentItem key={index} comment={comment} />;
  });
  const commentsToShow = commentsItem.slice(0, visibleCount);
  const disabled = comments.length <= visibleCount;
  // show more comments function
  function showMoreComments() {
    setVisibleCount((prev) => prev + 5);
  }

  // handle create comment
  const { mutate: _createComment, isPending } = useMutation({
    mutationFn: () => createComment({ post: postId, content: comment }),
    onSuccess: () => {
      queryClient.invalidateQueries(["getComments", postId]);
      setComment("");
    },
  });
  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <>
      {isOpen && (
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
                  onClick={_createComment}
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center 
                       text-white bg-purble rounded-lg focus:ring-4 focus:ring-blue-200 
                       dark:focus:ring-blue-900 hover:bg-purple-700"
                >
                  {isPending ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    "Post Comment"
                  )}
                </button>
              </div>
              {commentsToShow}
              <div className="flex justify-end">
                <p
                  onClick={showMoreComments}
                  className={`inline-block mt-2 px-2 py-1 rounded
  ${
    disabled
      ? "text-gray-300 cursor-not-allowed hover:text-gray-300"
      : "text-purple-600 cursor-pointer hover:text-purple-800 hover:bg-gray-200"
  }`}
                >
                  Show More
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export function CommentItem({ comment }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const queryClient = useQueryClient();

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  // get logged user data
  const { data: userData } = useQuery({
    queryKey: ["loggedUserData"],
    queryFn: () => getLoggedUserData(),
    onSuccess: (data) => {
      console.log("loggedUserData", data);
    },
  });

  const loggedUserId = userData?.data?.user?._id;
  const isOwner = loggedUserId === comment?.commentCreator._id;

  // delete comment mutation
  const {
    mutate: _deleteComment,
    isPending: deleting,
    isError,
  } = useMutation({
    mutationFn: (id) => deleteComment(id),
    onSuccess: () => {
      setOpenDropdown(false);
      queryClient.invalidateQueries(["getComments"]);
    },
  });

  useEffect(() => {
    if (isError) setOpenDropdown(null);
  }, [isError]);
  // edit comment mutation
  const { mutate: _updateComment, isPending: updating } = useMutation({
    mutationFn: ({ id, content }) => updateComment(id, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries(["getComments"]);
      setIsEditing(false);
    },
  });
  if (isError) {
    return <ErrorMessage message="Owner of Post only can be delete comments" />;
  }

  return (
    <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt={comment?.commentCreator?.name}
            />
            {comment?.commentCreator?.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={comment?.createdAt}>
              {formatDate(comment?.createdAt)}
            </time>
          </p>
        </div>

        {isOwner && (
          <div className="relative">
            <button
              onClick={() => toggleDropdown(comment._id)}
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

            {openDropdown === comment._id && (
              <div
                className="absolute right-0 mt-2 z-10 w-36 bg-white rounded divide-y 
                              divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                  <li
                    onClick={() => {
                      setIsEditing(true);
                      setEditContent(comment?.content);
                      setOpenDropdown(null);
                    }}
                    className="cursor-pointer"
                  >
                    <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Edit
                    </a>
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => _deleteComment(comment._id)}
                  >
                    <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      {deleting ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        "Remove"
                      )}
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </footer>

      {isEditing && (
        <div className="mb-4">
          <div className="py-2 px-4 mb-2 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <textarea
              rows={3}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full text-sm text-gray-900 border-0 focus:ring-0 
                         focus:outline-none dark:text-white dark:placeholder-gray-400 
                         dark:bg-gray-800"
              placeholder="Edit your comment..."
              required
            />
          </div>
          <button
            onClick={() =>
              _updateComment({ id: comment._id, content: editContent })
            }
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center 
                       text-white bg-purple-600 rounded-lg focus:ring-4 focus:ring-purple-200 
                       dark:focus:ring-purple-900 hover:bg-purple-700"
          >
            {updating ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Update Comment"
            )}
          </button>
        </div>
      )}

      {!isEditing && (
        <p className="text-gray-500 dark:text-gray-400">{comment?.content}</p>
      )}
    </article>
  );
}
