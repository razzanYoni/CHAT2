import React from 'react'
import { Input, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

type Props = {
    id_history: number;
};

function ChatInput( { id_history }: Props) {
    const [inputValue, setInputValue] = React.useState("");
    const router = useRouter();
    const [references, setReferences] = React.useState([]);

    React.useEffect(() => {
        fetch("/api/getReferences")
            .then((res) => res.json())
            .then(({ data }) => setReferences(data));
    }, []);

    const createNewQA = (pertanyaan:any, jawaban:any) => {
        const newQA = {
            id_history: id_history,
            pertanyaan: pertanyaan,
            jawaban: jawaban
        };

        fetch("/api/createQA", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newQA)
        })
            .then((res) => res.json())
            .then(({ data }) => { console.log(data) });

        router.reload();
    };

    const compute = async () => {
        references.forEach((reference:any) => {
            if (inputValue.toLowerCase().includes(reference.pertanyaan.toLowerCase())) {
                createNewQA(inputValue, reference.jawaban);
                setInputValue("");
                return;
            }
        });
        createNewQA(inputValue, "Maaf, saya tidak mengerti pertanyaan Anda");
        setInputValue("");
    }

    const handleKeyDown = (event:any) => {
        console.log(event);
        if (event.key === "Enter") {
          // Process input here
          console.log("Input value:", inputValue);
        //   TODO : Taro algoritma di sini
        // !!! : Algoritma di sini
            compute();
        }
      };
    
    const handleChange = (event:any) => {
    setInputValue(event.target.value);
    };
    

    return (
        <HStack>
            <Input placeholder='Ask your questions here...' onChange={handleChange} onKeyDown={handleKeyDown}></Input>							
            <PaperAirplaneIcon onClick={compute} cursor={"pointer"} height={"40"} width={"40"}/>
        </HStack>

    )
}

export default ChatInput
