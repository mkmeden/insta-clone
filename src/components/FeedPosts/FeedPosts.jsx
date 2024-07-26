import {
  Container,
  Skeleton,
  Box,
  SkeletonCircle,
  VStack,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const FeedPosts = () => {
const {isLoading , posts}= useGetFeedPosts()

  return (
    <Container maxW={"container.sm"} py={"10"} px={2}>
      {isLoading &&
        [0, 1, 2, 3].map((_, idx) => (
          <VStack
            key={idx}
            gap={4}
            alignItems={"flex-start"}
            mb={10}
            justifyContent={"center"}
          >
            <Flex gap={2}>
              <SkeletonCircle size="10" />
              <VStack gap={2} alignItems={"flex-start"} justifyContent={'center'}>
                <Skeleton height="10px" w={"200px"} />
                <Skeleton height="10px" w={"200px"} />
                <Skeleton />
              </VStack>
            </Flex>

            <Skeleton w={"full"}>
              <Box h={"500px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {
        !isLoading && posts.length>0 && posts.map((post) => <FeedPost key={post.id} post={post}  />)
      }
    </Container>
  );
};

export default FeedPosts;
