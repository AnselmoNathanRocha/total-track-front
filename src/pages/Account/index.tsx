import { useEffect, useState } from "react";
import { Container } from "../../styles/globalStyle";
import { RecoverPassword } from "./RecoverPassword";
import { userService } from "../../services/user";
import { useAuth } from "@/context";
import { GetUser } from "@/models/user";
import { useDebounce } from "@/hooks/use-debounce";
import { useForceRefresh } from "@/hooks/use-force-refresh";
import { AccountForm } from "./AccountForm";
import { ContainerSpinner } from "@/components/Loader/styles";
import { Loading } from "@/components/Loading";

export function Account() {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState<GetUser>();
  const { idUser } = useAuth();
  const forceRefresh = useForceRefresh();

  const fetchUser = async () => {
    try {
      if (idUser) {
        const response = await userService.get(idUser);

        setUser(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchUser = useDebounce(fetchUser, 1000);

  useEffect(() => {
    debouncedFetchUser();
  }, [forceRefresh, idUser]);

  function renderContent() {
    if (!user) return null;

    return (
      <>
        <AccountForm
          defaultValues={user}
          clickOpenModal={() => setModal(true)}
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
          <Loading/>
        </ContainerSpinner>
      ) : (
        renderContent()
      )}
    </Container>
  );
}
