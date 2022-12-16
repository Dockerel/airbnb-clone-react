import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";

export default function GithubConfirm() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { search } = useLocation();
  const mutation = useMutation(githubLogIn, {
    onMutate: () => {
      console.log("start mutate");
    },
    onSuccess: () => {
      toast({
        title: "Welcome!",
        status: "success",
      });
      console.log("mutate finished");
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
    retry: false,
  });

  const confirmLogin = () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      console.log(code);
      mutation.mutate(code);
    }
  };
  useEffect(() => {
    confirmLogin();
  });
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing log in...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size={"lg"} />
    </VStack>
  );
}
