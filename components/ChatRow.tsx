import { Card, HStack, Text} from "@chakra-ui/react";
import { ChatBubbleLeftIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

type Props = {
    id_history: number;
    judul: string;
};


function ChatRow( { id_history, judul }: Props) {
    const [isHovered1, setIsHovered1] = useState(false);

    const handleMouseEnter1 = () => {
    setIsHovered1(true);
    };

    const handleMouseLeave1 = () => {
    setIsHovered1(false);
    };
    const [isHovered2, setIsHovered2] = useState(false);
    const handleMouseEnter2 = () => {
    setIsHovered2(true);
    };

    const handleMouseLeave2 = () => {
    setIsHovered2(false);
    };

    const router = useRouter();
    let currentHistory = null;
    if (router.query.id_history) {
        currentHistory = router.query.id_history;
    }
    const deleteHistory = async () => {
        await fetch(`/api/deleteHistory?id_history=${id_history}`, {
            method: "DELETE"
        });
        if (router.pathname === "/history/[id_history]" && router.query.id_history === id_history.toString()) {
            router.push("/");
        }
    }

    const editHistory = async () => {
        const newJudul = prompt("Masukkan judul baru");
        if (newJudul) {
            await fetch(`/api/editHistory?id_history=${id_history}&judul=${newJudul}`, {method: "PUT"});
            router.reload();
        }
    }


    return (
        <Card m={1.5} bg={"transparent"} borderColor={"transparent"}>
            <HStack _hover={ { bg: "gray.500", opacity: 0.7 } } color={currentHistory && Number(currentHistory) === id_history ? "teal.600" : "gray.200"}  transition="all 200ms ease-out" border={"1px"} rounded={"lg"} display={"flex"} w="20vw" h={"6vh"} px={"1"} bgColor={currentHistory && Number(currentHistory) === id_history ? "teal.600" : "transparent"}>
                <Link href={`/history/${id_history}`} className={`chatRow justify-center`} key={id_history}>
                    <HStack cursor={"pointer"} alignItems="center" justifySelf="start" fontSize={"sm"} display={"flex"} justifyContent="start" spacing={2} minW="245" maxW="200" h="6vh">
                        <ChatBubbleLeftIcon height={"20"} width={"20"} color="white"/>
                        <Text maxW={150} isTruncated textColor={"white"}>{judul}</Text>
                    </HStack>
                </Link>
                <TrashIcon onClick={deleteHistory} height={"20"} width={"20"} color={isHovered1 ? "red" : "white"} onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1} cursor={"pointer"} />
                <PencilIcon onClick={editHistory} height={"20"} width={"20"} color={isHovered2 ? "blue" : "white"} onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave2} cursor={"pointer"} />
            </HStack>
        </Card>
    );
}

export default ChatRow;