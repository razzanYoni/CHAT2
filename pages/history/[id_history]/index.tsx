import { VStack, ChakraProvider, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import SideBar from "@/SideBar";
import { useRouter } from "next/router";
import Chat from "@/Chat";
import ChatInput from "@/ChatInput";
import theme from "theme";

// TODO : buat form untuk masukin pertanyaan

const Home: NextPage = () => {
	const router = useRouter();
	const { id_history  } = router.query;

	return (
		<ChakraProvider theme={theme}>
            <Stack direction={{ base: "column", md: "row" }} spacing={0} verticalAlign="center">
                <SideBar/>
				<VStack>
					{ id_history ? ( Chat({ id_history: Number(id_history) }) ) : ( <h1>History Not Found</h1> ) }
					{ id_history ? ( ChatInput({ id_history: Number(id_history) }) ) : (null) }
				</VStack>
            </Stack>
        </ChakraProvider>
	)
};

export default Home;