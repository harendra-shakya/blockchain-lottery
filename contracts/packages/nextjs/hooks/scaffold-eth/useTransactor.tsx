import { TransactionRequest, TransactionResponse, TransactionReceipt } from "@ethersproject/abstract-provider";
import { SendTransactionResult } from "@wagmi/core";
import { BigNumber, ethers, Signer } from "ethers";
import { Deferrable } from "ethers/lib/utils";
import { useSigner } from "wagmi";
import { getParsedEthersError } from "~~/components/scaffold-eth/Contract/utilsContract";
import { getBlockExplorerTxLink, toast } from "~~/utils/scaffold-eth";

type TTransactionFunc = (
  tx: Promise<SendTransactionResult> | Deferrable<TransactionRequest> | undefined,
  callback?: ((_param: any) => void) | undefined,
) => Promise<Record<string, any> | undefined>;

/**
 * Custom toast content for TXs.
 */
const TxnToast = ({ message, blockExplorerLink }: { message: string; blockExplorerLink?: string }) => {
  return (
    <div className={`flex flex-col ml-1 cursor-default`}>
      <p className="my-0">{message}</p>
      {blockExplorerLink && blockExplorerLink.length > 0 ? (
        <a href={blockExplorerLink} target="_blank" rel="noreferrer" className="block underline text-md">
          checkout out transaction
        </a>
      ) : null}
    </div>
  );
};

/**
 * Runs TXs showing UI feedback.
 * @param _signer
 * @param gasPrice
 * @dev If signer is provided => dev wants to send a raw tx.
 */
export const useTransactor = (_signer?: Signer, gasPrice?: number): TTransactionFunc | undefined => {
  let signer = _signer;
  const { data } = useSigner();
  if (signer === undefined && data) {
    signer = data;
  }

  const result: TTransactionFunc = async (tx, callback) => {
    if (!signer) {
      return;
    }

    let toastId = null;
    let transactionReceipt: TransactionReceipt | undefined;
    let transactionResponse: SendTransactionResult | TransactionResponse | undefined;
    try {
      const provider = signer.provider;
      const network = await provider?.getNetwork();

      toastId = toast.loading(<TxnToast message="Awaiting for user confirmation" />);
      if (tx instanceof Promise) {
        // Tx is already prepared by the caller
        transactionResponse = await tx;
      } else if (tx != null) {
        // Raw tx
        if (!tx.gasPrice) {
          tx.gasPrice = gasPrice || ethers.utils.parseUnits("4.1", "gwei");
        }
        if (!tx.gasLimit) {
          tx.gasLimit = BigNumber.from(ethers.utils.hexlify(120000));
        }

        transactionResponse = await signer.sendTransaction(tx);
      } else {
        throw new Error("Incorrect transaction passed to transactor");
      }
      toast.remove(toastId);

      const blockExplorerTxURL = network ? getBlockExplorerTxLink(network, transactionResponse.hash) : "";

      toastId = toast.loading(
        <TxnToast message="Mining transaction, Hold tight!" blockExplorerLink={blockExplorerTxURL} />,
      );
      transactionReceipt = await transactionResponse.wait();
      toast.remove(toastId);

      toast.success(<TxnToast message="Transaction Mined successfully !" blockExplorerLink={blockExplorerTxURL} />, {
        icon: "🎉",
      });

      if (transactionReceipt) {
        if (callback != null && transactionReceipt.blockHash != null && transactionReceipt.confirmations >= 1) {
          callback({ ...transactionResponse, ...transactionReceipt });
        }
      }
    } catch (error: any) {
      if (toastId) {
        toast.remove(toastId);
      }
      // TODO handle error properly
      console.error("⚡️ ~ file: useTransactor.ts ~ line 98 ~ constresult:TTransactionFunc= ~ error", error);
      const message = getParsedEthersError(error);
      toast.error(message);
    }

    return transactionResponse;
  };

  return result;
};
