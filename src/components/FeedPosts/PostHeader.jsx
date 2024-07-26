import { Flex,Avatar,Box ,Text, Button} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import useFollowUser from '../../hooks/useFollowUser'
import { timeAgo } from '../../utils/timeAgo'
const PostHeader = ({post, creatorProfile}) => {

  const {isUpdating , isFollowing , handleFollowUser} = useFollowUser(post.createdBy)

  return (
    <Flex justifyContent={'space-between'} alignItems={"center"} w={"full"} my={2}>
        <Flex alignItems={"center"} gap ={2}>
          <Link to={`/${creatorProfile.username}`}>
            <Avatar src={creatorProfile.profilePicURL}    alt="user profile pic" size={"sm"}/>
          </Link>
            <Flex fontSize={12} fontWeight={"bold"} gap={2}>
          <Link to={`/${creatorProfile.username}`}>
              {creatorProfile.username}
              </Link>
              <Box color={"gray.500"}>
                {timeAgo(post.createdAt)}
              </Box>
            </Flex>
        </Flex>

        <Box cursor={"pointer"}>
          <Button 
          fontSize ={12}
          color = {"blue.500"}
          fontWeight = {"bold"}
          _hover={{
            color : "white",
          }}
          transition = {"0.2s ease-in-out"}
          
          size={'xs'}
          isLoading={isUpdating}
          onClick={handleFollowUser}
          variant='link'
          >
            {isFollowing ? 'Unfollow' :  'Follow'}
          </Button>
        </Box>
    </Flex>
  )
}

export default PostHeader
