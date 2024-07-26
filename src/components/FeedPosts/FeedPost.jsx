import React from "react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import { Box,Image } from "@chakra-ui/react";
import useGetUserProfileById from '../../hooks/useGetUserProfileById'
const FeedPost = ({post}) => {
  const {userProfile, isLoading} = useGetUserProfileById(post.createdBy)
  return (
    <div>
      {!isLoading && <PostHeader post = {post} creatorProfile = {userProfile} />}
      <Box borderRadius={4} overflow={"hidden"}>
        <Image src  ={post.imageURL} alt="feed post image"/>
      </Box>
      <PostFooter post={post} creatorProfile= {userProfile} />
    </div>
  );
};

export default FeedPost;
