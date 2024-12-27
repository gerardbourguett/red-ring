import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Image,
} from "@nextui-org/react";
import React, { useState } from "react";
import ModeToggle from "./ModeToggle";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "#RoadTo2025", href: "/live" },
    { label: "LiveStreams", href: "/watch" },
    { label: "#Chao2024", href: "/chao2024" },
  ];

  return (
    <Navbar
      isBordered
      onMenuOpenChange={setIsMenuOpen}
      className="bg-transparent"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link color="foreground" href="/">
            <Image alt="logo" src="/brand.svg" width={128} />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map(({ label, href }, index) => (
          <NavbarItem key={index} isActive={index === 0}>
            <Link color="foreground" href={href}>
              {label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ModeToggle />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map(({ label, href }, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="w-full"
              color={index === 2 ? "primary" : "foreground"}
              href={href}
              size="lg"
            >
              {label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Navigation;
