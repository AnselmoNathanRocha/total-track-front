import { useEffect, useState } from "react";
import { Container, ContainerForm, ContainerRequests, Title } from "../../styles/globalStyle";
import { useForceRefresh } from "@/hooks/use-force-refresh";
import { pendingResponseService } from "@/services/pendingResponse";
import { GetRequest } from "@/models/pendingRequest";
import { Card, ButtonContainer, CardHeader, CardBody, ActionButton, CardTitle } from "./styles";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toastService } from "@/services/toast-service";
import { sharedWithService } from "@/services/sharedWithService";

export function ReceivedRequests() {
  const forceRefresh = useForceRefresh();
  const [pendingResponse, setPendingResponse] = useState<GetRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const responseRequests = await pendingResponseService.getResponses("PENDING");
        
        setPendingResponse(responseRequests);
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
      const data = {
        idUserResponse: response.idUserRequest, 
        nameUserResponse: response.nameUserRequest
      }
      await pendingResponseService.update(response.id, 'ACCEPTED');
      await sharedWithService.create(data);

      toastService.success("Pedido aceito com sucesso!");
      forceRefresh();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      if(error.response.status === 409) {
        toastService.error(error.response.data);
      } else {
        toastService.error("Erro ao aceitar pedido.");
      }
    }
  };

  const handleReject = async (response: GetRequest) => {
    try {
      await pendingResponseService.update(response.id, 'REJECTED');

      toastService.success("Pedido rejeitado com sucesso!");
      forceRefresh();
    } catch (error) {
      toastService.error("Erro ao rejeitar pedido.");
      console.error(error);
    }
  };

  return (
    <Container>
      <ContainerForm>
        <Title>Pedidos</Title>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <ContainerRequests $title="Pedidos recebidos">
            {pendingResponse.map((response) => (
              <Card key={response.id}>
                <CardHeader>
                  <CardTitle>{response.nameUserRequest}</CardTitle>
                </CardHeader>
                <CardBody>
                  <ButtonContainer>
                    <ActionButton onClick={() => handleAccept(response)} color="#4CAF50">
                      <FaCheck /> Aceitar
                    </ActionButton>
                    <ActionButton onClick={() => handleReject(response)} color="#F44336">
                      <FaTimes /> Rejeitar
                    </ActionButton>
                  </ButtonContainer>
                </CardBody>
              </Card>
            ))}
          </ContainerRequests>
        )}
      </ContainerForm>
    </Container>
  );
}
