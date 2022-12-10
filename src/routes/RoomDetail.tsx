import { Box, Grid, Heading, Skeleton, Text, HStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom } from "../api";
import { IRoomDetail } from "../types";
import { FaStar, FaShareSquare, FaRegHeart } from "react-icons/fa";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Skeleton
        height={"30px"}
        width={isLoading ? "25%" : "100%"}
        isLoaded={!isLoading}
      >
        <Heading fontSize={25}>{data?.name}</Heading>
      </Skeleton>
      <Skeleton
        height={"20px"}
        width={isLoading ? "15%" : "100%"}
        isLoaded={!isLoading}
      >
        <Grid mt={3}>
          <HStack justifyContent={"space-between"}>
            <HStack>
              <Box fontSize={15} mr={-1}>
                <FaStar />
              </Box>
              <Text fontSize={15} as={"b"}>
                {data?.rating} ∙{" "}
              </Text>
              <Text fontSize={15} as={"u"}>
                {data?.address}
              </Text>
            </HStack>
            <HStack>
              <HStack mr={3}>
                <Box mr={0.5}>
                  <FaShareSquare />
                </Box>
                <Text as={"u"}>Share</Text>
              </HStack>
              <HStack>
                <Box mr={0.5}>
                  <FaRegHeart />
                </Box>
                <Text as={"u"}>Save</Text>
              </HStack>
            </HStack>
          </HStack>
          <HStack></HStack>
        </Grid>
      </Skeleton>
    </Box>
  );
}
