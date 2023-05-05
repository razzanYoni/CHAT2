import React from 'react'
import { Input, HStack, Box, Stack, useRadio, useRadioGroup } from '@chakra-ui/react';
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { mainQuestionHandler } from 'processing/mainHandler';

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

    const options = ['KMP', 'BM']

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'Algorithm',
        defaultValue: 'KMP',
        onChange: setSelectedAlgorithm,
    })

  const group = getRootProps()

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

    };

    const compute = async () => {
        if (inputValue !== "") {
          createNewQA(inputValue, await mainQuestionHandler(inputValue, selectedAlgorithm == 'KMP'))
          setInputValue("");
        }
    }

    const handleKeyDown = (event:any) => {
        if (event.key === "Enter" && inputValue != "") {
          console.log("Input value:", inputValue);
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
                <Input placeholder='Ask your questions here...' w={{base:"80vw", md:"45vw"}} onChange={handleChange} onKeyDown={handleKeyDown} value={inputValue} />							
                <PaperAirplaneIcon onClick={compute} cursor={"pointer"} height={"40"} width={"40"}/>
            </HStack>
        </Stack>

    )
}

export default ChatInput
