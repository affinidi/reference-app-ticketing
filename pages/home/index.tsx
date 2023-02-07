import { FC } from "react";
import { useRouter } from "next/router";

import { Container, Header } from "components";
import { ROUTES } from "utils";
import { useAuthContext } from "hooks/useAuthContext";

import { HolderFlowIcon, VerifierFlowIcon, IssuerFlowIcon } from "assets/index";

import * as S from "./home.styled";

export const Home: FC = () => {
  const router = useRouter();

  const { updateAuthState } = useAuthContext();

  return (
    <>
      <Header title="Home" />

      <Container title="Please select one of the following options">
        <S.Wrapper className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <S.Card
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            gap={8}
            onClick={() => {
              updateAuthState({ appFlow: "holder" });
              router.push(ROUTES.holder.home);
            }}
          >
            <S.Details>
              <S.Heading variant="h6">Collect tickets</S.Heading>
              <S.Para variant="p1">
                Collect your tickets or view tickets stored in your wallet
              </S.Para>
            </S.Details>
            <S.Icon>
              <HolderFlowIcon />
            </S.Icon>
          </S.Card>

          <S.Card
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            gap={8}
            onClick={() => {
              updateAuthState({ appFlow: "verifier" });
              router.push(ROUTES.verifier.welcome);
            }}
          >
            <S.Details>
              <S.Heading variant="h6">Verify tickets</S.Heading>
              <S.Para variant="p1">
                Verify tickets with a QR code scanner
              </S.Para>
            </S.Details>
            <S.Icon>
              <VerifierFlowIcon />
            </S.Icon>
          </S.Card>

          <S.Card
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            gap={8}
            onClick={() => {
              updateAuthState({ appFlow: "issuer" });
              router.push(ROUTES.issuer.credentialForm);
            }}
          >
            <S.Details>
              <S.Heading variant="h6">Issue ticket</S.Heading>
              <S.Para variant="p1">
                Issue tickets to your customers easily
              </S.Para>
            </S.Details>
            <S.Icon>
              <IssuerFlowIcon />
            </S.Icon>
          </S.Card>
        </S.Wrapper>
      </Container>
    </>
  );
};
export default Home;
