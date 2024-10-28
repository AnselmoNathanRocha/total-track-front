import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context";
import { AreaNotification, Button, Container, IconBtn, NotificationBalloon } from "./styles";
import {
  FaEnvelope,
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";

interface Props {
  isOpen: boolean;
  clickButton: () => void;
  notification?: number;
}

export function MenuDashboard({ isOpen, clickButton, notification }: Props) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/dashboard";
  const isReceivedRequests =
    location.pathname === "/dashboard/received-requests";
  const isSendRequest = location.pathname === "/dashboard/send-request";

  return (
    <Container $isOpen={isOpen}>
      <Button
        onClick={() => {
          clickButton();
          navigate("/");
        }}
      >
        <IconBtn as={FaHome} />
        Inicio
      </Button>
      <Button
        onClick={() => {
          clickButton();
          navigate("/dashboard");
        }}
        data-is-active={isDashboard}
      >
        <IconBtn as={FaUser} />
        Conta
      </Button>
      <Button
        onClick={() => {
          clickButton();
          navigate("/dashboard/received-requests");
        }}
        data-is-active={isReceivedRequests}
      >
        <IconBtn as={FaEnvelope} />
        <AreaNotification>
          Convites

          {notification !== 0 && <NotificationBalloon>{notification}</NotificationBalloon>}
        </AreaNotification>
      </Button>
      <Button
        onClick={() => {
          clickButton();
          navigate("/dashboard/send-request");
        }}
        data-is-active={isSendRequest}
      >
        <IconBtn as={FaUserFriends} />
        Amigos
      </Button>
      <Button
        onClick={() => {
          clickButton();
          logout();
        }}
      >
        <IconBtn as={FaSignOutAlt} />
        Sair
      </Button>
    </Container>
  );
}
