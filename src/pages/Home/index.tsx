import { AddItemInput } from "../../components/AddItemInput";
import { Container } from "../../styles/globalStyle";
import { ContainerAreaProfile, ContainerInput, Img, Title } from "./styles";
import img from "../../assets/list.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { FormRoot } from "../../components/Forms/FormRoot";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForceRefresh } from "../../hooks/use-force-refresh";
import { List } from "../../components/List";
import { AreaProfile } from "../../components/AreaProfile";
import { useNavigate } from "react-router-dom";
import { itemService } from "../../services/item";
import { toastService } from "../../services/toast-service";
import { GetUser } from "../../models/user";
import { getImageUrl } from "@/utils";
import { userService } from "@/services/user";
import { GetItem } from "@/models/item";

const itemSchema = z.object({
  itemName: z.string().min(1, "Digite um item"),
});

export type ItemData = z.infer<typeof itemSchema>;

export function Home() {
  const forceRefresh = useForceRefresh();
  const navigate = useNavigate();
  const form = useForm<ItemData>({
    resolver: zodResolver(itemSchema),
  });

  const [loading, setLoading] = useState({
    page: true,
    button: false,
  });
  const [user, setUser] = useState<GetUser>();
  const [items, setItems] = useState<GetItem[]>();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading((prev) => ({ ...prev, page: true }));

        const userResponse = await userService.getMe();
        const itemsResponse = await itemService.get();

        setUser(userResponse);
        setItems(itemsResponse);
      } catch (error) {
        console.error(error);
        toastService.error("Erro ao buscar lista");
      } finally {
        setLoading((prev) => ({ ...prev, page: false }));
      }
    };

    fetchItems();
  }, [forceRefresh]);

  const handleAdd = async (data: ItemData) => {
    try {
      setLoading((prev) => ({ ...prev, button: true }));

      await itemService.create(data);

      form.reset();
      forceRefresh();
    } catch (error) {
      console.error(error);
      toastService.error("Erro ao adicionar item");
    } finally {
      setLoading((prev) => ({ ...prev, button: false }));
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await itemService.update(id);
      forceRefresh();
    } catch (error) {
      console.error(error);
      toastService.error("Erro ao atualizar item");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await itemService.delete(id);
      forceRefresh();
    } catch (error) {
      console.error(error);
      toastService.error("Erro ao deletar item");
    }
  };

  return (
    <Container>
      <ContainerAreaProfile>
        <AreaProfile
          clickBtn={() => navigate("/dashboard")}
          image={user && user.photo && getImageUrl(user.photo)}
        />
      </ContainerAreaProfile>

      <Title>Lista de Compras</Title>

      <FormRoot
        form={form}
        onSubmit={form.handleSubmit(handleAdd)}
        useDefaultStyle={false}
      >
        <ContainerInput>
          <AddItemInput
            name="itemName"
            placeholder="Adicione um item"
            loading={loading.button}
          />
        </ContainerInput>
      </FormRoot>

      {items && items.length !== 0 ? (
        <List
          data={items}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ) : (
        <Img src={img} />
      )}
    </Container>
  );
}
