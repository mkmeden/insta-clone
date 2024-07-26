import React, { useRef, useState } from "react";
import {
  Flex,
  Box,
  Text,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {
  CreatePostLogo,
  InstagramLogo,
  InstagramMobileLogo,
  NotificationsLogo,
  SearchLogo,
  UnlikeLogo,
  CommentLogo,
} from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentModal";

const PostFooter = ({post,isProfilePage,creatorProfile }) => {

  const commentRef = useRef(null)

const {isCommenting , handlePostComment} = usePostComment()
const [comment , setComment] = useState('')
const authUser = useAuthStore(state => state.user)
const {isLiked , likes ,handleLikedPost, isUpdating} = useLikePost(post)
const {isOpen , onOpen , onClose} = useDisclosure()

const handleSubmitComment = async() =>{
  await handlePostComment(post.id, comment)
  setComment('')
}

  return (
    <Box mb={10} mt={"auto"}>
      <Flex gap={4} w={"full"} mb={2} pt={0} mt={2}>
        <Box onClick={handleLikedPost} cursor={"pointer"} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>

        <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()} >
          <CommentLogo />
        </Box>
      </Flex>

      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>
      {isProfilePage && (
        <Text fontSize='12' color={'gray'}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}
      {!isProfilePage && (
        <>
          <Text fontSize={"sm"} fontWeight={700}>
            {creatorProfile?.username}{" "}
            <Text as={"span"} fontWeight={400}>
              {post.caption}
            </Text>
          </Text>
          {
            post.comments.length >0 && (<Text fontSize="sm" color={"gray"} cursor={'pointer'} onClick={onOpen} >
              View all {post.comments.length} comments
            </Text>)
          }

          {isOpen? <CommentsModal isOpen={isOpen} onClose={onClose} post = {post}  /> : null }
        </>
      )}

     {authUser && 
      <Flex>
      <InputGroup>
        <Input
          variant={"flushed"}
          placeholder={"Add a comment..."}
          fontSize={14}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          ref={commentRef}
        />
        <InputRightElement>
          <Button
            fontSize={14}
            color={"blue.500"}
            fontWeight={600}
            cursor={"pointer"}
            _hover={{ color: "white" }}
            bg={"transparent"}
            onClick={handleSubmitComment}
            isLoading = {isCommenting}
          >
            {" "}
            Post
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
     }
    </Box>
  );
};

export default PostFooter;
