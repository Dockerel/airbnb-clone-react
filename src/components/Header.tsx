import {
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import LoginModal from "./Loginmodal";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import SignUpModal from "./SignUpModal";
import { Link, useLocation } from "react-router-dom";
import useUser from "../lib/useUser";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
  const location = useLocation().pathname;
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: OnLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: OnSignUpOpen,
  } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("red.500", "red.200");
  const Icon = useColorModeValue(FaMoon, FaSun);
  return (
    <Stack
      justifyContent={"space-between"}
      py={5}
      px={location === "/" ? 40 : 80}
      alignItems="center"
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 4,
        md: 0,
      }}
      borderBottomWidth={1}
    >
      <Link to={"/"}>
        <Box color={logoColor}>
          <FaAirbnb size={"48"} />
        </Box>
      </Link>
      <HStack>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={OnLoginOpen}>Log in</Button>
              <LightMode>
                <Button onClick={OnSignUpOpen} colorScheme={"red"}>
                  Sign up
                </Button>
              </LightMode>
            </>
          ) : (
            <Avatar name={user?.name} size={"md"} src={user?.avatar} />
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
