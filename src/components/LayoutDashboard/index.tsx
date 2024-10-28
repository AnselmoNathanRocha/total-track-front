import { Outlet } from "react-router-dom";
import { MenuDashboard } from "./MenuDashboard";
import { Container } from "./styles";
import { useEffect, useState } from "react";
import { HamburgerButton } from "./HamburgerButton";
import { pendingResponseService } from "@/services/pendingResponse";
import { GetRequest } from "@/models/pendingRequest";

export function LayoutDashboard() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [responses, serResponses] = useState<GetRequest[]>();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await pendingResponseService.getResponses("PENDING");

        serResponses(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetch();
  }, []);

  return (
    <Container>
      <HamburgerButton
        onClick={() => setMenuOpen(!menuOpen)}
        isOpen={menuOpen}
      />

      <MenuDashboard isOpen={menuOpen} clickButton={() => setMenuOpen(false)} notification={responses && responses.length} />
      <Outlet />
    </Container>
  );
}
