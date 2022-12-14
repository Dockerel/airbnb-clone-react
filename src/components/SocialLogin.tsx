import crypto from "crypto";
import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaGithub, FaComment } from "react-icons/fa";

export default function SocialLogin() {
  const kakaoParams = {
    client_id: "838e513b4de83049d01044f314a822d5",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };
  const paramsK = new URLSearchParams(kakaoParams).toString();
  const date = new Date();
  const ntoHash = `${date.toString()}${Math.random()}`;
  const nStateToken = crypto.createHash("sha256").update(ntoHash).digest("hex");
  const naverButtonClick = () => {
    sessionStorage.setItem("nState", nStateToken);
  };
  const naverParams = {
    client_id: "PmuFLd8yrGcYQbeXXQkt",
    response_type: "code",
    redirect_uri: "http://127.0.0.1:3000/social/naver",
    state: nStateToken,
  };
  const paramsN = new URLSearchParams(naverParams).toString();
  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text textTransform={"uppercase"} color="gray.500" fontSize="xs" as="b">
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as="a"
          href="https://github.com/login/oauth/authorize?client_id=a4407c9526ed7cb93e46&scope=read:user,user:email"
          w={"100%"}
          leftIcon={<FaGithub />}
        >
          Continue with Github
        </Button>
        <Button
          as={"a"}
          href={`https://kauth.kakao.com/oauth/authorize?${paramsK}`}
          w={"100%"}
          leftIcon={<FaComment />}
          colorScheme={"yellow"}
        >
          Continue with Kakao
        </Button>
        <Button
          as={"a"}
          href={`https://nid.naver.com/oauth2.0/authorize?${paramsN}`}
          w={"100%"}
          leftIcon={<FaComment />}
          colorScheme={"green"}
          onClick={naverButtonClick}
        >
          Continue with Naver
        </Button>
      </VStack>
    </Box>
  );
}
