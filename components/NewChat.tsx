import { Container, HStack, Text } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

// TODO : rapihin styling

function NewChat() {
    const router = useRouter();
    const createNewHistory = () => {
        const newHistory = {
            judul: "New Chat"
        };

        fetch("/api/createHistory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newHistory)
        })
            .then((res) => res.json())
            .then(({ data }) => { console.log(data)});
        
        fetch("/api/getHistories")
            .then((res) => res.json())
            .then(({ data }) => {
                if (!data.length) {
                    router.reload(); 
                    return;
                } else {
                    const newHistoryId = data[data.length - 1].id_history ? data[data.length - 1].id_history : 0;
                    router.push(`/history/${newHistoryId}`);
                }
            });
    };


    return (
        <HStack
            onClick={createNewHistory}
            className="chatRow"
            borderColor={"gray.700"}
            border={"1px"}
            alignItems="center"
            justifySelf="center"
            rounded={"lg"}
            px={5}
            py={3}
            fontSize={"sm"}
            display={"flex"}
            justifyContent={"center"}
            spacing={2}
            _hover={{ bg: "gray.700", opacity: 0.7}}
            cursor={"pointer"}
            color={"gray.300"}
            transition="all 200ms ease-out"
        >
            <PlusIcon height={"20"} width={"20"} />
            <Text>New Chat</Text>
        </HStack>
    );
}

export default NewChat;
