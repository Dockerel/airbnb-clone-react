import {
  Box,
  Grid,
  Heading,
  Skeleton,
  Text,
  HStack,
  Image,
  GridItem,
  VStack,
  Avatar,
  Container,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { checkBooking, getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import { FaStar, FaShareSquare, FaRegHeart } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const { data: reviewsData, isLoading: IsReviewsLoading } = useQuery<
    IReview[]
  >([`rooms`, roomPk, `reviews`], getRoomReviews);
  const [dates, setDates] = useState<Date[]>();
  const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery(
    ["check", roomPk, dates],
    checkBooking,
    {
      cacheTime: 0,
      enabled: dates !== undefined,
    }
  );
  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 80,
      }}
    >
      <Helmet>
        <title>{data ? data.name : "Loading..."}</title>
      </Helmet>
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
      <Grid
        mt={8}
        rounded="xl"
        overflow={"hidden "}
        gap={3}
        height={"60vh"}
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              {data?.photos[index] &&
              data?.photos &&
              data?.photos.length > 0 ? (
                <Image
                  objectFit={"cover"}
                  w="100%"
                  h={"100%"}
                  src={data?.photos[index].file}
                />
              ) : (
                <Box
                  backgroundColor={"gray.400"}
                  w="100%"
                  h={"100%"}
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <Text fontSize={"20px"} as={"b"} color={"white"}>
                    No Image
                  </Text>
                </Box>
              )}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid templateColumns={"2fr 1fr"} gap={10} maxW="container.lg">
        <Box>
          <HStack w={"100%"} mt={10} justifyContent="space-between">
            <VStack alignItems={"flex-start"}>
              <Skeleton isLoaded={!isLoading} h={"30px"}>
                <Heading fontSize={"2xl"}>
                  House hosted by {data?.owner.name}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} h={"20px"}>
                <HStack justifyContent={"flex-start"} w="100%">
                  <Text>
                    {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
                  </Text>
                  <Text>•</Text>
                  <Text>
                    {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Skeleton>
            </VStack>
            {isLoading ? (
              <></>
            ) : (
              <Avatar
                name={data?.owner.name}
                size={"xl"}
                src={data?.owner.avatar}
              />
            )}
          </HStack>
          {isLoading ? (
            <></>
          ) : (
            <Box mt={10} pb={200}>
              <Heading mb={5} fontSize={"2xl"}>
                <HStack>
                  <FaStar />
                  <Text>{data?.rating.toFixed(1)}</Text>
                  <Text>•</Text>
                  <Text>
                    {reviewsData?.length} review
                    {reviewsData?.length === 1 ? "" : "s"}
                  </Text>
                </HStack>
              </Heading>
              <Container mt={16} maxW={"container.lg"} mx={"none"}>
                <Grid gap={10} templateColumns={"1fr 1fr"}>
                  {reviewsData?.map((review, index) => (
                    <VStack alignItems={"flex-start"} key={index}>
                      <HStack>
                        <Avatar
                          name={review.user.name}
                          src={review.user.avatar}
                          size={"md"}
                        />
                        <VStack spacing={0} alignItems={"flex-start"}>
                          <Heading fontSize={"md"}>{review.user.name}</Heading>
                          <HStack spacing={1}>
                            <FaStar size={"12px"} />
                            <Text>{review.rating}</Text>
                          </HStack>
                        </VStack>
                      </HStack>
                      <Text>{review.payload}</Text>
                    </VStack>
                  ))}
                </Grid>
              </Container>
            </Box>
          )}
        </Box>
        <Box pt={10}>
          <Calendar
            onChange={setDates}
            prev2Label={null}
            next2Label={null}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 3 * 4 * 7 * 24 * 60 * 60 * 1000)}
            minDetail="month"
            selectRange
          />
          <Button
            disabled={!checkBookingData?.ok}
            isLoading={isCheckingBooking}
            mt={5}
            mb={3}
            w="100%"
            colorScheme={"red"}
          >
            Make booking
          </Button>
          {!checkBookingData?.ok && !isCheckingBooking ? (
            <Text color={"red.500"}>Can't book on those dates, sorry.</Text>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
}
