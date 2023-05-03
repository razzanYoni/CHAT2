import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

import { HStack, Text } from "@chakra-ui/react";

// TODO : rapihin styling

function NewChat() {
    const router = useRouter();
    const createNewHistory = () => {
        const newHistory = {
            judul: "Untitled"
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
                    router.reload();
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
            justifySelf="left"
            rounded={"lg"}
            px={70}
            py={3}
            fontSize={"sm"}
            display={"flex"}
            justifyContent={"center"}
            spacing={2}
            _hover={{ bg: "gray.500", opacity: 0.7}}
            cursor={"pointer"}
            color={"gray.200"}
            transition="all 200ms ease-out"
            w={310}
        >
            <PlusIcon height={"20"} width={"20"} />
            <Text>New Chat</Text>
        </HStack>
    );
}

export default NewChat;