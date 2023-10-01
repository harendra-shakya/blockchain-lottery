import { FunctionFragment } from "ethers/lib/utils";
import { Contract, utils } from "ethers";
import DisplayVariable from "~~/components/scaffold-eth/Contract/DisplayVariables";
import { ReadOnlyFunctionForm } from "./ReadOnlyFunctionForm";
import { WriteOnlyFunctionForm } from "./WriteOnlyFunctionForm";
import { Dispatch, SetStateAction } from "react";
import * as chain from "wagmi/chains";

/**
 * @param {Contract} contract
 * @returns {FunctionFragment[]} array of function fragments
 */
const getAllContractFunctions = (contract: Contract | null): FunctionFragment[] => {
  return contract ? Object.values(contract.interface.functions).filter(fn => fn.type === "function") : [];
};

/**
 * @dev used to filter all readOnly functions with zero params
 * @param {Contract} contract
 * @param {FunctionFragment[]} contractMethodsAndVariables - array of all functions in the contract
 * @param {boolean} refreshDisplayVariables refetch values
 * @returns { methods: (JSX.Element | null)[] } array of DisplayVariable component
 * which has corresponding input field for param type and button to read
 */
const getContractVariablesAndNoParamsReadMethods = (
  contract: Contract | null,
  contractMethodsAndVariables: FunctionFragment[],
  refreshDisplayVariables: boolean,
): { methods: (JSX.Element | null)[] } => {
  return {
    methods: contract
      ? contractMethodsAndVariables
          .map(fn => {
            const isQueryableWithNoParams =
              (fn.stateMutability === "view" || fn.stateMutability === "pure") && fn.inputs.length === 0;
            if (isQueryableWithNoParams) {
              return (
                <DisplayVariable
                  key={fn.name}
                  functionFragment={fn}
                  contractAddress={contract.address}
                  refreshDisplayVariables={refreshDisplayVariables}
                />
              );
            }
            return null;
          })
          .filter(n => n)
      : [],
  };
};

/**
 * @dev used to filter all readOnly functions with greater than or equal to 1 params
 * @param {Contract} contract
 * @param {FunctionFragment[]} contractMethodsAndVariables - array of all functions in the contract
 * @returns { methods: (JSX.Element | null)[] } array of ReadOnlyFunctionForm component
 * which has corresponding input field for param type and button to read
 */
const getContractReadOnlyMethodsWithParams = (
  contract: Contract | null,
  contractMethodsAndVariables: FunctionFragment[],
): { methods: (JSX.Element | null)[] } => {
  return {
    methods: contract
      ? contractMethodsAndVariables
          .map(fn => {
            const isQueryableWithParams =
              (fn.stateMutability === "view" || fn.stateMutability === "pure") && fn.inputs.length > 0;
            if (isQueryableWithParams) {
              return <ReadOnlyFunctionForm key={fn.name} functionFragment={fn} contractAddress={contract.address} />;
            }
            return null;
          })
          .filter(n => n)
      : [],
  };
};

/**
 * @dev used to filter all write functions
 * @param {Contract} contract
 * @param {FunctionFragment[]} contractMethodsAndVariables - array of all functions in the contract
 * @param {Dispatch<SetStateAction<boolean>>} setRefreshDisplayVariables - trigger variable refresh
 * @returns {  methods: (JSX.Element | null)[] } array of WriteOnlyFunctionForm component
 * which has corresponding input field for param type, txnValue input if required and button to send transaction
 */
const getContractWriteMethods = (
  contract: Contract | null,
  contractMethodsAndVariables: FunctionFragment[],
  setRefreshDisplayVariables: Dispatch<SetStateAction<boolean>>,
): { methods: (JSX.Element | null)[] } => {
  return {
    methods: contract
      ? contractMethodsAndVariables
          .map(fn => {
            const isWriteableFunction = fn.stateMutability !== "view" && fn.stateMutability !== "pure";
            if (isWriteableFunction) {
              return (
                <WriteOnlyFunctionForm
                  key={fn.name}
                  functionFragment={fn}
                  contractAddress={contract.address}
                  setRefreshDisplayVariables={setRefreshDisplayVariables}
                />
              );
            }
            return null;
          })
          .filter(n => n)
      : [],
  };
};

/**
 * @dev utility function to generate key corresponding to function metaData
 * @param {FunctionFragment} functionInfo
 * @param {utils.ParamType} input - object containing function name and input type corresponding to index
 * @param {number} inputIndex
 * @returns {string} key
 */
const getFunctionInputKey = (functionInfo: FunctionFragment, input: utils.ParamType, inputIndex: number): string => {
  const name = input?.name || `input_${inputIndex}_`;
  return functionInfo.name + "_" + name + "_" + input.type;
};

/**
 * @dev utility function to parse error thrown by ethers
 * @param e - ethers error object
 * @returns {string} parsed error string
 */
const getParsedEthersError = (e: any): string => {
  let message =
    e.data && e.data.message
      ? e.data.message
      : e.error && JSON.parse(JSON.stringify(e.error)).body
      ? JSON.parse(JSON.parse(JSON.stringify(e.error)).body).error.message
      : e.data
      ? e.data
      : JSON.stringify(e);
  if (!e.error && e.message) {
    message = e.message;
  }

  console.log("Attempt to clean up:", message);
  try {
    const obj = JSON.parse(message);
    if (obj && obj.body) {
      const errorObj = JSON.parse(obj.body);
      if (errorObj && errorObj.error && errorObj.error.message) {
        message = errorObj.error.message;
      }
    }
  } catch (e) {
    //ignore
  }

  const revertedRegex = /execution reverted: (.+?)",/;
  const __match = revertedRegex.exec(e);
  if (__match && __match.length > 1) {
    return __match[1];
  }

  const reasonRegex = /reverted with reason string '(.+?)'/;
  const match = reasonRegex.exec(e);
  if (match && match.length > 1) {
    return match[1];
  }

  const panicCodeRegex = /reverted with panic code 0x32 \((.+?)\)/;
  const match_ = panicCodeRegex.exec(e);
  if (match_ && match_.length > 1) {
    return `Incorrect Var or Function. Please check var or function. \nError: ${match_[1]}`;
  }

  const errorRegex = /Error: (.+?) \(event="changed", network=/;
  const _match = errorRegex.exec(e);
  if (_match && _match.length > 1) {
    return _match[1] + `Wrong network selected - Switch to supported network`;
  }

  return message;
};

export {
  getContractReadOnlyMethodsWithParams,
  getAllContractFunctions,
  getContractVariablesAndNoParamsReadMethods,
  getContractWriteMethods,
  getFunctionInputKey,
  getParsedEthersError,
};
