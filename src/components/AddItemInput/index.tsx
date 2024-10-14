import { useFormContext } from "react-hook-form";
import {
  BoxInput,
  ButtonAdd,
  Container,
  ContianerErrorMessage,
  Input,
  Label,
} from "./styles";
import { useEffect, useCallback } from "react";
import { Loader } from "../Loader";
import { ErrorMessage } from "../Forms/ErrorMessage";
import { MaskType, masks } from "@/utils/masks";

interface Props {
  name: string;
  placeholder?: string;
  label?: string;
  loading: boolean;
  showErrorMessage?: boolean;
  errorMessage?: string;
  background?: string;
  buttonColor?: string;
  borderColor?: string;
  mask?: MaskType;
}

export function AddItemInput({
  name,
  label,
  loading,
  showErrorMessage = true,
  errorMessage,
  background,
  buttonColor,
  borderColor,
  mask,
  ...props
}: Props) {
  const { register, setValue, getValues } = useFormContext();

  useEffect(() => {
    setValue(name, "", { shouldDirty: false, shouldTouch: false });
  }, [name, setValue]);

  const handleInputMask = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      if (mask && typeof masks[mask] === "function") {
        masks[mask](event);
      }
    },
    [mask]
  );

  useEffect(() => {
    const currentValue = getValues(name) || "";
    if (!mask || currentValue === undefined) return;

    const maskedValue = masks[mask](currentValue.toString());
    setValue(name, maskedValue, { shouldDirty: false, shouldTouch: false });
  }, [mask, name, setValue, getValues]);

  return (
    <Container $background={background} $borderColor={borderColor}>
      {label && <Label>{label}</Label>}
      
      <BoxInput>
        <Input {...register(name)} onInput={handleInputMask} {...props} />
        <ButtonAdd $buttonColor={buttonColor}>
          {loading ? <Loader /> : "Add"}
        </ButtonAdd>
      </BoxInput>

      {showErrorMessage && (
        <ContianerErrorMessage>
          <ErrorMessage field={name} errorMessage={errorMessage} />
        </ContianerErrorMessage>
      )}
    </Container>
  );
}
