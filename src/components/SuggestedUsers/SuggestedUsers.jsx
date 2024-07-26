import { VStack,Flex,Box } from '@chakra-ui/react'
import React from 'react'
import SuggestedHeader from './SuggestedHeader'
import { color } from 'framer-motion'
import SuggestedUser from './SuggestedUser'
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers'
const SuggestedUsers = () => {

  const {isLoading , suggestedUsers} = useGetSuggestedUsers()

  if(isLoading)return null;

  return (
    <VStack py={8} px={6} gap={4}>
        <SuggestedHeader />

        {
          suggestedUsers.length !==0 &&(
            <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
            <Box fontSize={12} fontWeight={"bold" } color={"grey.500"}>
                Suggested for you
            </Box>
            <Box fontSize={12} fontWeight={"bold" } _hover={{color : "color.grey400"}} cursor={"pointer"}>
                See All
            </Box>
        </Flex>
          )
        }
        {suggestedUsers.map((user) => (
        <SuggestedUser user={user} key={user.id} />
      ))}
    </VStack>
  )
}

export default SuggestedUsers
