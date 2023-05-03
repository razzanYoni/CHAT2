import React from 'react'
import { Input, HStack, Box, Stack, useRadio, useRadioGroup } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

function RadioCard(props: any) {
    const { getInputProps, getCheckboxProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getCheckboxProps()
  
    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='1px'
          borderRadius='md'
          boxShadow='md'
          _checked={{
            bg: 'teal.600',
            color: 'white',
            borderColor: 'teal.600',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={5}
          py={3}
        >
          {props.children}
        </Box>
      </Box>
    )
  }

type Props = {
    id_history: number;
};

function ChatInput( { id_history }: Props) {
    const [inputValue, setInputValue] = React.useState("");
    const [selectedAlgorithm, setSelectedAlgorithm] = React.useState("KMP"); 
    const router = useRouter();
    const [references, setReferences] = React.useState([]);

    const options = ['KMP', 'BM']

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'Algorithm',
        defaultValue: 'KMP',
        onChange: setSelectedAlgorithm,
    })

  const group = getRootProps()

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
            .then(({ data }) => { console.log(data); });

    };

    const compute = async () => {
        let found = false;
        console.log(selectedAlgorithm);
        references.forEach((reference:any) => {
            if (inputValue.toLowerCase().includes(reference.pertanyaan.toLowerCase())) {
                createNewQA(inputValue, reference.jawaban);
                setInputValue("");
                found = true;
                return;
            }
        });
        if (!found) {
            createNewQA(inputValue, "Maaf, saya tidak mengerti pertanyaan Anda");
            setInputValue("");
        }
        router.reload();
    }

    const handleKeyDown = (event:any) => {
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
        <Stack direction={{ base: "column", md: "row" }} alignItems={"center"}>
            <HStack {...group} alignContent={{ base: "center", md: "left" }} justifyContent={{ base: "center", md: "left" }}>
                {options.map((value) => {
                    const radio = getRadioProps({ value })
                    return (
                    <RadioCard key={value} {...radio}>
                        {value}
                    </RadioCard>
                    )
                })}
            </HStack>
            <HStack>
                <Input placeholder='Ask your questions here...' w={{base:"80vw", md:"45vw"}} onChange={handleChange} onKeyDown={handleKeyDown}></Input>							
                <PaperAirplaneIcon onClick={compute} cursor={"pointer"} height={"40"} width={"40"}/>
            </HStack>
        </Stack>

    )
}

export default ChatInput
