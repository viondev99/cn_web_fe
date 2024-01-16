import React, { FC, useMemo, useCallback, useState } from "react";
import classes from "./modalDelete.module.scss";
import Modal from "@/coreUI/Modal";
import { useProductCtx } from "@/hooks/useProduct";
import { ToastContainer, toast } from "react-toastify";

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  id?: string;
}

const ModalDelete: FC<Props> = ({ onClose, id }) => {
  const productCtx = useProductCtx();

  const handleDelete = useCallback(async () => {
    await productCtx?.deleteProductById(id);
    productCtx?.getListProduct();
    toast("Deleted", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    onClose();
  }, [onClose]);

  const contentModal = useMemo(() => {
    return (
      <div className="p-5 pb-10">
        <div className="text-center text-xl text-orange-700">
          ARE YOU SURE DELETE THIS CHANNEL?
        </div>
      </div>
    );
  }, []);

  return (
    <Modal
      onClose={onClose}
      content={contentModal}
      title="Delete This Channel"
      onSubmit={handleDelete}
      contentBottom={
        <button className={classes.submit} onClick={handleDelete}>
          OK
        </button>
      }
    />
  );
};

export default ModalDelete;
