import {  getUserPosts } from "../api/postsApi";
import { getRandomPhotos } from "..//api/randomPhotosApi";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import PostItem from "../components/posts/PostItem";
import { useQuery } from "@tanstack/react-query";
import { getLoggedUserData } from "../api/getLoggedUser";
import Cookies from "universal-cookie";

export default function UserProfile() {
  
  const { data: photosData } = useQuery({
    queryKey: ["randomPhotos"],
    queryFn: getRandomPhotos,
  });

  //get cookie
  const cookie =new Cookies
  const Token =cookie.get("Bearer")

  //get Random Photos
  async function _getRandowPhotos() {
    const randomPtotos = await getRandomPhotos();
    return randomPtotos;
  }


  //get logged user data
  const { data: userData } = useQuery({
    queryKey: ["loggedUserData"],
    queryFn: () => getLoggedUserData(),
  });
  const loggedUserId = userData?.data?.user?._id;

  // console.log("loggedUserId from user profile",loggedUserId,"user data",userData)
  //get user posts
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userPosts", Token],
    queryFn: ()=>getUserPosts(loggedUserId),
    onSuccess: () => {
      console.log("userPosts",data)
    },

  });

  console.log("allPosts", data?.data?.posts);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;
  return (
    <div className="bg-gray-300 relative top-[-15px] pb-6">
      <div className="max-w-3xl mx-auto">
        {/* imgs */}
        <div className="relative top-[5px]">
          <img
            src={photosData[Math.floor(Math.random() * 101)]}
            alt="cover"
            className="w-full h-56 object-cover rounded-lg"
          />

          <div className="absolute bottom-[0%] flex items-center bg-[rgba(0,0,0,0.5)] rounded m-2 p-2  space-x-4">
            <img
              src={data?.data?.posts[0]?.user?.photo}
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
            <h2 className="text-2xl  font-bold text-purble drop-shadow-lg">
              {data?.data?.posts[0]?.user?.name}
            </h2>
          </div>
        </div>
        {/* posts */}
        <div className="mt-2" />

        <div>
          {data?.data?.posts.map((post,index) => {
            return (
              <>
                <PostItem
                key={index}
                  postData={post}
                  randomphotos={photosData[Math.floor(Math.random() * 101)]}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
