import { FC, useCallback, useState } from "react";
import { Exception, Result } from "@zxing/library";
import { extractHashAndKeyFromVSShareUrl, ROUTES } from "utils";
import { useScanner } from "hooks/verifier/useScanner";
import { Typography } from "../../../../components";
import * as S from "./QrScanner.styled";
import { useRouter } from "next/router";

type QrScannerProps = {};

const videoElementId = "video-renderer";

const QrScanner: FC<QrScannerProps> = () => {
  const [scanError, setScanError] = useState("");
  const router = useRouter();

  const onScanned = useCallback(
    async (result: Result | undefined): Promise<void> => {
      const text = result?.getText();
      if (!text) {
        return;
      }
      try {
        const hashAndKey = extractHashAndKeyFromVSShareUrl(text);
        if (!hashAndKey) {
          setScanError("The QR code was not recognized");
          return;
        }
        const { hash, key } = hashAndKey;
        await router.push(
          {
            pathname: ROUTES.verifier.result,
            query: { key, hash },
          },
          ROUTES.verifier.result
        );
      } catch (error) {
        console.error(error);
        setScanError("The QR-Code has not been recognized.");
      }
    },
    [router]
  );

  const onError = useCallback((err: Exception) => {
    setScanError(err.message);
  }, []);

  useScanner({
    onError,
    onScanned,
    videoElementId,
  });

  return (
    <>
      <S.Overlay>
        <video muted id={videoElementId} />
      </S.Overlay>

      {!!scanError && <Typography variant="e1">{scanError}</Typography>}
    </>
  );
};

export default QrScanner;
