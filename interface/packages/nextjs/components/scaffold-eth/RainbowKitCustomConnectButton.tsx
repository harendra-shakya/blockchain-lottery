import Image from "next/image";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import { useDisconnect, useSwitchNetwork } from "wagmi";
import { ArrowLeftOnRectangleIcon, ArrowsRightLeftIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Balance } from "~~/components/scaffold-eth";
import { useAutoConnect, useNetworkColor } from "~~/hooks/scaffold-eth";
import { useModal } from "~~/hooks/useModal";
import { useGlobalState } from "~~/services/store/store";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButton = () => {
    // useAutoConnect();

    const networkColor = useNetworkColor();
    const configuredNetwork = getTargetNetwork();
    const { disconnect } = useDisconnect();
    const { switchNetwork } = useSwitchNetwork();
    const router = useRouter();
    const gasLessEnabled = useGlobalState(state => state.gasLessEnabled);
    const setGasLessEnabled = useGlobalState(state => state.setGasLessEnabled);
    const { openModal } = useModal();

    return (
        <ConnectButton.Custom>
            {({ account, chain, openConnectModal, mounted }) => {
                const connected = mounted && account && chain;

                return (
                    <>
                        {(() => {
                            if (!connected) {
                                return (
                                    <button
                                        className="cursor-pointer grow [border:none] pt-3 px-4 pb-2.5 bg-[transparent] rounded-xl [background:linear-gradient(48.73deg,_#ff817d,_#8233ff_46.35%,_#3857fd_63.02%,_#22def1)] overflow-hidden flex-row items-center justify-center text-white font-orbitron"
                                        onClick={openConnectModal}
                                        type="button"
                                    >
                                        Connect Wallet
                                    </button>
                                );
                            }

                            if (chain.unsupported || chain.id !== configuredNetwork.id) {
                                return (
                                    <div className="dropdown dropdown-end">
                                        <label tabIndex={0} className="btn btn-error btn-sm dropdown-toggle">
                                            <span>Wrong network</span>
                                            <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
                                        </label>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content menu p-2 mt-1 shadow-lg bg-[#385183] rounded-box"
                                        >
                                            <li>
                                                <button
                                                    className="menu-item"
                                                    type="button"
                                                    onClick={() => switchNetwork?.(configuredNetwork.id)}
                                                >
                                                    <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
                                                    <span className="whitespace-nowrap">
                                                        Switch to{" "}
                                                        <span style={{ color: networkColor }}>
                                                            {configuredNetwork.name}
                                                        </span>
                                                    </span>
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="menu-item text-error"
                                                    type="button"
                                                    onClick={() => disconnect()}
                                                >
                                                    <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" />{" "}
                                                    <span>Disconnect</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                );
                            }

                            return (
                                <div className="px-2  flex justify-end items-center">
                                    <div className="flex justify-center items-center border-1 rounded-lg">
                                        {/** */}

                                        <div className="flex flex-row items-center justify-start gap-[12px]">
                                            <div className="rounded-xl bg-mediumslateblue-50 overflow-hidden flex flex-row py-1 pr-1 pl-2 items-center justify-center gap-[10px]">
                                                <div className="flex flex-row items-center justify-start gap-[4px]">
                                                    <Balance
                                                        address={account.address}
                                                        className="min-h-0 h-auto"
                                                        gasLessEnabled={gasLessEnabled}
                                                    />
                                                </div>
                                                <div
                                                    className="cursor-pointer p-2 px-4 rounded-xl bg-mediumslateblue-50 overflow-hidden flex flex-col items-center justify-center"
                                                    onClick={() => {
                                                        openModal("DepositModal");
                                                    }}
                                                >
                                                    <div className="leading-[24px] text-5xl text-gradient-tr">+</div>
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <details className="dropdown font-orbitron">
                                                    <summary className="cursor-pointer flex flex-col items-center mr-1 shadow-md rounded-xl">
                                                        <Image
                                                            width={50}
                                                            height={50}
                                                            src="/icons/defaultPic.png"
                                                            className="w-11 h-11"
                                                            alt=""
                                                        />
                                                    </summary>
                                                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-56 text-black font-orbitron absolute right-0 mt-8">
                                                        <li>
                                                            <a>
                                                                <div className="rounded-2xl flex flex-row items-center gap-4">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="toggle toggle-success"
                                                                        onChange={() => {
                                                                            setGasLessEnabled(!gasLessEnabled);
                                                                        }}
                                                                        checked={gasLessEnabled}
                                                                    />
                                                                    <p>Gasless</p>
                                                                </div>
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a>
                                                                <button
                                                                    className="bg-transparent cursor-pointer font-orbitron gap-3 flex justify-center items-center"
                                                                    onClick={() => {
                                                                        disconnect();
                                                                    }}
                                                                >
                                                                    <ArrowLeftOnRectangleIcon className="w-6" />
                                                                    <span>Disconnect</span>
                                                                    {!gasLessEnabled ? (
                                                                        <span className="text-xs">{chain.name}</span>
                                                                    ) : (
                                                                        <span className="text-xs">Chain Warz</span>
                                                                    )}
                                                                </button>
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <button
                                                                className="bg-transparent cursor-pointer font-orbitron gap-3 flex justify-center items-center"
                                                                onClick={async () => {
                                                                    try {
                                                                        const res = await axios.post(
                                                                            "/api/redirectToProfile",
                                                                            {
                                                                                walletAddress: account.address,
                                                                            },
                                                                        );

                                                                        router.push(
                                                                            `${process.env.NEXT_PUBLIC_APP_URL}/${res.data.response}`,
                                                                        );
                                                                    } catch (e) {
                                                                        console.log(e);
                                                                    }
                                                                }}
                                                            >
                                                                My Profile
                                                            </button>
                                                        </li>

                                                        {/* <li>
        <a>
          <button
            onClick={openAccountModal}
            type="button"
            className="bg-transparent cursor-pointer bg-opacity-60 btn-sm pl-0 pr-2 shadow-md"
          >
            <BlockieAvatar
              address={account.address}
              size={24}
              ensImage={account.ensAvatar}
            />
            <span className="ml-2 mr-1">{account.displayName}</span>
            <span>
              <ChevronDownIcon className="h-6 w-4" />
            </span>
          </button>
        </a>
      </li> */}
                                                    </ul>
                                                </details>
                                            </div>
                                        </div>
                                        {/** */}
                                    </div>
                                </div>
                            );
                        })()}
                    </>
                );
            }}
        </ConnectButton.Custom>
    );
};
