import { z } from "zod";
import { Modal } from "../../components/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormRoot } from "../../components/Forms/FormRoot";
import { ButtonSave } from "./styles";
import { InputPass } from "../../components/Forms/InputPass";
import { toastService } from "@/services/toast-service";
import { GetUser } from "@/models/user";
import { ContainerInput } from "@/styles/globalStyle";

const recoverPasswordSchema = z
  .object({
    password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "A senha e confirmação não conferem",
  });

type RecoverPasswordData = z.infer<typeof recoverPasswordSchema>;

interface Props {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: GetUser;
}

export function RecoverPassword({ user, ...props }: Props) {
  const form = useForm<RecoverPasswordData>({
    resolver: zodResolver(recoverPasswordSchema),
  });

  const handleSubmit = async (data: RecoverPasswordData) => {
    try {
      const dataTransformed = {
        ...user,
        password: data.password,
      };

      console.log(dataTransformed);
      
      // await userService.update(dataTransformed);

      form.reset();
      props.onClose();
      toastService.success("Salvo com sucesso!");
    } catch (error) {
      console.error(error);
      toastService.error("Erro ao salvar.");
    }
  };

  return (
    <Modal title="Alterar senha" {...props}>
      <FormRoot form={form} onSubmit={form.handleSubmit(handleSubmit)}>
        <ContainerInput>
          <InputPass
            label="Nova senha"
            name="password"
            color="#fff"
            borderColor="#7d83b9"
            colorIcon="#7d83b9"
            placeholder=""
          />

          <InputPass
            label="Confirmar nova senha"
            name="confirmPassword"
            color="#fff"
            borderColor="#7d83b9"
            colorIcon="#7d83b9"
            placeholder=""
          />

          <ButtonSave>Salvar</ButtonSave>
        </ContainerInput>
      </FormRoot>
    </Modal>
  );
}
