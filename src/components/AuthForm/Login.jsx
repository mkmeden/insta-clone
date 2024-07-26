
import {
  Box,
  Flex,
  Image,
  Button,
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

import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading , error , login] = useLogin()

  return (
    <>
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
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14} onClick={()=>login(inputs)} isLoading = {loading} >
        Log in
      </Button>
    </>
  );
};

export default Login;
