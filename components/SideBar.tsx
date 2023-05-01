import NewChat from "./NewChat";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex, Box, Text, Image, Container, VStack, HStack } from "@chakra-ui/react";
import ChatRow from "./ChatRow";

// TODO : edit, remove judul
// TODO : rapihin tampilan

function SideBar() {
    const router = useRouter();
    const [histories, setHistories] = useState([]);

    useEffect(() => {
        fetch("/api/getHistories")
            .then((res) => res.json())
            .then(({ data }) => setHistories(data));
    }, []);

    return (
    <Flex
        p={2}
        flexDir={"column"}
        h="100vh">
        <Box
            flex={"1"}>
            <VStack>
                <NewChat />
                {/* <div> */}
                    {/* ModelSelection */}
                {/* </div> */}

                {
                    histories &&
                    histories.map((history: any) => (
                        // <Container
                        //     onClick={() => router.push(`/history/${history.id_history}`)}
                        //     display={"flex"}
                        //     key={history.id_history}
                        //     maxW={"3xl"}
                        //     h={"50px"}
                        //     w={"50px"}
                        //     flexDir={"row"}
                        //     alignItems={"center"}
                        //     justifyContent={"space-between"}
                        //     // textColor={"white"}
                        //     border={"1px"}
                        //     borderColor={"gray.700"}
                        //     fontSize={"sm"}
                        //     _hover={{ bg: "gray.700", opacity: 0.7, cursor: "pointer"}}
                        // >
                        //         {history.judul}
                        // </Container>
                        <ChatRow
                            id_history={history.id_history}
                            judul={history.judul}
                        />
                    ))}
                
                {!histories.length && (
                    <Flex
                    alignItems="center"
                    justifyContent="center"
                    className="noHistory"
                  >
                    <Text>No Histories</Text>
                  </Flex>
                )}

            </VStack>
        </Box>

        <Image 
        src="mandalorian.jfif"
        boxSize={"12"}
        borderRadius={"full"}
        cursor={"pointer"}
        mx={"auto"}
        mb={"2"}
        _hover={{ opacity: 0.5 }}
        alt="Your Pic"
/>
    </Flex>
);}

export default SideBar;
