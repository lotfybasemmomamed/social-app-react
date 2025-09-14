import { useQuery } from '@tanstack/react-query';
import PostsList from '../components/posts/PostsList'
import { getAllPosts } from '../api/postsApi';
import Loading from '../components/Loading';

function Home() {
    const { data, isLoading, isError,error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,
  });
  
    if (isLoading) return <Loading />;
    if (isError) return <ErrorMessage message={error.message} />;
  return (
    <div className='my-24'>
      <PostsList posts={data?.data?.posts}/>
    </div>
  )
}

export default Home
