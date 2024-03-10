import { Button, Image, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  useColorModeValue,
  Flex,
  Icon,
  Box,
  Text,
  Input,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  InputGroup,
  InputLeftElement,
  Avatar,
} from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/react";

import { MdHome, MdCreate } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { FaClipboardCheck, FaBell } from "react-icons/fa";
import { FiSearch, FiMenu } from "react-icons/fi";

const Sidebar = () => {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");

  const role = localStorage.getItem("role");

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{
          color: "gray.400",
        }}
        _hover={{
          bg: "gray.100",
          _dark: {
            bg: "gray.900",
          },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="#EDF4F2"
      _dark={{
        bg: "gray.800",
      }}
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Text
          fontSize="md"
          ml="2"
          color="brand.500"
          _dark={{
            color: "white",
          }}
          textTransform="uppercase"
          fontWeight="semibold"
        >
          EXPENSE CLAIM MANAGEMENT
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        {role == "Manager" && (
          <NavItem icon={MdHome}>
            <Link to="/dashboard">Home</Link>
          </NavItem>
        )}
        <NavItem icon={FaClipboardCheck}>
          {" "}
          <Link to="/allexpenses">Expenses</Link>
        </NavItem>

        {role == "Employee" && (
          <NavItem icon={MdHome}>
            <Link to="/createnewexpense">Create</Link>
          </NavItem>
        )}
        <NavItem onClick={handleLogout} icon={IoLogOut}>
          Logout
        </NavItem>
      </Flex>
    </Box>
  );
  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("access_token");

    // Redirect to the login page
    window.location.href = "/";
  };
  return (
    <Box
      as="section"
      bg="gray.50"
      _dark={{
        bg: "gray.700",
      }}
    >
      <SidebarContent
        display={{
          base: "none",
          md: "unset",
        }}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{
          base: 0,
          md: 60,
        }}
        transition=".3s ease"
      >
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          borderBottomWidth="1px"
          color="inherit"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />

          <Text>Expense Claim Management</Text>

          <Flex align="center">
            <Avatar
              ml="4"
              size="sm"
              name="anubra266"
              src="https://plus.unsplash.com/premium_photo-1661270407419-5ea7b129a42c?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              cursor="pointer"
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Sidebar;
