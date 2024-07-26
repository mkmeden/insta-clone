import React from "react";
import {
  GridItem,
  Flex,
  Text,
  Link,
  Image,
  Divider,
  Avatar,
  SkeletonCircle,
} from "@chakra-ui/react";
import { Grid, VStack, Skeleton, Box, useDisclosure } from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import { timeAgo } from "../../utils/timeAgo.js";
const Caption = ({post}) => {

    const userProfile = useUserProfileStore(state => state.userProfile)
  return (
    <Flex gap={4}>
    <Link to={`/${userProfile.username}`}>
      <Avatar src={userProfile.profileURL} size={"sm"} />
    </Link>
    <Flex direction={"column"}>
      <Flex gap={2}>
        <Link to={`/${userProfile.username}`}>
          <Text fontWeight={"bold"} fontSize={12}>
            {userProfile.username}
          </Text>
        </Link>

        <Text fontSize={14}>{post.caption}</Text>
      </Flex>
      <Text fontSize={12} color={"gray"}>
        {timeAgo(post.createdAt)}
      </Text>
    </Flex>
  </Flex>
  )
}

export default Caption
