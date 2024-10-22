import { useEffect, useState } from "react";
import { Container } from "../../styles/globalStyle";
import { RecoverPassword } from "./RecoverPassword";
import { userService } from "../../services/user";
import { GetUser } from "@/models/user";
import { useDebounce } from "@/hooks/use-debounce";
import { useForceRefresh } from "@/hooks/use-force-refresh";
import { AccountData, AccountForm } from "./AccountForm";
import { ContainerSpinner } from "@/components/Loader/styles";
import { Loading } from "@/components/Loading";
import { toastService } from "@/services/toast-service";

export function Account() {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState<GetUser>();
  const forceRefresh = useForceRefresh();

  const fetchUser = async () => {
    try {
      const userResponse = await userService.getMe();

      setUser(userResponse);
    } catch (error) {
      console.error(error);
      toastService.error("Erro ao buscar dados do usuário.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchUser = useDebounce(fetchUser, 1000);

  useEffect(() => {
    debouncedFetchUser();
  }, [forceRefresh]);

  const handleSubmit = async (data: AccountData) => {
    try {
      if (user) {
        const dataTransform = {
          name: data.name,
          surname: data.surname,
          dateOfBirth: data.dateOfBirth,
          email: user.email,
          password: "12345678",
          photo: data.photoo
        }

        await userService.update(dataTransform);
      }
      forceRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  function renderContent() {
    if (!user) return null;

    return (
      <>
        <AccountForm
          defaultValues={user}
          clickOpenModal={() => setModal(true)}
          onSubmit={handleSubmit}
        />

        <RecoverPassword
          visible={modal}
          onClose={() => setModal(false)}
          onSuccess={() => {
            setModal(false);
            console.log("Teste");
          }}
          user={user}
        />
      </>
    );
  }

  return (
    <Container>
      {loading ? (
        <ContainerSpinner>
          <Loading />
        </ContainerSpinner>
      ) : (
        renderContent()
      )}
    </Container>
  );
}
