import { FaUser } from "react-icons/fa";
import { Button, Container, ContainerImage, IconUser, Image } from "./styles";

interface Props {
  clickBtn: () => void;
  image?: string;
}

export function AreaProfile({ clickBtn, image }: Props) {
  return (
    <Container>
      <Button onClick={clickBtn}>
        {image ? (
          <Image src={image} />
        ) : (
          <ContainerImage>
            <IconUser as={FaUser} />
          </ContainerImage>
        )}
      </Button>
    </Container>
  );
}
