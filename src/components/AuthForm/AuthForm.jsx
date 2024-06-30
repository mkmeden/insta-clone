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

const AuthForm = () => {
  const [islogin, setIsLogin] = useState(true);

  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleAuth = () => {
    if(!inputs.password || !input.email )
      {
        alert('Please fill in the fields')
        return;
      }
  };
  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src="/logo.png" cursor={"pointer"} h={"24"} />
          <Input
            placeholder="Email"
            fontSize={14}
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
          <Input
            placeholder="Password"
            fontSize={14}
            type="password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
          {!islogin ? (
            <Input
              placeholder="Confirm Password"
              fontSize={14}
              type="password"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          ) : null}

          <Button
            w={"full"}
            colorScheme="blue"
            size={"sm"}
            onClick={handleAuth}
          >
            {islogin ? "Login" : "Sign up"}
          </Button>

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

          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            cursor={"pointer"}
          >
            <Image src="/google.png" h={5} mx={2} />
            <Text color={"blue.500"}>Login with google</Text>
          </Flex>
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
