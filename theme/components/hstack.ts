import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    components: {
      HStack: {
        variants: {
          'chat-row': {
            bg: 'transparent',
          }
        }
      },
    },
  });
  
export default theme;