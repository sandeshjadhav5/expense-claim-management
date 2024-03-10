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
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AllExpenses = () => {
  const [customerRecords, setCustomerRecords] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const role = localStorage.getItem("role");

  const userId = localStorage.getItem("userID") || "";

  const getUserExpenses = async () => {
    try {
      const response = await http.get(
        `/expense/getallexpensesbyemployee/${userId}`
      );
      console.log("list of expenses is", response);
      if (response.status === 200) {
        setCustomerRecords(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllExpenses = async () => {
    try {
      const response = await http.get(`/expense/getallexpenses`);
      console.log("list of expenses is", response);
      if (response.status === 200) {
        setCustomerRecords(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function to format the date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format the date into desired format (e.g., dd/mm/yyyy)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  useEffect(() => {
    if (role == "Manager") {
      getAllExpenses();
    } else {
      getUserExpenses();
    }
  }, []);

  return (
    <Box>
      <Sidebar />
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
                fontSize={24}
                letterSpacing={2}
                textAlign="center"
                fontWeight="bold"
                color="#A569BD"
                mb="4"
              >
                All Expenses List
              </Text>

              <TableContainer mt="4">
                <Table variant="striped" colorScheme="red">
                  <TableCaption>All Expenses List</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>No.</Th>
                      {role == "Manager" && <Th>Employee ID</Th>}
                      <Th>Category</Th>
                      <Th>Amount</Th>
                      <Th>Status</Th>
                      <Th>Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {customerRecords &&
                      customerRecords.map((record, index) => (
                        <Tr
                          key={record._id}
                          _hover={{ color: "red", fontWeight: "semibold" }}
                        >
                          <Td>{index + 1}</Td>
                          {role == "Manager" && (
                            <Td>
                              {" "}
                              <Link to={`/allexpenses/${record.employee}`}>
                                {record.employee}
                              </Link>
                            </Td>
                          )}
                          <Td>{record.category}</Td>
                          <Td>{record.amount}</Td>
                          <Td>{record.status}</Td>
                          <Td>{formatDate(record.date)}</Td>{" "}
                        </Tr>
                      ))}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>Total Expenses={customerRecords?.length}</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AllExpenses;
