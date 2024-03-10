import React, { useState, useEffect } from "react";
import http from "../configs/http";
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

const CreateExpense = () => {
  const [loading, setLoading] = useState(false);
  const [date, setdate] = useState("");
  const [category, setExpenseCategory] = useState("");
  const [description, setdescription] = useState("");
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState("");

  const employee = localStorage.getItem("userID") || "";
  console.log("employee id", employee);
  //toast configuration
  const toast = useToast();

  const onChangeFile = (e) => {
    console.log(e.target.files[0]);
    setReceipt(e.target.files[0]);
  };

  //handleSubmit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("employee", employee);
    formData.append("date", date);
    formData.append("category", category);
    formData.append("amount", amount);
    formData.append("description", description);
    formData.append("receipt", receipt);

    if (formData) {
      saveNewExpense(formData);
    }
  };

  //save new expense details function
  const saveNewExpense = async (formData) => {
    setLoading(true);
    try {
      const response = await http.post(`/expense/submitexpense`, formData);
      console.log("expense added is", response);
      if (response.status === 200) {
        console.log("success", response);
      }
      toast({
        title: `expense Saved Successfully`,
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
        <Heading>Create New Expense</Heading>
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
                              Expense Category{" "}
                              <span style={{ color: "red" }}>*</span>
                            </FormLabel>

                            <Select
                              color="#322659"
                              _dark={{ color: "white" }}
                              onChange={(e) =>
                                setExpenseCategory(e.target.value)
                              }
                            >
                              <option>Select Expense Type</option>
                              <option value="Travel">Travel</option>
                              <option value="Supplies">Supplies</option>
                              <option value="Other">Other</option>
                            </Select>
                          </Box>
                          <Box w="50%">
                            <FormLabel>
                              Expense Amount
                              <span style={{ color: "red" }}>*</span>
                            </FormLabel>
                            <InputGroup>
                              <Input
                                color="#322659"
                                _dark={{ color: "white" }}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                type="number"
                                placeholder="5000"
                                focusBorderColor="brand.400"
                                rounded="md"
                              />
                            </InputGroup>
                          </Box>
                        </HStack>
                      </div>
                      <div>
                        <HStack>
                          <Box w="50%">
                            <FormLabel>
                              Description{" "}
                              <span style={{ color: "red" }}>*</span>
                            </FormLabel>
                            <Input
                              color="#322659"
                              _dark={{ color: "white" }}
                              onChange={(e) => setdescription(e.target.value)}
                              required
                              type="text"
                              placeholder="Enter description number"
                            />
                          </Box>
                          <Box w="50%">
                            <FormLabel>
                              Date <span style={{ color: "red" }}>*</span>
                            </FormLabel>
                            <Input
                              required
                              color="#322659"
                              _dark={{ color: "white" }}
                              onChange={(e) => setdate(e.target.value)}
                              type="date"
                              placeholder="Select expense date"
                            />
                          </Box>
                        </HStack>
                      </div>
                      <Box w="50%">
                        <FormLabel>
                          Receipt
                          <span style={{ color: "red" }}>*</span>
                        </FormLabel>
                        <Input
                          color="#322659"
                          _dark={{ color: "white" }}
                          onChange={onChangeFile}
                          required
                          type="file"
                        />
                      </Box>
                    </Stack>
                  </Box>
                </GridItem>
              </SimpleGrid>
            </Box>
            {/* -----------------------Expense Information form ends here------------------------------ */}
            <Input
              value={loading ? "Saving Expense..." : "Save Expense"}
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

export default CreateExpense;
