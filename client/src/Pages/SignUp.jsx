import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from "../configs/http";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  Image,
  useBreakpointValue,
  IconProps,
  Icon,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
    const payload = { name, email, password, role: "Employee" };
    if (payload) {
      setLoading(true);
      signUpRequestFunction(payload);
    }
  };

  //login request function
  const signUpRequestFunction = async (payload) => {
    try {
      setLoading(true);
      const response = await http.post("/users/register", payload);

      if (response.status === 200) {
        if (response.data) {
          toast.success("Registration Successfull", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/");
          }, 4000);
        }
      } else if (response.status === 401) {
        // Unauthorized error
        toast.error("Error Sigining up", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("isAuth", false);
      } else {
        localStorage.setItem("isAuth", false);
      }
      setLoading(false);
    } catch (err) {
      // Handle timeout error
      console.error("Request timed out:", err);
      toast.error("Error in Registration", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      localStorage.setItem("isAuth", false);
      localStorage.setItem("role", "null");
    } finally {
      setLoading(false);
    }
  };

  //local storage imports
  const isAuth = localStorage.getItem("isAuth");
  //useeffect hook
  useEffect(() => {
    if (isAuth === "true") {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 20 }}
        py={{ base: 10, sm: 20, lg: 20 }}
      >
        <Stack spacing={{ base: 10, md: 20 }} mt="28" position={"relative"}>
          <Heading
            lineHeight={1.2}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "7xl" }}
          >
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.500,pink.500)"
              bgClip="text"
            >
              EXPENSE
            </Text>
            <br />
            CLAIM SYSTEM
          </Heading>
        </Stack>
        <Stack
          bg={"gray.100"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Sign Up
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Enter your Details to Register with us
            </Text>
          </Stack>
          <Box onSubmit={handleSubmit} as={"form"} mt={4}>
            <Stack spacing={4}>
              <Text
                textAlign="left"
                color={"gray.700"}
                fontSize={{ base: "sm", sm: "lg" }}
                fontWeight="semibold"
              >
                Name
              </Text>
              <Input
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your Name"
                bg={"gray.200"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Text
                textAlign="left"
                color={"gray.700"}
                fontSize={{ base: "sm", sm: "lg" }}
                fontWeight="semibold"
              >
                Enter Your Email id
              </Text>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email id"
                bg={"gray.200"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Text
                textAlign="left"
                color={"gray.700"}
                fontSize={{ base: "sm", sm: "lg" }}
                fontWeight="semibold"
              >
                Enter Your Password
              </Text>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                bg={"gray.200"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
            </Stack>
            <Input
              value={loading ? "Signing Up..." : "Sign up"}
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.500,pink.500)",
                boxShadow: "xl",
                cursor: "pointer",
              }}
              type="submit"
            />
            <Text mt="4" color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              @ Expense Claim Management
            </Text>
            <Text mt="4" color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Already have an Account ? <Link to="/">Sign in</Link>
            </Text>
          </Box>
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />{" "}
      <ToastContainer />
    </Box>
  );
}
