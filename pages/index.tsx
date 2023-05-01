import { useEffect, useState } from "react";

import {
    Box,
    Button,
    ChakraProvider,
    Container,
    Flex,
    Grid,
    HStack,
    Heading,
    Stack,
    Icon,
    Text,
    useToast,
} from "@chakra-ui/react";

import { BoltIcon, ExclamationTriangleIcon, SunIcon } from "@heroicons/react/24/outline";

import type { NextPage } from "next";

import theme from "theme";
import SideBar from "@/SideBar";

// TODO : Styling

const Home: NextPage = () =>  {

    return (
        <ChakraProvider theme={theme}>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                <SideBar/>

                <Box className={"flex flex-col items-center justify-center h-screen px-2 text-white"}>
                <Heading as="h1" fontSize="5xl" fontWeight="bold" mb={20}>
                  ChatGPT
                </Heading>

                <Flex flexDirection="row" justifyContent="center" alignItems="center">
                  <HStack display="flex" flexDirection="row" alignItems="center" spacing={2}>
                    <Box>
                      <Flex
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        mb={5}
                      >
                        <SunIcon height={"20"} width={"20"} />
                        <Text fontSize="xl">Examples</Text>
                      </Flex>

                      <Box display="flex" flexDirection="column" alignItems="center">
                        <Text className={`infoText`}>"Explain Something to me"</Text>
                        <Text className="infoText">"What is the difference between a dog and a cat"</Text>
                        <Text className="infoText">"What is the color of the sun"</Text>
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

                      <Box display="flex" flexDirection="column" alignItems="center">
                        <Text className="infoText">"Explain Something to me"</Text>
                        <Text className="infoText">"What is the difference between a dog and a cat"</Text>
                        <Text className="infoText">"What is the color of the sun"</Text>
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

                      <Box display="flex" flexDirection="column" alignItems="center">
                        <Text className="infoText">May occasionally generate incorrect information</Text>
                        <Text className="infoText">May occasionally produce harmful instructions or biased content</Text>
                        <Text className="infoText">"What is the color of the sun"</Text>
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
