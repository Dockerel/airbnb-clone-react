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
  // const mutation = useMutation(githubLogIn, {
  //   onMutate: () => {
  //     console.log("start mutate");
  //   },
  //   onSuccess: () => {
  //     toast({
  //       title: "Welcome!",
  //       status: "success",
  //     });
  //     queryClient.refetchQueries(["me"]);
  //     navigate("/");
  //   },
  // });

  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      // mutation.mutate(code);
      const status = await githubLogIn(code);
      if (status === 200) {
        toast({
          title: "Welcome!",
          status: "success",
        });
        queryClient.refetchQueries(["me"]);
        navigate("/");
      }
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
