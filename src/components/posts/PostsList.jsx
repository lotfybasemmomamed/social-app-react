import { getRandomPhotos } from "../../api/randomPhotosApi";
import PostItem from "./PostItem";
import { useQuery } from "@tanstack/react-query";

export default function PostsList({ posts }) {
  const { data: photosData } = useQuery({
    queryKey: ["randomPhotos"],
    queryFn: getRandomPhotos,
  });
  const normalizedPosts = Array.isArray(posts) ? posts : [posts];
  //get Random Photos
  async function _getRandowPhotos() {
    const randomPtotos = await getRandomPhotos();
    return randomPtotos;
  }

  return (
    <div>
      {normalizedPosts.map((post) => {
        const randomPhoto =
          photosData && photosData.length > 0
            ? photosData[Math.floor(Math.random() * photosData.length)]
            : null;
        return (
          <>
            <PostItem postData={post} randomphotos={randomPhoto} />
          </>
        );
      })}
    </div>
  );
}
