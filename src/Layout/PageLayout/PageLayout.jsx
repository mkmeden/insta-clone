import { Flex, Box,Spinner } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../../components/Navbar/Navbar";
const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const canRenderSidebar  = pathname!="/auth" && user ;
  const canRenderNavBar = !user &&!loading && pathname!='/auth'
  const checkingUserIsAuth = !user && loading
  if(checkingUserIsAuth)
    return <PageLayoutSpinner />

  return (
    <Flex direction={canRenderNavBar?"column" : "row"}>
      {/* sidebar on the left  */}

      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar/>
        </Box>
      ) : null}
      {/* Navbar */}
      {canRenderNavBar ? <Navbar/> : null}
      <Box flex={1} w={{base: "calc(100%-70px)", md:"calc(100%-240px)"}} >{children}</Box>
    </Flex>
  );
};

export default PageLayout;


const PageLayoutSpinner = () =>{
  <Flex direction={'column'} h={'100vh'} alignItems={"center"} justifyContent={'center'}>
    <Spinner size={'xl'}/>
  </Flex>
}
