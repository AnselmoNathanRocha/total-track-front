import { RiCloseCircleLine } from "react-icons/ri";
import { ReactPortal } from "../ReactPortal";
import {
  CloseButton,
  H2,
  IconClose,
  ModalContainer,
  ModalContent,
  ModalHeader,
  Overlay,
} from "./styles";

export interface ModalProps {
  onClose: () => void;
  visible: boolean;
  title?: string;
  children: React.ReactNode;
  backgroundColor?: string;
  showCloseButton?: boolean;
  position?: "center" | "bottom";
  level?: number;
  width?: string;
}

export function Modal({
  onClose,
  visible,
  title,
  children,
  backgroundColor,
  showCloseButton = true,
  position = "center",
  level = 1,
  width,
}: ModalProps) {
  return (
    <ReactPortal containerId="modal-root">
      <Overlay data-is-visible={visible} $level={level}>
        <ModalContainer
          $backgroundcolor={backgroundColor}
          $position={position}
          $level={level}
          $width={width}
          data-is-visible={visible}
        >
          <ModalHeader>
            <H2>{title}</H2>

            {showCloseButton && (
              <CloseButton onClick={onClose}>
                <IconClose as={RiCloseCircleLine} />
              </CloseButton>
            )}
          </ModalHeader>

          <ModalContent>{children}</ModalContent>
        </ModalContainer>
      </Overlay>
    </ReactPortal>
  );
}
