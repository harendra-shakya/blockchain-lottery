import { useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";
import * as React from "react";

export function SignMessage() {
  const [message, setMessage] = React.useState("gm wagmi frens");
  let recoveredAddress = React.useRef<string>();

  const {
    data: signature,
    error,
    isLoading,
    signMessage,
  } = useSignMessage({
    message,
    onSuccess(signature) {
      const address = verifyMessage(message, signature);
      recoveredAddress.current = address;
    },
  });

  console.log("sm-----------------recoveredAddress--------------", recoveredAddress.current);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        signMessage({ message });
      }}
    >
      <label htmlFor="message">Enter a message to sign</label>
      <textarea
        id="message"
        name="message"
        placeholder="The quick brown fox…"
        onChange={event => setMessage(event.target.value)}
      />
      <button disabled={isLoading}>{isLoading ? "Check Wallet" : "Sign Message"}</button>

      {signature && (
        <div>
          <div>Recovered Address: {recoveredAddress.current}</div>
          <div>Signature: {signature}</div>
        </div>
      )}

      {error && <div>{error.message}</div>}
    </form>
  );
}
