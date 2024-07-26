import {
  Flex,
  AvatarGroup,
  Text,
  Button,
  VStack,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";



const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  const  authUser = useAuthStore(state => state.user);
  const visitingOwnProfileandAuth =authUser && authUser.username === userProfile.username;
    const visitingAnotherProfileAuth =authUser && authUser.username !== userProfile.username;
    const {isUpdating , isFollowing , handleFollowUser} = useFollowUser(userProfile?.uid)
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
      <Flex
        gap={{ base: 4, sm: 10 }}
        py={10}
        direction={{ base: "column", sm: "row" }}
      >
        <AvatarGroup
          size={{ base: "xl", md: "2xl" }}
          justifySelf={"center"}
          alignSelf={"flex-start"}
          mx={"auto"}
        >
          <Avatar src={userProfile.profilePicURL} />
        </AvatarGroup>

        <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
          <Flex
            gap={4}
            direction={{ base: "column", sm: "row" }}
            alignItems={"center"}
            justifyContent={{ base: "center", sm: "flex-start" }}
            w={"full"}
          >
            <Text fontSize={{ base: "sm", md: "lg" }}>
              {userProfile.username}
            </Text>
            {visitingOwnProfileandAuth && (
              <Button
                bg={"white"}
                color={"black"}
                _hover={{ bg: "whiteAlpha.800" }}
                size={{ base: "xs", md: "sm" }}
                onClick={onOpen}
              >
                Edit Profile
              </Button>
            )}

            {visitingAnotherProfileAuth && (
              <Button
                bg={"blue.500"}
                color={"white"}
                _hover={{ bg: "blue.600" }}
                size={{ base: "xs", md: "sm" }}
                onClick={handleFollowUser}
                isLoading = {isUpdating}

              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </Flex>
          <Flex alignItems="center" gap={{ base: 2, sm: 4 }}>
            <Text fontSize={{ base: "xs", md: "sm" }}>
              <Text as="span" fontWeight={"bold"} mr={1}>
                {" "}
                {userProfile.posts.length}
              </Text>
              Posts
            </Text>
            <Text fontSize={{ base: "xs", md: "sm" }}>
              <Text as="span" fontWeight={"bold"} mr={1}>
                {userProfile.followers.length}
              </Text>
              Followers
            </Text>
            <Text fontSize={{ base: "xs", md: "sm" }}>
              <Text as="span" fontWeight={"bold"} mr={1}>
                {userProfile.following.length}
              </Text>
              Following
            </Text>
          </Flex>

          <Flex alignItems={"center"} gap={4}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {userProfile.fullName}
            </Text>
          </Flex>
          <Text fontSize={"sm"}>{userProfile.bio}</Text>
        </VStack>

        {isOpen && <EditProfile isOpen = {isOpen} onClose = {onClose} /> }
      </Flex>
    </div>
  );
};

export default ProfileHeader;
