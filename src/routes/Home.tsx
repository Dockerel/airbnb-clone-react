import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";
import Room from "../components/Room";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4,1fr)",
      }}
    >
      <Box>
        <Skeleton height={240} rounded="2xl" mb={6} />
        <SkeletonText w={"70%"} noOfLines={2} mb={3} />
        <SkeletonText w={"50%"} noOfLines={1} />
      </Box>
      <Room />
    </Grid>
  );
}
