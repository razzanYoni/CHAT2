import { VStack, ChakraProvider, Stack, Box, Flex, HStack, Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import SideBar from "@/SideBar";
import { useRouter } from "next/router";
import Chat from "@/Chat";
import ChatInput from "@/ChatInput";
import theme from "theme";
import { useEffect, useRef } from "react";
// TODO : buat form untuk masukin pertanyaan

const Home: NextPage = () => {
	const router = useRouter();
	const { id_history  } = router.query;

	return (
		<ChakraProvider theme={theme}>
            <Stack direction={{ base: "column", md: "row" }} spacing={0} verticalAlign="center" bg="gray.800">
                <SideBar/>
				<VStack w="full" alignItems="center">
					<Box className="chatBox" alignSelf={"center"} alignItems="center" alignContent="center" h="90vh" w="75vw" overflowY="scroll" sx={{
							'&::-webkit-scrollbar': {
							width: '10px',
							backgroundColor: `gray.800`,
							},
							'&::-webkit-scrollbar-thumb': {
							borderRadius: '20px',
							backgroundColor: `gray.600`,
							},
						}} maxH={"90vh"} color="gray.200" py={5} mb={2}>
						{ id_history ? ( Chat({ id_history: Number(id_history) }) ) : ( <h1>History Not Found</h1> ) }
					</Box>
					<Box alignSelf={"center"} w="60vw" color="gray.200">
						{ id_history ? ( ChatInput({ id_history: Number(id_history) }) ) : (null) }
					</Box>
				</VStack>
            </Stack>
        </ChakraProvider>
	)
};

export default Home;