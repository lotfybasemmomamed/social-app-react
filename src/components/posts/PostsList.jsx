import { getAllPosts } from "../../api/postsApi";
import { getRandomPhotos } from "../../api/randomPhotosApi";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import PostItem from "./postItem";
import { useQuery } from "@tanstack/react-query";

export default function PostsList() {
  const { data, isLoading, isError,error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,
  });
   const { data: photosData } = useQuery({
    queryKey: ["randomPhotos"],
    queryFn: getRandomPhotos,
  });

  //get Random Photos
  async function _getRandowPhotos() {
    const randomPtotos = await getRandomPhotos();
    return randomPtotos;
  }
    if (isLoading) return <Loading />;
    if (isError) return <ErrorMessage message={error.message} />;

  console.log("allPosts", data?.data.posts);
  return (
    <div>
      {data?.data?.posts.map((post) => {
        return (
          <>
            <PostItem
              postData={post}
              randomphotos={photosData[Math.floor(Math.random() * 101)]}
            />
          </>
        );
      })}
    </div>
  );
}
