import { Container, Flex, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Chat from "@/Chat";
import ChatInput from "@/ChatInput";

// TODO : buat form untuk masukin pertanyaan

const Home: NextPage = () => {
	const router = useRouter();
	const { id_history  } = router.query;

	const [qAs, setQAs] = useState([]);

	const [history, setHistory] = useState(null);

	useEffect(() => {
		if (id_history) {
			fetch(`/api/getHistory?id_history=${id_history}`)
				.then((res) => res.json())
				.then(({ data }) => {
					setHistory(data);
				});
		}
	}, [id_history]);

	useEffect(() => {
		if (id_history) {
			fetch(`/api/getQAs?id_history=${id_history}`)
				.then((res) => res.json())
				.then(({ data }) => {
					setQAs(data);
				});
		}
	}, [id_history]);

	return (
		<VStack>
			{ id_history ? ( Chat({ id_history: Number(id_history) }) ) : ( <h1>History Not Found</h1> ) }
			{ id_history ? ( ChatInput({ id_history: Number(id_history) }) ) : (null) }
		</VStack>
	)
};

export default Home;