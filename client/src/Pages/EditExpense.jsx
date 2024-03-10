import React, { useState, useEffect } from "react";
import http from "../configs/http";
import { useParams } from "react-router-dom";
// Chakra imports
import {
  Box,
  Heading,
  SimpleGrid,
  GridItem,
  Stack,
  useToast,
  chakra,
  FormControl,
  HStack,
  Divider,
  RadioGroup,
  Input,
  FormLabel,
  Text,
  InputGroup,
  List,
  ListItem,
  Select,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";

const EditExpense = () => {
  const [loading, setLoading] = useState(false);

  const [status, setExpenseStatus] = useState("");
  const [description, setdescription] = useState("");

  const employee = localStorage.getItem("userID") || "";
  console.log("employee id", employee);
  //toast configuration
  const toast = useToast();
  const id = useParams();

  //handleSubmit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      status,
    };
    if (payload) {
      updateExpense(payload);
    }
  };

  //save new expense details function
  const updateExpense = async (payload) => {
    setLoading(true);
    try {
      const response = await http.put(
        `/expense/updateexpense/${id?.id}`,
        payload
      );
      console.log("expense updated is", response);
      if (response.status === 200) {
        console.log("success", response);
      }
      toast({
        title: `expense updated Successfully`,
        status: "success",
        isClosable: true,
      });
      setLoading(false);
    } catch (err) {
      toast({
        title: `Error Saving expense`,
        status: "error",
        isClosable: true,
      });
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* ------------------------------------------ SIDEBAR DIV ------------------------------------------ */}
      <Box>
        {" "}
        <Sidebar />
      </Box>
      {/* --------------------------------------MAIN CONTENT GOES HERE------------------------------------- */}
      <Box
        ml={{
          base: 0,
          md: 60,
        }}
        as="main"
        p="4"
        borderWidth="4px"
      >
        <Heading>Update Expense Status</Heading>
        {/* ----------------------------FORM UI STARTS HERE----------------------- */}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Box pt={4}>
            {/* -----------------------Expense Information form starts here------------------------------ */}
            <Box bg="#add8e6" p={4} rounded={4}>
              <SimpleGrid
                display={{
                  base: "initial",
                  md: "grid",
                }}
                columns={{
                  md: 3,
                }}
                spacing={{
                  md: 6,
                }}
              >
                <GridItem
                  colSpan={{
                    md: 1,
                  }}
                >
                  <Box px={[4, 1]}>
                    <Heading fontSize="2xl" fontWeight="lg" lineHeight="6">
                      Expense Information
                    </Heading>
                    <Text mt={1} fontSize="sm">
                      Provide expense details
                    </Text>
                  </Box>
                </GridItem>
                <GridItem
                  mt={{ base: "10px", md: "10px", xl: "0px" }}
                  colSpan={{
                    md: 2,
                  }}
                >
                  <Box
                    shadow="base"
                    rounded={[null, "md"]}
                    overflow={{
                      sm: "hidden",
                    }}
                  >
                    <Stack
                      px={4}
                      py={5}
                      bg="#FDFEFE"
                      _dark={{
                        bg: "#2D3748",
                      }}
                      spacing={6}
                      p={{
                        sm: 6,
                      }}
                    >
                      <div>
                        <HStack>
                          {" "}
                          <Box w="50%">
                            <FormLabel>
                              Expense status{" "}
                              <span style={{ color: "red" }}>*</span>
                            </FormLabel>

                            <Select
                              color="#322659"
                              _dark={{ color: "white" }}
                              onChange={(e) => setExpenseStatus(e.target.value)}
                            >
                              <option>Update Expense Status</option>

                              <option value="Approved">Approved</option>
                              <option value="Rejected">Rejected</option>
                            </Select>
                          </Box>
                        </HStack>
                      </div>
                    </Stack>
                  </Box>
                </GridItem>
              </SimpleGrid>
            </Box>
            {/* -----------------------Expense Information form ends here------------------------------ */}
            <Input
              value={loading ? "Update Expense..." : "Update Expense"}
              mt="4"
              h="3rem"
              bg="#58D68D"
              _hover={{ bg: "#3498DB", cursor: "pointer" }}
              type="submit"
            />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default EditExpense;
