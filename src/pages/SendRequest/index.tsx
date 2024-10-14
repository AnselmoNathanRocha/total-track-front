import { useEffect, useState } from "react";
import { FormRoot } from "@/components/Forms/FormRoot";
import { Container } from "../../styles/globalStyle";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddItemInput } from "@/components/AddItemInput";
import { theme } from "@/styles/theme";
import { toastService } from "@/services/toast-service";
import { userService } from "@/services/user";
import { ContainerForm, ContainerRequests } from "./styles";
import { Title } from "@/styles/globalStyle";
import { pendingRequestService } from "@/services/pendingRequest";
import { GetRequest, PostRequest } from "@/models/pendingRequest";
import { useAuth } from "@/context";

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
  const [loading, setLoading] = useState(false);
  const [pendingRequest, setPendingRequest] = useState<GetRequest[]>();
  const { idUser } = useAuth();
  const form = useForm<SendRequestData>({
    resolver: zodResolver(sendRequestSchema),
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await pendingRequestService.get(1);

        setPendingRequest(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);

  const handleSubmit = async (data: SendRequestData) => {
    try {
      setLoading(true);

      if (idUser) {
        const responseUser = await userService.getByEmailOrPhone(data.user);

        const dataRequest: PostRequest = {
          id: responseUser.id,
          name: responseUser.name,
          phone: responseUser.phone,
          email: responseUser.email,
        };

        await pendingRequestService.create(idUser, dataRequest);
        toastService.success("Pedido feito com sucesso!");
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);

      if (error.response && error.response.data) {
        toastService.error(error.response.data);
      } else {
        toastService.error("Pedido não enviado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ContainerForm>
        <Title>Adicionar amigo</Title>

        <FormRoot form={form} onSubmit={form.handleSubmit(handleSubmit)}>
          <AddItemInput
            name="user"
            label="Usuário"
            placeholder="E-mail ou telefone"
            loading={loading}
            background="transparent"
            borderColor={theme.colors.lavender}
          />
        </FormRoot>

        <ContainerRequests $title="Pedidos">
          {pendingRequest ? "" : "vazio"}
        </ContainerRequests>
      </ContainerForm>
    </Container>
  );
}
