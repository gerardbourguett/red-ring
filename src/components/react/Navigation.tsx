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

      {/* Desktop Menu */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map(({ label, href }, index) => (
          <NavbarItem key={`desktop-${index}`}>
            <Link
              color={index === 0 ? "primary" : "foreground"}
              href={href}
              size="lg"
            >
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

      {/* Mobile Menu */}
      <NavbarMenu>
        {menuItems.map(({ label, href }, index) => (
          <NavbarMenuItem key={`mobile-${index}`}>
            <Link
              className="w-full"
              color={index === 0 ? "primary" : "foreground"}
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
