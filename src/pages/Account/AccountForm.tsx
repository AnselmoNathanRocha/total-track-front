import { FormRoot } from "@/components/Forms/FormRoot";
import { zodDateSchema } from "@/utils/zod-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ButtonLink, ButtonSave, InputContainer, PencilIcon } from "./styles";
import { InputFile } from "@/components/Forms/InputFile";
import { Input } from "@/components/Forms/Input";
import { toastService } from "@/services/toast-service";
import dayjs from "dayjs";
import { GetUser } from "@/models/user";
import { z } from "zod";
import { FiEdit3 } from "react-icons/fi";
import { getImageUrl } from "@/utils";
import { ContainerInput } from "@/styles/globalStyle";

const accountSchema = z.object({
  photoo: z.instanceof(File).nullable(),
  name: z.string().min(4, "Mínimo 4 caracteres"),
  surname: z.string().min(4, "Mínimo 4 caracteres"),
  dateOfBirth: zodDateSchema("YYYY-MM-DD"),
});

export type AccountData = z.infer<typeof accountSchema>;

interface Props {
  clickOpenModal: () => void;
  defaultValues: GetUser;
  onSubmit: (data: AccountData) => void;
}

export function AccountForm({ clickOpenModal, defaultValues, onSubmit }: Props) {
  const [editFields, setEditFields] = useState({
    photoo: false,
    name: false,
    surname: false,
    dateOfBirth: false,
  });

  const form = useForm<AccountData>({
    resolver: zodResolver(accountSchema),
    defaultValues,
  });

  const handleEditClick = (field: keyof typeof editFields) => {
    setEditFields((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSubmit = async (data: AccountData) => {
    try {
      onSubmit(data);

      setEditFields({
        photoo: false,
        name: false,
        surname: false,
        dateOfBirth: false,
      });
      toastService.success("Salvo com sucesso!");
    } catch (error) {
      console.error(error);
      toastService.error("Erro ao salvar.");
    }
  };

  const isSaveDisabled = !Object.values(editFields).some(Boolean);

  return (
    <FormRoot form={form} onSubmit={form.handleSubmit(handleSubmit)}>
      <ContainerInput>
        <InputContainer>
          <InputFile
            name="photoo"
            label="Imagem"
            defaultImage={
              defaultValues &&
              defaultValues.photo &&
              getImageUrl(defaultValues.photo)
            }
          />
        </InputContainer>

        <InputContainer>
          <Input
            type="text"
            label="Nome"
            name="name"
            color="#fff"
            colorIcon="#7d83b9"
            borderColor="#7d83b9"
            placeholder=""
            disabled={!editFields.name}
          />
          {!editFields.name && (
            <PencilIcon as={FiEdit3} onClick={() => handleEditClick("name")} />
          )}
        </InputContainer>

        <InputContainer>
          <Input
            type="text"
            label="Apelido"
            name="surname"
            color="#fff"
            colorIcon="#7d83b9"
            borderColor="#7d83b9"
            placeholder=""
            disabled={!editFields.surname}
          />
          {!editFields.surname && (
            <PencilIcon
              as={FiEdit3}
              onClick={() => handleEditClick("surname")}
            />
          )}
        </InputContainer>

        <InputContainer>
          <Input
            name="dateOfBirth"
            type="date"
            max={dayjs().format("YYYY-MM-DD")}
            label="Data de nascimento"
            color="#fff"
            borderColor="#7d83b9"
            placeholder=""
            disabled={!editFields.dateOfBirth}
          />
          {!editFields.dateOfBirth && (
            <PencilIcon
              as={FiEdit3}
              onClick={() => handleEditClick("dateOfBirth")}
            />
          )}
        </InputContainer>

        <ButtonLink type="button" onClick={clickOpenModal}>
          Alterar senha
        </ButtonLink>

        <ButtonSave type="submit" disabled={isSaveDisabled}>
          Salvar
        </ButtonSave>
      </ContainerInput>
    </FormRoot>
  );
}
