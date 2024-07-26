import { Flex,Avatar , Box,Link } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import useLogout from '../../hooks/useLogout';
import useAuthStore from '../../store/authStore';
import { Link as Rlink } from 'react-router-dom';
const SuggestedHeader = () => {

  const [handleLogout, isLoggingOut] = useLogout();
  const authUser  = useAuthStore((state)=> state.user) ;

  // console.log(authUser)
  if(!authUser)
    return null

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>

          <Rlink to={`/${authUser.username}`}>
            <Avatar  size={"md"} src={authUser.profilePicURL}/>
          </Rlink>
          <Rlink to={`/${authUser.username}`}>
            <Box fontSize={12} fontWeight={"bold"}> {authUser.username}</Box>
          </Rlink>
        </Flex>
        <Link
        onClick={handleLogout}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        style={{ textDecoration: "none" }}
        cursor={"pointer"}
      >

        Log out
      </Link>
    </Flex>
  )
}

export default SuggestedHeader
