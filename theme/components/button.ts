import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    components: {
      Card: {
        variants: {
          base: {
            bg: 'yellow.500',
            fontSize: 'md'
           },
          sm: {
            bg: 'teal.500',
            fontSize: 'lg'
           },
        }
      },
    },
  });
  