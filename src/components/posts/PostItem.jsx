import { useState } from "react";
import { formatDate } from "../../helpers/formateDate";
import { timeAgo } from "../../helpers/timeAge";
import CommentList from "../CommentList";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../api/commentsApi";
import { getLoggedUserData } from "../../api/getLoggedUser";

export default function PostItem({ postData, randomphotos }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const {
    id,
    body,
    createdAt,
    user: { name, photo, _id },
  } = postData;

  //get comments count
  const { data } = useQuery({
    queryKey: ["getComments", id],
    queryFn: () => getComments(id),
  });

  const commentsCount = data?.data?.comments?.length;

  //get logged user data
  const { data: userData } = useQuery({
    queryKey: ["loggedUserData"],
    queryFn: () => getLoggedUserData(),
  });
  const loggedUserId = userData?.data?.user?._id;
  const isOwner = loggedUserId == _id;

  return (
    <div className="bg-purple-200 p-6 rounded-2xl mx-4 md:mx-auto mt-5 max-w-md md:max-w-2xl">
      <div className="flex bg-white shadow-lg rounded-lg">
        <div className="flex items-start px-4 py-6">
          <img
            className="w-12 h-12 rounded-full object-cover mr-4 shadow"
            src={`${photo}`}
            alt={`${name}`}
          />
          <div>
            <div className="flex items-center justify-between gap-5">
              <h2 className="text-lg font-semibold text-gray-900 ">{name}</h2>

              {/* DROP DOWN MENU */}
              {isOwner && (
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown((PREV) => !PREV)}
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

                  {openDropdown && (
                    <div
                      className="absolute right-0 mt-1 z-10 w-36 bg-white rounded divide-y 
                      divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        <li
                          className="cursor-pointer"
                          onClick={() => {
                            console.log("Edit post", id);
                            setOpenDropdown(null);
                          }}
                        >
                          <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Edit
                          </a>
                        </li>
                        <li
                          className="cursor-pointer"
                          onClick={() => {
                            console.log("Remove post", id);
                            setOpenDropdown(null);
                          }}
                        >
                          <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Remove
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="text-gray-700">Created At {formatDate(createdAt)}  <span className="text-gray-700">({timeAgo(createdAt)})</span>.</p>
            {/* img post &body */}
            <div
              className="cursor-pointer"
              onClick={() => navigate(`post/${id}`)}
            >
              <div className="my-2 flex justify-center">
                <img
                  className="w-full rounded shadow-sm shadow-purple-500"
                  src={randomphotos}
                  alt={name}
                />
              </div>

              <p className="mt-3 text-gray-700 text-sm">
                {body ? body : <p className="bg-red-300">No Content</p>}
              </p>
            </div>

            <div className="mt-4 flex items-center">
              <div className="flex mr-2 text-gray-700 text-sm mr-3">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-1"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>12</span>
              </div>
              <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex mr-2 text-gray-700 text-sm mr-8 hover:text-purble cursor-pointer"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-1"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
                <span>{commentsCount}</span>
              </div>
              <div className="flex mr-2 text-gray-700 text-sm mr-4">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-1"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <span>share</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommentList postId={id} isOpen={isOpen} />
    </div>
  );
}
