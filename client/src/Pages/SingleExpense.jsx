import React, { useState, useEffect } from "react";
import http from "../configs/http";
import Sidebar from "../Components/Sidebar";
import {
  Box,
  Flex,
  chakra,
  Icon,
  Stack,
  Text,
  Spacer,
  Avatar,
  VStack,
  useToast,
  Heading,
  Container,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaAddressBook, FaEnvelope, FaEdit, FaTrash } from "react-icons/fa";

const SingleExpense = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);
  const [expenseDetails, setexpenseDetails] = useState([]);
  const toast = useToast();
  //local storage imports
  const isAuth = localStorage.getItem("isAuth");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  const id = useParams();
  console.log("id is => > >", id);
  const userID = localStorage.getItem("userID");
  const getSingleExpenseDetails = async () => {
    try {
      const response = await http.get(`/expense/getexpensebyid/${id?.id}`);
      console.log("expense Details are =>", response);
      if (response.status == 200) {
        setexpenseDetails(response.data?.[0]);
        // console.log("success");
      }
    } catch (err) {
      console.log(err);
    }
  };
  //console.log("expenseDetails are - - - -->", expenseDetails);
  const paymentDate = expenseDetails?.payment?.date;
  const dateObject = new Date(paymentDate);

  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const handleDeleteConfirmation = async () => {
    try {
      setIsDeleting(true);
      const response = await http.delete(`/expense/deleteexpense/${id?.id}`);
      console.log("expense deleted", response);
      if (response.status == 200) {
        console.log("success");
        toast({
          title: `Deleted Successfully`,
          status: "success",
          isClosable: true,
        });
        navigate("/allexpenses");
      }
      setIsDeleting(false);
    } catch (err) {
      console.log(err);
      toast({
        title: `Failed to Delete`,
        status: "error",
        isClosable: true,
      });
      setIsDeleting(false);
    }
    onClose(); // Close the modal
  };
  useEffect(() => {
    getSingleExpenseDetails();
  }, []);
  return (
    <Box bg="#EBF5FB">
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
        <Box>
          <Flex align="center" justify="center" direction="column">
            <Container
              maxW="3xl"
              bg="#CEE6F2"
              rounded="lg"
              _dark={{
                bg: "#111c44",
              }}
              shadow="md"
              p={8}
              width="full"
            >
              <VStack align="start" spacing={6}>
                {/* Flex container for EXPENSE name and icons */}
                <Flex align="center" justify="space-between" width="full">
                  {/* Box for EXPENSE name */}
                  <Box>
                    <Text fontSize="md" textAlign={"center"}>
                      {" "}
                      Employee ID :{" "}
                      <span style={{ fontWeight: "bold", textAlign: "center" }}>
                        {" "}
                        {expenseDetails?.employee}
                      </span>
                    </Text>
                  </Box>

                  {/* Box for edit and delete icons */}

                  <Box>
                    <Stack direction="row" spacing={4} align="center">
                      <Link to={`/editexpense/${id?.id}`}>
                        {" "}
                        {/* Edit Icon */}
                        <IconButton
                          icon={<FaEdit />}
                          variant="outline"
                          colorScheme="yellow"
                        />
                      </Link>

                      {/* Delete Icon */}
                      <IconButton
                        onClick={onOpen} // Open the delete confirmation modal
                        icon={<FaTrash />}
                        variant="outline"
                        colorScheme="red"
                      />
                    </Stack>
                  </Box>
                </Flex>
                {/* Delete Confirmation Modal */}
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Delete Confirmation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      Are you sure you want to delete this EXPENSE?
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        colorScheme="red"
                        mr={3}
                        onClick={handleDeleteConfirmation}
                        isLoading={isDeleting}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={onClose}
                        isDisabled={isDeleting}
                      >
                        Cancel
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </VStack>
            </Container>
          </Flex>
          <Flex align="center" justify="center" direction="column">
            <Container
              maxW="3xl"
              bg="#F1F1F2"
              rounded="lg"
              _dark={{
                bg: "#111c44",
              }}
              shadow="md"
              p={8}
              width="full"
            >
              <VStack align="start" spacing={6}>
                {/* expense DETAILS */}
                <Flex
                  direction={{ base: "column", md: "row" }}
                  align="start"
                  justify={{ base: "start", md: "space-between" }}
                  w="full"
                >
                  <Box mb={{ base: 4, md: 0 }}>
                    {" "}
                    <Text fontSize="md" fontWeight="small">
                      Amount
                    </Text>
                    <Text color="gray.800" fontWeight="medium">
                      {" "}
                      {expenseDetails?.amount}{" "}
                    </Text>
                  </Box>
                  <Box>
                    {" "}
                    <Text fontSize="md" fontWeight="small">
                      Expense Category
                    </Text>
                    <Text color="gray.800" fontWeight="medium">
                      {expenseDetails?.category}
                    </Text>
                  </Box>
                </Flex>
                ;
              </VStack>
            </Container>
          </Flex>
          <Flex align="center" justify="center" direction="column">
            <Container
              maxW="3xl"
              bg="#F1F1F2"
              rounded="lg"
              _dark={{
                bg: "#111c44",
              }}
              shadow="md"
              p={8}
              width="full"
            >
              <VStack align="start" spacing={6}>
                {/* expense DETAILS */}
                <Flex
                  direction={{ base: "column", md: "row" }}
                  align="start"
                  justify={{ base: "start", md: "space-between" }}
                  w="full"
                >
                  <Box mb={{ base: 4, md: 0 }}>
                    {" "}
                    <Text fontSize="md" fontWeight="small">
                      Status
                    </Text>
                    <Text color="gray.800" fontWeight="medium">
                      {" "}
                      {expenseDetails?.status}{" "}
                    </Text>
                  </Box>
                  <Box>
                    {" "}
                    <Text fontSize="md" fontWeight="small">
                      Description
                    </Text>
                    <Text color="gray.800" fontWeight="medium">
                      {expenseDetails?.description}
                    </Text>
                  </Box>
                </Flex>
                ;
              </VStack>
            </Container>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleExpense;
