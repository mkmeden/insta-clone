import {
  Box,
  Flex,
  Image,
  Button,
  Text,
  VStack,
  Input,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
  const [islogin, setIsLogin] = useState(true);

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src="/logo.png" cursor={"pointer"} h={"24"} />

          {islogin ? <Login /> : <Signup />}

          {/* --------OR---------- */}

          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={1}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"grey"} />
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"grey"} />
          </Flex>

          <GoogleAuth islogin = {islogin}/>
        </VStack>
      </Box>

      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {islogin ? "Dont have an account?" : "Already have an account"}
          </Box>
          <Box
            color={"blue.500"}
            onClick={() => setIsLogin(!islogin)}
            cursor={"pointer"}
          >
            {islogin ? "Sign up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
