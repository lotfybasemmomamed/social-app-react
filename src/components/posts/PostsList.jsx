import { getAllPosts } from "../../api/postsApi";
import PostItem from "./postItem";
import { useQuery } from "@tanstack/react-query";

export default function PostsList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,
  });
  console.log("allPosts", data?.data.posts);
  return (
    <div>
      {data?.data?.posts.map((post) => {
        return (
          <>
            <PostItem postData={post} />
          </>
        );
      })}
    </div>
  );
}
