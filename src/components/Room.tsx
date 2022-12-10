import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IRoomProps {
  imageUrl: string;
  rating: number;
  price: number;
  description: string;
  category: string;
  pk: number;
}

export default function Room({
  imageUrl,
  rating,
  price,
  description,
  category,
  pk,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack
        spacing={-0.3}
        alignItems={{
          sm: "center",
          md: "flex-start",
        }}
      >
        <Box position={"relative"} rounded="2xl" overflow={"hidden"} mb={3}>
          <Image minW="260" maxW={"260"} h="240" src={imageUrl} />
          <Button
            variant={"unstyled"}
            position={"absolute"}
            top={0}
            right={0}
            color="white"
          >
            <FaRegHeart size="20px" />
          </Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text as={"b"} noOfLines={1} fontSize="md">
              {description}
            </Text>
            <HStack spacing={1}>
              <FaStar size={15} />
              <Text>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={gray}>
            {category}
          </Text>
        </Box>
        <Text fontSize={"sm"} color={gray}>
          <Text as="b">₩{price}</Text> / 박
        </Text>
      </VStack>
    </Link>
  );
}
