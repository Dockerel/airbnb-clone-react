import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function MyBookings() {
  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 80,
      }}
    >
      <Text display={"block"} mb={8} as={"b"} fontSize={40}>
        My Bookings
      </Text>
      <Box mb={4}>
        <Text as={"b"}>총 1건</Text>
      </Box>
      <Grid
        templateColumns={"5fr 2fr 2fr 2fr 2fr 2fr"}
        gap={3}
        w={"100%"}
        bgColor="gray.200"
        alignItems={"center"}
        justifyItems="center"
        borderTop={"1px solid gray"}
        borderBottom={"1px solid rgb(190,190,190)"}
        py={4}
        mb={2}
      >
        <GridItem as={"b"}>Room Name</GridItem>
        <GridItem as={"b"}>Price</GridItem>
        <GridItem as={"b"}>Guests</GridItem>
        <GridItem as={"b"}>Check In</GridItem>
        <GridItem as={"b"}>Check Out</GridItem>
        <GridItem as={"b"}>Available</GridItem>
      </Grid>
      <Grid
        templateColumns={"5fr 2fr 2fr 2fr 2fr 2fr"}
        gap={3}
        w={"100%"}
        bgColor="white.200"
        alignItems={"center"}
        justifyItems="center"
        borderTop={"1px solid rgb(190,190,190)"}
        borderBottom={"1px solid rgb(190,190,190)"}
        py={3}
        mb={1}
      >
        <GridItem fontWeight={"400"} noOfLines={1}>
          <Link to={"/"}>
            <Text noOfLines={1} _hover={{ color: "red.500" }}>
              [떼구루루 스테이] #황리단길 메인 # 첨성대 # 대릉원 # 안압지
              [떼구루루 스테이] #황리단길 메인 # 첨성대 # 대릉원 # 안압지
            </Text>
          </Link>
        </GridItem>
        <GridItem fontWeight={"400"}>₩130000 / 박</GridItem>
        <GridItem fontWeight={"400"}>5명</GridItem>
        <GridItem fontWeight={"400"}>2022-12-27</GridItem>
        <GridItem fontWeight={"400"}>2022-12-29</GridItem>
        <GridItem
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          color={"red.500"}
          fontWeight={"400"}
        >
          <Text>Available</Text>
          <Button mt={2}>Cancel</Button>
        </GridItem>
      </Grid>
    </Box>
  );
}
