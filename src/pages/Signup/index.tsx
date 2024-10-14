import { z } from "zod";
import { FormRoot } from "@/components/Forms/FormRoot";
import {
  AreaLink,
  Box,
  ButtonSubmit,
  Container,
  ContainerInput,
  LinkCustom,
  Title,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Forms/Input";
import { InputPass } from "@/components/Forms/InputPass";
import { useState } from "react";
import { Loader } from "@/components/Loader";
import dayjs from "dayjs";
import { keepOnlyNumbers } from "@/utils";
import { userService } from "@/services/user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context";
import { zodDateSchema } from "@/utils/zod-utils";

const signupSchema = z
  .object({
    name: z.string().min(5, "Nome precisa ter no mínimo 5 caracteres"),
    phone: z.string().min(15, "Telefone inválido").transform(keepOnlyNumbers),
    dateOfBirth: zodDateSchema("YYYY-MM-DD"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "A senha e confirmação não conferem",
  });

type SignupData = z.infer<typeof signupSchema>;

export function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });
  const { login } = useAuth();

  async function onSubmit(data: SignupData) {
    try {
      setLoading(true);
      setError(undefined);

      await userService.create(data);

      const response = await userService.authentication({
        email: data.email,
        password: data.password,
      });

      if (response) {
        login(response);
        navigate("/");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.data) {
        setError(error.response.data);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Box>
        <Title>Cadastro</Title>

        <FormRoot form={form} onSubmit={form.handleSubmit(onSubmit)}>
          <ContainerInput>
            <Input
              type="text"
              label="Nome"
              name="name"
              color="#fff"
              borderColor="#7d83b9"
              placeholder=""
            />

            <Input
              name="phone"
              type="tel"
              label="Telefone"
              mask="phone"
              color="#fff"
              borderColor="#7d83b9"
              placeholder=""
            />

            <Input
              name="dateOfBirth"
              type="date"
              max={dayjs().format("YYYY-MM-DD")}
              label="Data de nascimento"
              color="#fff"
              borderColor="#7d83b9"
              placeholder=""
            />

            <Input
              type="email"
              label="Email"
              name="email"
              color="#fff"
              colorIcon="#7d83b9"
              borderColor="#7d83b9"
              placeholder=""
            />

            <InputPass
              label="Senha"
              name="password"
              color="#fff"
              borderColor="#7d83b9"
              colorIcon="#7d83b9"
              placeholder=""
            />

            <InputPass
              label="Confirmar senha"
              name="confirmPassword"
              color="#fff"
              borderColor="#7d83b9"
              colorIcon="#7d83b9"
              placeholder=""
              errorMessage={error}
            />

            <ButtonSubmit disabled={loading}>
              {loading ? <Loader /> : "Cadastrar"}
            </ButtonSubmit>
            <AreaLink>
              Já possui uma conta?
              <LinkCustom to="/login"> Entrar</LinkCustom>
            </AreaLink>
          </ContainerInput>
        </FormRoot>
      </Box>
    </Container>
  );
}
