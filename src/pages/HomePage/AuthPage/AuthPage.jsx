import { Flex,Container,VStack ,Box , Image} from '@chakra-ui/react'
import React from 'react'

const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"}>
        <Container maxW={"container.md"} padding={0}>

            {/* left side */}
            <Box display= {{base: "none" , md : "block"}}>
                <Image src="/auth.png" h={650} alt = 'Phone image' />
            </Box>

            <VStack>
                
            </VStack>
        </Container>
    </Flex>
  )
}

export default AuthPage
