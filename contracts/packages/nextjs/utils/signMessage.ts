import { useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";
import * as React from "react";

export default function SignMessage(message: string) {
  let recoveredAddress = React.useRef<string>();

  const {
    data: signature,
    error,
    isLoading,
    signMessage,
  } = useSignMessage({
    message,
    onSuccess(signature) {
      console.log("---------------------------------------");
      const address = verifyMessage(message, signature);
      recoveredAddress.current = address;
      console.log("recoveredAddress.current", address);
      console.log("---------------------------------------");
    },
  });

  return { signature, error, isLoading, signMessage, recoveredAddress: recoveredAddress.current };
}
