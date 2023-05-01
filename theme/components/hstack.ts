import { extendTheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

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