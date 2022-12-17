import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import { getAmenities, getCategories } from "../api";
import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { IAmenity, ICategory } from "../types";

interface IForm {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}

export default function UploadRoom() {
  const { register, watch } = useForm<IForm>();
  console.log(watch());
  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IAmenity[]
  >(["amenities"], getAmenities);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >(["categories"], getCategories);
  return (
    <ProtectedPage>
      <HostOnlyPage>
        <Box
          pb={40}
          mt={10}
          px={{
            base: 10,
            lg: 40,
          }}
        >
          <Container>
            <Heading textAlign={"center"}>Upload Room</Heading>
            <VStack spacing={10} as="form" mt={5}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input {...register("name")} required type="text"></Input>
                <FormHelperText>Write the name of your room.</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input {...register("country")} required type="text"></Input>
              </FormControl>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input {...register("city")} required type="text"></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input {...register("address")} required type="text"></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaDollarSign />} />
                  <Input
                    {...register("price")}
                    required
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Rooms</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaBed />} />
                  <Input
                    {...register("rooms")}
                    required
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Toilets</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaToilet />} />
                  <Input
                    {...register("toilets")}
                    required
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea {...register("description")} />
              </FormControl>
              <FormControl>
                <Checkbox {...register("pet_friendly")}>Pet friendly</Checkbox>
              </FormControl>
              <FormControl>
                <FormLabel>Kind of room</FormLabel>
                <Select {...register("kind")} placeholder="Choose a kind">
                  <option value="entire_place">Entire Place</option>
                  <option value="private_room">Private Room</option>
                  <option value="shared_room">Shared Room</option>
                </Select>
                <FormHelperText>
                  What kind of room are you renting?
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select {...register("category")} placeholder="Choose a kind">
                  {categories?.map((category) => (
                    <option key={category.pk} value={category.pk}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                <FormHelperText>
                  What category describes your room?
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Amenities</FormLabel>
                <Grid templateColumns={"1fr 1fr"} gap={5}>
                  {amenities?.map((amenity) => (
                    <Box key={amenity.pk}>
                      <Checkbox value={amenity.pk} {...register("amenities")}>
                        {amenity.name}
                      </Checkbox>
                      <FormHelperText>{amenity.description}</FormHelperText>
                    </Box>
                  ))}
                </Grid>
              </FormControl>
              <Button colorScheme={"red"} size="lg" w="100%">
                Upload Room
              </Button>
            </VStack>
          </Container>
        </Box>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
