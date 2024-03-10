import React, { useEffect, useState } from "react";
import http from "../configs/http";
import axios from "axios";
import Sidebar from "../Components/Sidebar";

import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Grid,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  useColorModeValue,
  Center,
  Stack,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { format } from "date-fns";

const AdminDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const fetchData = async () => {
    try {
      const response = await http.get(`/expense/getallexpenses`);
      if (response.status === 200) {
        const data = response.data;
        setExpenses(response.data);
        console.log("res.data", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <Box pt={{ base: "20px", md: "20px", xl: "20px" }}>
          <Box>
            <Box>
              <Text
                textTransform="uppercase"
                fontSize={32}
                letterSpacing={2}
                textAlign="center"
                fontWeight="bold"
                color="#A569BD"
                mb="4"
              >
                Admin Dashboard
              </Text>
              <Box bg="#FAF5FF" m="6" p="4" boxShadow={"xl"} rounded={"md"}>
                <Flex>
                  <Box m="auto">
                    {" "}
                    <Text
                      m="auto"
                      fontSize={20}
                      letterSpacing={2}
                      textAlign="center"
                      fontWeight="semibold"
                      color="#553C9A"
                    >
                      Total Number of expenses
                    </Text>
                  </Box>
                  <Box m="auto">
                    <Text
                      m="auto"
                      textAlign="center"
                      fontSize={32}
                      letterSpacing={2}
                      fontWeight="bold"
                      color="#3182CE"
                    >
                      {expenses && expenses.length}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Card = ({ title, value }) => (
  <Center py={6}>
    <Box
      maxW={"330px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"xl"}
      rounded={"md"}
      overflow={"hidden"}
    >
      <Stack
        textAlign={"center"}
        p={6}
        color={useColorModeValue("gray.800", "white")}
        align={"center"}
      >
        <Text
          fontSize={"sm"}
          fontWeight={600}
          bg={useColorModeValue("green.50", "green.900")}
          p={2}
          px={3}
          color={"green.500"}
          rounded={"full"}
        >
          {title}
        </Text>
        <Stack direction={"row"} align={"center"} justify={"center"}>
          <Text fontSize={"6xl"} fontWeight={800}>
            {value}
          </Text>
        </Stack>
      </Stack>

      <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.400" />
            {title} :- {value}
          </ListItem>
        </List>
      </Box>
    </Box>
  </Center>
);

export default AdminDashboard;
