// ReceivedRequests.tsx
import { useEffect, useState, useRef } from "react";
import {
  Container,
  ContainerForm,
  ContainerRequests,
  Title
} from "../../styles/globalStyle";
import { useForceRefresh } from "@/hooks/use-force-refresh";
import { pendingResponseService } from "@/services/pendingResponse";
import { GetRequest } from "@/models/pendingRequest";
import {
  Card,
  CardHeader,
  CardTitle,
  OptionsMenu,
  RemoveFriendButton,
  EllipsisIconButton,
  CardBody,
  ButtonContainer,
  ActionButton,
  CardContent
} from "./styles";
import { FaCheck, FaEllipsisV, FaTimes } from "react-icons/fa";
import { toastService } from "@/services/toast-service";
import { Loader } from "@/components/Loader";
import { theme } from "@/styles/theme";
import { ContainerSpinner } from "@/components/Loader/styles";
import { sharedWithService } from "@/services/sharedWithService";
import { GetSharedWith } from "@/models/sharedWith";
import { DateText } from "../SendRequest/styles";
import { formatDate } from "@/utils";

export function ReceivedRequests() {
  const forceRefresh = useForceRefresh();
  const [pendingResponse, setPendingResponse] = useState<GetRequest[]>([]);
  const [friends, setFriends] = useState<GetSharedWith[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showOptions, setShowOptions] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const responseRequests = await pendingResponseService.get();
        const responseFriends = await sharedWithService.get();

        setPendingResponse(responseRequests);
        setFriends(responseFriends);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [forceRefresh]);

  const handleAccept = async (response: GetRequest) => {
    try {
      await pendingResponseService.update(response.id, "APPROVED");

      toastService.success("Pedido aceito com sucesso!");
      forceRefresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toastService.error(
        error.response?.status === 409
          ? error.response.data
          : "Erro ao aceitar pedido."
      );
    }
  };

  const handleReject = async (response: GetRequest) => {
    try {
      await pendingResponseService.update(response.id, "REJECTED");

      toastService.success("Pedido rejeitado com sucesso!");
      forceRefresh();
    } catch (error) {
      toastService.error("Erro ao rejeitar pedido.");
      console.error(error);
    }
  };

  const handleRemoveFriend = async (friendId: number) => {
    try {
      // await sharedWithService.remove(friendId);
      console.log("Removendo o amigo de ID: ", friendId);
      toastService.success("Amigo removido com sucesso!");
      forceRefresh();
      setShowOptions(null);
    } catch (error) {
      toastService.error("Erro ao remover amigo.");
      console.error(error);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowOptions(null);
    }
  };

  useEffect(() => {
    if (showOptions !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  return (
    <Container>
      <ContainerForm>
        <Title>Pedidos</Title>

        <ContainerRequests $title="Pedidos recebidos">
          {loading ? (
            <ContainerSpinner>
              <Loader color={theme.colors.crimson} size={30} />
            </ContainerSpinner>
          ) : (
            <>
              {pendingResponse.map((response) => (
                <Card key={response.id}>
                  <CardHeader>
                    <CardTitle>{response.nameUserRequest}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <ButtonContainer>
                      <ActionButton
                        onClick={() => handleAccept(response)}
                        color="#4CAF50"
                      >
                        <FaCheck /> Aceitar
                      </ActionButton>
                      <ActionButton
                        onClick={() => handleReject(response)}
                        color="#F44336"
                      >
                        <FaTimes /> Rejeitar
                      </ActionButton>
                    </ButtonContainer>
                  </CardBody>
                </Card>
              ))}
            </>
          )}
        </ContainerRequests>

        <ContainerRequests $title="Amigos">
          {loading ? (
            <ContainerSpinner>
              <Loader color={theme.colors.crimson} size={30} />
            </ContainerSpinner>
          ) : (
            <>
              {friends.map((friend) => (
                <Card key={friend.id}>
                  <CardContent>
                    <CardHeader>
                      <CardTitle>{friend.nameUserRequest}</CardTitle>

                      <EllipsisIconButton
                        onClick={() =>
                          setShowOptions(showOptions === friend.id ? null : friend.id)
                        }
                      >
                        <FaEllipsisV />
                      </EllipsisIconButton>
                    </CardHeader>

                    <DateText>{formatDate(friend.createdAt)}</DateText>

                    {showOptions === friend.id && (
                      <OptionsMenu
                        ref={menuRef}
                        onMouseLeave={() => setShowOptions(null)}
                      >
                        <RemoveFriendButton
                          onClick={() => handleRemoveFriend(friend.id)}
                        >
                          Remover
                        </RemoveFriendButton>
                      </OptionsMenu>
                    )}
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </ContainerRequests>
      </ContainerForm>
    </Container>
  );
}
