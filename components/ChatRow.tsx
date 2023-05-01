import { Card, HStack, Text } from "@chakra-ui/react";
import { ChatBubbleLeftIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
    id_history: number;
    judul: string;
};

function ChatRow( { id_history, judul }: Props) {
    const router = useRouter();
    const deleteHistory = async () => {
        await fetch(`/api/deleteHistory?id_history=${id_history}`, {
            method: "DELETE"
        });
        router.reload();
    }

    return (
        <Card bgColor={"#202123"}>
            <Link href={`/history/${id_history}`} className={`chatRow justify-center`} >
                <HStack _hover={ { bg: "gray.700", opacity: 0.7} } cursor={"pointer"} color={"gray.300"} transition="all 200ms ease-out" borderColor={"gray.700"} border={"1px"} alignItems="center" justifySelf="center" rounded={"lg"} px={5} py={3} fontSize={"sm"} display={"flex"} justifyContent={"center"} spacing={2}>
                    <ChatBubbleLeftIcon height={"20"} width={"20"} />
                    <p>{judul}</p>
                </HStack>
            </Link>
            <TrashIcon onClick={deleteHistory} height={"20"} width={"20"}/>
            <PencilIcon height={"20"} width={"20"} />
        </Card>
    );
}

export default ChatRow;
