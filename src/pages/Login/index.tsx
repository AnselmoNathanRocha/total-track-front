import { z } from "zod";
import { FormRoot } from "../../components/Forms/FormRoot";
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
import { Input } from "../../components/Forms/Input";
import { InputPass } from "../../components/Forms/InputPass";
import { useState } from "react";
import { userService } from "../../services/user";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { useAuth } from "../../context";
import { toastService } from "@/services/toast-service";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

interface ErrorType {
  emailError: string | undefined;
  passwordError: string | undefined;
}

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>({
    emailError: undefined,
    passwordError: undefined,
  });

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  async function onSubmit(data: LoginData) {
    try {
      setLoading(true);
      setError({
        emailError: undefined,
        passwordError: undefined,
      });

      const response = await userService.authentication(data);

      if (response) {
        login(response);
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setError({
          emailError: error.response.data,
          passwordError: undefined,
        });
      } else if (error.response && error.response.status === 401) {
        setError({
          emailError: undefined,
          passwordError: error.response.data,
        });
      } else {
        console.error(error);
        toastService.error("Erro ao se comunicar como servidor.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Box>
        <Title>Login</Title>

        <FormRoot form={form} onSubmit={form.handleSubmit(onSubmit)}>
          <ContainerInput>
            <Input
              type="email"
              label="Email"
              name="email"
              color="#fff"
              colorIcon="#7d83b9"
              borderColor="#7d83b9"
              placeholder=""
              errorMessage={error.emailError}
            />

            <InputPass
              label="Senha"
              name="password"
              color="#fff"
              borderColor="#7d83b9"
              colorIcon="#7d83b9"
              placeholder=""
              errorMessage={error.passwordError}
            />

            <ButtonSubmit disabled={loading}>
              {loading ? <Loader /> : "Entrar"}
            </ButtonSubmit>
            <AreaLink>
              Não possui uma conta?{" "}
              <LinkCustom to="/signup"> Cadastrar</LinkCustom>
            </AreaLink>
          </ContainerInput>
        </FormRoot>
      </Box>
    </Container>
  );
}
