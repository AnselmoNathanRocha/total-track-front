import { Item } from "../../models/item";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import {
  ItemName,
  ListContainer,
  ItemList,
  ButtonCheck,
  ButtonDell,
  IconCheck,
} from "./styles";

interface Props {
  data: Item[];
  onToggle: (id: number, data: Item) => void;
  onDelete: (id: number) => void;
}

export function List({ data, onToggle, onDelete }: Props) {
  return (
    <ListContainer>
      {data.map((item) => (
        <ItemList key={item.id} checked={item.checked}>
          <ButtonCheck onClick={() => onToggle(item.id, item)}>
            <IconCheck as={item.checked ? FaRegCheckCircle : FaRegCircle} />

            <ItemName>{item.itemName}</ItemName>
          </ButtonCheck>

          <ButtonDell type="button" onClick={() => onDelete(item.id)}>
            Delete
          </ButtonDell>
        </ItemList>
      ))}
    </ListContainer>
  );
}