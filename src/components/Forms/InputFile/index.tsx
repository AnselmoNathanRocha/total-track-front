import { useState, useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  ButtonText,
  Container,
  ContainerButton,
  HiddenInput,
  ImageContainer,
  Overlay,
  Image,
  ContainerImageDefault,
  IconUser,
  Label,
} from "./styles";
import { FaUser } from "react-icons/fa6";

interface InputFileProps {
  name: string;
  label?: string;
  defaultImage?: string;
}

export function InputFile({
  name,
  label,
  defaultImage,
  ...props
}: InputFileProps) {
  const { control } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage);
    }
    return () => {
      if (preview) URL.revokeObjectURL(preview); // Libera URL ao desmontar
    };
  }, [defaultImage, preview]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (preview) URL.revokeObjectURL(preview); // Libera URL antiga
      setPreview(imageUrl);
      onChange(file);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <Container>
          {label && <Label>{label}</Label>}

          <ImageContainer>
            {preview ? (
              <Image src={preview} alt="Preview" {...props} />
            ) : (
              <ContainerImageDefault>
                <IconUser as={FaUser} />
              </ContainerImageDefault>
            )}

            <Overlay>
              <ContainerButton>
                <ButtonText
                  type="button"
                  onClick={() => inputRef.current?.click()}
                >
                  Alterar
                </ButtonText>
              </ContainerButton>
            </Overlay>
          </ImageContainer>

          <HiddenInput
            ref={inputRef}
            type="file"
            accept="image/*"
            id={name}
            onChange={(e) => handleFileChange(e, field.onChange)}
          />
        </Container>
      )}
    />
  );
}
