import { useEffect, useState, useRef } from "react";
import { Container, VStack, Text, Flex, Box, Image, Center, Spacer } from "@chakra-ui/react"

type Props = {
    id_history: number;
};

function Chat( { id_history }: Props) {
    const [QAs, setQAs] = useState([]);
    const bottomRef = useRef<null | HTMLDivElement>(null)
    useEffect(() => {
		if (id_history) {
			fetch(`/api/getQAs?id_history=${id_history}`)
				.then((res) => res.json())
				.then(({ data }) => {
                    if (data.length > QAs.length) {
                        if (bottomRef.current) {
                            bottomRef.current?.scrollIntoView({
                                behavior: 'smooth'
                            })
                        }
                    }

					setQAs(data);
				});
            }
        }, [id_history, QAs]);

    return (
        <Container alignItems={"center"} marginX={{base:"full" , md:20}}>
            {
                QAs &&
                QAs.map((QA: any) => (
                    <VStack key={(QA.id_history, QA.waktu)} w="60vw">
                        <Box alignItems={"right"} w="full" my={5}>
                            <Flex flexDirection={"row"} alignContent={"right"}>
                                <Spacer/>
                                <Center>
                                    <Text maxW={"52vw"} border="2px solid" borderRadius="5px" borderColor={"gray.200"} alignSelf={"right"} p={2} mr={5}>{QA.pertanyaan}</Text>
                                    <Image 
                                        src="/mandalorian.jfif"
                                        boxSize={"10"}
                                        borderRadius={"full"}
                                        alt="Your Pic"
                                    />
                                </Center>
                            </Flex>
                        </Box>
                        <Box alignItems={"left"} w="full">
                            <Flex>
                                <Center>
                                    <Image 
                                        src="/gethoGPT.png"
                                        boxSize={"10"}
                                        borderRadius={"full"}
                                        alt="Your Pic"
                                    />
                                    <Text maxW={"52vw"} border="2px solid" borderRadius="5px" borderColor={"gray.200"} align={"left"} p={2} ml={5} my={5}>{QA.jawaban}</Text>
                                </Center>
                            </Flex>
                        </Box>
                    </VStack>
                ))
            }
            <Container ref={bottomRef} />
        </Container>
    )
}

export default Chat
