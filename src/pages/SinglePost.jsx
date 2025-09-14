import React from 'react'
import { useParams } from 'react-router-dom';
import { getPostById } from '../api/postsApi';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import { useQuery } from '@tanstack/react-query';
import PostsList from '../components/posts/PostsList';

export default function SinglePost() {
    const{id}=useParams()
    const { data, isLoading, isError,error } = useQuery({
    queryKey: ["singlePost"],
    queryFn: ()=>getPostById(id),
  });
  console.log("SINGLE POST DATA",data?.data)
    if (isLoading) return <Loading />;
    if (isError) return <ErrorMessage message={error.message} />;
  return (
    <div className='my-24'>
      <PostsList posts={data?.data?.post}/>
    </div>
  )
}
