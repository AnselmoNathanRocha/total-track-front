import { useEffect, useState } from "react";
import { FormRoot } from "@/components/Forms/FormRoot";
import { Container, ContainerForm, ContainerRequests } from "@/styles/globalStyle";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddItemInput } from "@/components/AddItemInput";
import { theme } from "@/styles/theme";
import { toastService } from "@/services/toast-service";
import { userService } from "@/services/user";
import { CircleStatus, ContainerItem, DateContainer, DateText, TextContainer, TextItem, StatusIcon } from "./styles";
import { Title } from "@/styles/globalStyle";
import { pendingRequestService } from "@/services/pendingRequest";
import { GetRequest, PostRequest } from "@/models/pendingRequest";
import { useForceRefresh } from "@/hooks/use-force-refresh";
import { formatDate } from "@/utils";
import { requestHistoriesService } from "@/services/requestHistories";
import { ContainerSpinner } from "@/components/Loader/styles";
import { Loader } from "@/components/Loader";
// import { io } from "socket.io-client";

const isEmail = (value: string) => /[a-zA-Z]/.test(value);
const phoneRegex = /^[0-9]{10,11}$/;

const sendRequestSchema = z.object({
  user: z
    .string()
    .min(1, "Digite um email ou telefone válido.")
    .refine(
      (value) =>
        isEmail(value)
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          : phoneRegex.test(value),
      {
        message: "Digite um email ou telefone válido.",
      }
    ),
});

export type SendRequestData = z.infer<typeof sendRequestSchema>;

export function SendRequest() {
  const forceRefresh = useForceRefresh();
  const [loading, setLoading] = useState(false);
  const [pendingRequest, setPendingRequest] = useState<GetRequest[]>();
  const [requestHistories, setRequestHistories] = useState<GetRequest[]>([]);
  const form = useForm<SendRequestData>({
    resolver: zodResolver(sendRequestSchema),
  });
  // const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const responseRequests = await pendingRequestService.get();
        const responseHistories = await requestHistoriesService.get();

        setPendingRequest(responseRequests);
        setRequestHistories(responseHistories);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [forceRefresh]);

  // useEffect(() => {
  //   const newSocket = io("http://localhost:3001", {
  //     withCredentials: true,
  //   });

  //   newSocket.emit("register", 1);
  //   setSocket(newSocket);

  //   newSocket.on("newSentRequest", (data) => {
  //     setPendingRequest((prev) => [...prev, data]);
  //   });

  //   return () => newSocket.disconnect();
  // }, []);

  const handleSubmit = async (data: SendRequestData) => {
    try {
      setLoading(true);

      const responseUser = await userService.getByEmail(data.user);

      const dataRequest: PostRequest = {
        idUserResponse: responseUser.id,
        nameUserResponse: responseUser.name,
      };

      await pendingRequestService.create(dataRequest);
      toastService.success("Pedido feito com sucesso!");
      form.reset();
      forceRefresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toastService.error(error.response?.data?.error || "Erro ao enviar pedido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ContainerForm>
        <Title>Adicionar amigo</Title>

        <FormRoot form={form} onSubmit={form.handleSubmit(handleSubmit, (error) => console.log(error))}>
          <AddItemInput
            name="user"
            label="Usuário"
            placeholder="E-mail ou telefone"
            loading={loading}
            background="transparent"
            borderColor={theme.colors.lavender}
          />
        </FormRoot>

        <ContainerRequests $title="Pedidos pendentes">
          {loading ? (
            <ContainerSpinner>
              <Loader color={theme.colors.crimson} size={30} />
            </ContainerSpinner>
          ) : (
            <>
              {pendingRequest && pendingRequest.map((request) => (
                <ContainerItem key={request.id}>
                  <CircleStatus />
                  <TextContainer>
                    <TextItem>{request.nameUserResponse}</TextItem>
                  </TextContainer>
                  <DateContainer>
                    <DateText>{formatDate(request.createdAt)}</DateText>
                  </DateContainer>
                </ContainerItem>
              ))}
            </>
          )}
        </ContainerRequests>

        <ContainerRequests $title="Histórico de pedidos">
          {loading ? (
            <ContainerSpinner>
              <Loader color={theme.colors.crimson} size={30} />
            </ContainerSpinner>
          ) : (
            <>
              {requestHistories && requestHistories.map((history) => (
                <ContainerItem key={history.id}>
                  <StatusIcon status={history.status} />
                  <TextContainer>
                    <TextItem>{history.nameUserResponse}</TextItem>
                    <TextItem $size="12px" color={theme.colors.mediumSlate}>
                      {history.status === "APPROVED" ? "Aprovado" : "Rejeitado"}
                    </TextItem>
                  </TextContainer>
                  <DateContainer>
                    <DateText>{formatDate(history.createdAt)}</DateText>
                  </DateContainer>
                </ContainerItem>
              ))}
            </>
          )}
        </ContainerRequests>
      </ContainerForm>
    </Container>
  );
}
