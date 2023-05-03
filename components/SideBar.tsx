import NewChat from "./NewChat";
import { useEffect, useState } from "react";
import { Flex, Box, Text, Image, VStack } from "@chakra-ui/react";
import ChatRow from "./ChatRow";

// TODO : edit, remove judul
// TODO : rapihin tampilan

function SideBar() {
    const [histories, setHistories] = useState([]);

    useEffect(() => {
        fetch("/api/getHistories")
            .then((res) => res.json())
            .then(({ data }) => setHistories(data));
    }, []);

    return (
    <Flex 
        bg="gray.700"
        flexDir={"column"}
        h="100vh" alignItems="center">
        <Box
            flex={"1"}
            alignItems="center">
            <VStack paddingLeft={5} paddingTop={5} paddingRight={5} spacing={2}>
                <NewChat />
                <Box maxH={"80vh"} overflowY="scroll" sx={{
							'&::-webkit-scrollbar': {
							width: '10px',
							backgroundColor: `gray.700`,
                            overflow: 'auto'
							},
							'&::-webkit-scrollbar-thumb': {
							borderRadius: '20px',
							backgroundColor: `gray.600`,
							},
						}}>
                    {
                        histories &&
                        histories.map((history: any) => (
                            <ChatRow
                                key={history.id_history}
                                id_history={history.id_history}
                                judul={history.judul}
                            />
                        ))}
                </Box>
                
                {!histories.length && (
                    <Flex
                    alignItems="center"
                    justifyContent="center"
                    className="noHistory"
                    color="gray.200"
                  >
                    <Text>No Histories</Text>
                  </Flex>
                )}

            </VStack>
        </Box>
        
        <Image 
            src="/mandalorian.jfif"
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