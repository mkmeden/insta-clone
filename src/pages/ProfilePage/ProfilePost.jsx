import React, { useState } from "react";
import { GridItem, Flex, Text, Image, Divider, Avatar, Button } from "@chakra-ui/react";
import { Grid, VStack, Skeleton, Box, useDisclosure } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PostFooter from "../../components/FeedPosts/PostFooter";
import Comment from "../../components/Comments/Comment";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";
import Caption from "../../components/Comments/Caption";
const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore(state => state.userProfile) 
  const authUser = useAuthStore(state => state.user)
  const showToast = useShowToast()
  const [isDeleting , setIsDeleting] = useState(false);
  const deletePost = usePostStore(state => state.deletePost)
  const deletePostfromUser = useUserProfileStore(state => state.deletePost)


  const handleDeletePost = async () => {
console.log('here')
    if(!window.confirm('Are you sure you want to delete the post?')) return ; 

    if(isDeleting)return ;

    setIsDeleting(true)
    try{
      const imageRef = ref(storage,`posts/${post.id}`)
      await deleteObject(imageRef);

      await deleteDoc(doc(firestore, 'posts', post.id))
      const userRef = doc(firestore , "users" , authUser.uid)

      await updateDoc(userRef , {
        posts : arrayRemove(post.id)
      })

      deletePost(post.id)
      deletePostfromUser(post.id)

      showToast('Success', 'Post deleted successfully', 'success')
    }
    catch(error)
    {
      showToast('Error' , error.message , 'error')
    }
    finally{
      setIsDeleting(false)}
  }


  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>

            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Image
          src={post.imageURL}
          alt="profile post"
          width={"100%"}
          height={"100%"}
          objectFit={"cover"}
        />
      </GridItem>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap="4"
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              maxH={'90vh'}
              minH = {'50vh'}
              
            >
              <Flex
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
              >
                <Image src={post.imageURL} alt="profile post" />
              </Flex>

              <Flex
                flex={1}
                flexDirection={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Flex
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    gap={4}
                  >
                    <Avatar
                      src={userProfile.profilePicURL}
                      size={"sm"}
                      name="as a programmer"
                    />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                {
                  authUser?.uid === userProfile.uid && (
                    <Button
                    size={'sm'}
                    bg={'transparent'}
                      _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                      borderRadius={4}
                      p={1}
                      isLoading = {isDeleting}
                      onClick={handleDeletePost}
                    >
                      <MdDelete size={20} cursor={"pointer"} />
                    </Button>
                  )
                }
                </Flex>
                <Divider my={4} bg={"gray.500"} />
                <VStack
                  width={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  {post.caption && <Caption post= {post}  /> }
                  {post.comments.map((comment) => {
                    return <Comment key={comment.id} comment ={comment}/>
                  })}

                </VStack>

                <Divider my={4} bg={"gray.800"} />
                <PostFooter isProfilePage={true}  post = {post}/>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
