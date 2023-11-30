import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  // Link,
} from "@nextui-org/react";
import { userStore } from "../state/userStore";
import { Models } from "appwrite";
import Logout from "./Logout";
import { Link } from "react-router-dom";

export default function AppNavbar() {
  const user = userStore(
    (state) => state.user
  ) as Models.User<Models.Preferences>;
  return (
    <Navbar>
      <NavbarBrand>
        <Link to="/">
          <p className="font-bold text-inherit">Chit Chat</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <h1 className="text-black"> {user.name}</h1>
        </NavbarItem>
        <NavbarItem>
          <Logout />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
