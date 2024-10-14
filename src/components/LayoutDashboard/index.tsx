import { Outlet } from "react-router-dom";
import { MenuDashboard } from "./MenuDashboard";
import { Container } from "./styles";
import { useState } from "react";
import { HamburgerButton } from "./HamburgerButton";

export function LayoutDashboard() {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <Container>
      <HamburgerButton
        onClick={() => setMenuOpen(!menuOpen)}
        isOpen={menuOpen}
      />

      <MenuDashboard isOpen={menuOpen} clickButton={() => setMenuOpen(false)} />
      <Outlet />
    </Container>
  );
}
