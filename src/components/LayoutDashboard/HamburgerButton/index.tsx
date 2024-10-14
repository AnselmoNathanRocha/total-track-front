import { Container, Button, Line } from "./styles";

interface MenuProps {
  onClick: () => void;
  isOpen: boolean;
}

export function HamburgerButton({ onClick, isOpen }: MenuProps) {
  return (
    <Container>
      <Button onClick={onClick} data-is-open={isOpen}>
        <Line />
        <Line />
        <Line />
      </Button>
    </Container>
  );
}
