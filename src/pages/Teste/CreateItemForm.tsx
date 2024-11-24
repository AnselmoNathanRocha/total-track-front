import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "./api";

interface Item {
  id: number;
  itemName: string;
  checked: boolean;
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 400px;
  margin: 2rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ItemListItem = styled.li`
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
`;

export function CreateItemForm() {
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  // Função para buscar os itens do backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get<Item[]>("/item");
        setItems(response.data); // Define os itens do backend no estado
      } catch (error) {
        console.error("Erro ao buscar os itens:", error);
      }
    };

    fetchItems();

    // WebSocket para receber novas atualizações
    const socket = new WebSocket("ws://localhost:3001"); // Conexão com o WebSocket
    socket.onopen = () => {
      console.log("Conectado ao WebSocket");
    };

    socket.onmessage = (event) => {
      const newItem = JSON.parse(event.data);
      setItems((prevItems) => [...prevItems, newItem]); // Adiciona o novo item à lista
    };

    socket.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };

    return () => {
      socket.close(); // Fecha a conexão WebSocket quando o componente for desmontado
    };
  }, []);

  const handleCreateItem = async () => {
    if (!itemName.trim()) {
      alert("Por favor, insira o nome do item.");
      return;
    }

    try {
      await api.post<Item>("/item", { itemName });
      setItemName("");
    } catch (error) {
      console.error("Erro ao criar o item:", error);
    }
  };

  return (
    <FormContainer>
      <h1>Criar Item</h1>
      <Input
        type="text"
        placeholder="Digite o nome do item"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <Button onClick={handleCreateItem}>Criar</Button>

      <h2>Itens Criados</h2>
      <ItemList>
        {items.map((item, index) => (
          <ItemListItem key={index}>{item.itemName}</ItemListItem>
        ))}
      </ItemList>
    </FormContainer>
  );
}
