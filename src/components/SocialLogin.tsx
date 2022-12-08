import { Box, Button, Divider, HStack, Text } from "@chakra-ui/react";
import { FaGithub, FaComment } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text textTransform={"uppercase"} color="gray.500" fontSize="xs" as="b">
          Or
        </Text>
        <Divider />
      </HStack>
      <HStack>
        <Button leftIcon={<FaGithub />} colorScheme={"twitter"}>
          Continue with Github
        </Button>
        <Button leftIcon={<FaComment />} colorScheme={"yellow"}>
          Continue with Kakao
        </Button>
      </HStack>
    </Box>
  );
}
