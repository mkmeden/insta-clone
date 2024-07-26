import {
  Box,
  Flex,
  InputRightElement,
  Image,
  Button,
  InputGroup,
  Text,
  VStack,
  Input,
} from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import useShowToast from "../../hooks/useShowToast";
const Signup = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    fullname: "",
    username: "",
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, error, signup] = useSignUpWithEmailAndPassword();
  return (
    <>
      <Input
        placeholder="Email"
        size={"sm"}
        fontSize={14}
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />

      <Input
        placeholder="Username"
        size={"sm"}
        fontSize={14}
        value={inputs.username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
      />
      <Input
        placeholder="Full Name"
        size={"sm"}
        fontSize={14}
        value={inputs.fullname}
        onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
      />

      <InputGroup>
        <Input
          placeholder="Password"
          fontSize={14}
          type={isShowPassword ? "text" : "password"}
          value={inputs.password}
          size={"sm"}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />

        <InputRightElement h="full">
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}

      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        onClick={() => signup(inputs)}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </>
  );
};

export default Signup;
