import { useEffect, useState } from "react";
import { Container, VStack } from "@chakra-ui/react"

type Props = {
    id_history: number;
};

// TODO : Implement

function Chat( { id_history }: Props) {
    const [QAs, setQAs] = useState([]);
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
        <Container>
            {
                QAs &&
                QAs.map((QA: any) => (
                    <VStack key={(QA.id_history, QA.waktu)}>
                        <p>{QA.pertanyaan}</p>
                        <p>{QA.jawaban}</p>
                    </VStack>
                ))
            }
        </Container>
    )
}

export default Chat
