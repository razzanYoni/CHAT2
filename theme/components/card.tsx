import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    components: {
      Card: {
        variants: {
          'chat-row': {
            bg: 'gray.700',
        }
      },
    }
    }
    })
  