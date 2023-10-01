// useModal.ts
import React, { createContext, useContext, useState } from "react";

type ModalName = "DepositModal" | "StakingModal";

type ModalState = {
    [key in ModalName]: boolean;
};

type ModalContextType = {
    modals: ModalState;
    openDepositModal: () => void;
    openStakingModal: () => void;
    openModal: (modalName: ModalName) => void;
    closeModal: (modalName: ModalName) => void;
    close: () => void;
    isModalOpen: (modalName: ModalName) => boolean;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};

type ModalProviderProps = {
    children: React.ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [modals, setModals] = useState<ModalState>({
        DepositModal: false,
        StakingModal: false,
    });

    const openDepositModal = () => {
        setModals(prevModals => ({
            ...prevModals,
            DepositModal: true,
        }));
    };

    const openStakingModal = () => {
        setModals(prevModals => ({
            ...prevModals,
            StakingModal: true,
        }));
    };

    const openModal = (modalName: ModalName) => {
        setModals(prevModals => ({
            ...prevModals,
            [modalName]: true,
        }));
    };

    const closeModal = (modalName: ModalName) => {
        setModals(prevModals => ({
            ...prevModals,
            [modalName]: false,
        }));
    };

    const close = () => {
        setModals(prevModals => {
            const updatedModals = { ...prevModals };
            for (const modalName in updatedModals) {
                if (Object.prototype.hasOwnProperty.call(updatedModals, modalName)) {
                    updatedModals[modalName as ModalName] = false;
                }
            }
            return updatedModals;
        });
    };

    const isModalOpen = (modalName: ModalName) => {
        return modals[modalName] || false;
    };

    const modalContextValue: ModalContextType = {
        modals,
        openDepositModal,
        openStakingModal,
        openModal,
        closeModal,
        close,
        isModalOpen,
    };

    return <ModalContext.Provider value={modalContextValue}>{children}</ModalContext.Provider>;
};
