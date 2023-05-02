import {
    Box,
    ChakraProvider,
    Flex,
    HStack,
    Heading,
    Stack,
    Icon,
    Text,
} from "@chakra-ui/react";

import { BoltIcon, ExclamationTriangleIcon, SunIcon } from "@heroicons/react/24/outline";

import type { NextPage } from "next";

import theme from "theme";
import SideBar from "@/SideBar";

const Home: NextPage = () =>  {

    return (
        <ChakraProvider theme={theme}>
            <Stack direction={{ base: "column", md: "row" }} spacing={0} >
                <SideBar/>
                <Box height={{base:"100%", md:"100vh"}} width={{base:"100%", md:"100%" }} justify-content={"space-evenly"} bg="gray.800" color="gray.200" alignContent={"space-evenly"} alignItems={"space-evenly"} alignSelf={"space-evenly"} justifyContent={"space-evenly"}>
                  <Heading as="h1" fontSize="5xl" fontWeight="bold" textAlign={"center"} mt={"30vh"}>
                    CHAT<sup>2</sup>
                  </Heading>

                  <Flex flexDirection="row" justifyContent="center" alignItems="center" padding={40} paddingTop={10}>
                    <HStack display="flex" flexDirection="row" alignItems="center" spacing={20}>
                      <Box>
                        <Flex
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          mb={5}
                        >
                          <SunIcon height={32} width={32} />
                          <Text fontSize="xl">Examples</Text>
                        </Flex>

                        <Box display="flex" flexDirection="column" alignItems="center" maxW={350}>
                          <Text className={`infoText`}>{'"Explain Something to me"'}</Text>
                          <Text className="infoText" align="center">{'"What is the difference between a dog and a cat"'}</Text>
                          <Text className="infoText" align="center">{'"What is the color of the sun"'}</Text>
                        </Box>
                      </Box>

                      <Box>
                        <Flex
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          mb={5}
                        >
                          <Icon as={BoltIcon} h={8} w={8} />
                          <Text fontSize="xl">Capabilities</Text>
                        </Flex>
                        
                        <Box display="flex" flexDirection="column" alignItems="center" maxW={350}>
                          <Text className="infoText" align="center">{'"Explain Something to me"'}</Text>
                          <Text className="infoText" align="center">{'"What is the difference between a dog and a cat"'}</Text>
                          <Text className="infoText" align="center">{'"What is the color of the sun"'}</Text>
                        </Box>
                      </Box>

                      <Box>
                        <Flex
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          mb={5}
                        >
                          <Icon as={ExclamationTriangleIcon} h={8} w={8} />
                          <Text fontSize="xl">Limitations</Text>
                        </Flex>

                        <Box display="flex" flexDirection="column" alignItems="center" maxW={350}>
                          <Text className="infoText" align="center">{'"May occasionally generate incorrect information"'}</Text>
                          <Text className="infoText" align="center">{'"May occasionally produce harmful instructions or biased content"'}</Text>
                          <Text className="infoText" align="center">{'"What is the color of the sun"'}</Text>
                        </Box>
                      </Box>
                    </HStack>
                  </Flex>
                </Box>
            </Stack>
        </ChakraProvider>
    );
}

export default Home;