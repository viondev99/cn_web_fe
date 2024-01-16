import React, { FC, useMemo, useCallback, useState, useEffect } from "react";
import classes from "./modalView.module.scss";
import Modal from "@/coreUI/Modal";
import { useProductCtx } from "@/hooks/useProduct";
import { ToastContainer, toast } from "react-toastify";

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  id?: string;
}

const ModalEdit: FC<Props> = ({ onClose, id }) => {
  const [numberError, setNumberError] = useState<boolean>(true);
  const [dateError, setDateError] = useState<boolean>(true);

  const productCtx = useProductCtx();
  const [state, _setState] = useState({
    title: "",
    author: "",
    genre: "",
    publicationYear: "",
    ISBN: "",
    coverImageUrl: "",
  });

  useEffect(() => {
    productCtx?.getProductById(id);
    // _setState(productCtx.selectedItem?.data);
  }, [id]);

  useEffect(() => {
    _setState(productCtx.selectedItem?.data);
  }, [productCtx]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOnChange = (value: string, key: string) => {
    _setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = useCallback(async () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
    const numberRegex = /^\d+$/;
    const whitespaceRegex = /\s/;

    const checkDate: boolean = dateRegex.test(state?.publicationYear);
    const checkNumber: boolean = numberRegex.test(state?.ISBN);

    if (!checkDate || state?.publicationYear === "") {
      setDateError(false);
    } else if (!checkNumber || state?.ISBN === "") {
      setNumberError(false);
    } else {
      const payload = {
        title: state?.title,
        author: state?.author,
        genre: state?.genre,
        publicationYear: state?.publicationYear,
        ISBN: state?.ISBN,
        coverImageUrl: state?.coverImageUrl,
      };
      await productCtx?.updateProduct(payload, id);
      productCtx?.getListProduct();
      toast("Updated", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    onClose();
  }, [id, onClose, productCtx, state]);

  const contentModal = useMemo(() => {
    return (
      <div className="p-5 pb-10">
        <div className="grid grid-rows-2 grid-cols-2 gap-10">
          <div>
            Title
            <input
              type="text"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"title"}
              placeholder={"enter the item1"}
              value={productCtx.selectedItem ? state?.title : "Loading..."}
              onChange={(e) => handleOnChange(e.target.value, "title")}
              disabled={!productCtx.selectedItem}
            />
          </div>
          <div>
            Author
            <input
              type="text"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"author"}
              placeholder={"enter the item1"}
              value={productCtx.selectedItem ? state?.author : "Loading..."}
              onChange={(e) => handleOnChange(e.target.value, "author")}
              disabled={!productCtx.selectedItem}
            />
          </div>
          <div>
            Genre
            <input
              type="text"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"genre"}
              placeholder={"enter the item1"}
              value={productCtx.selectedItem ? state?.genre : "Loading..."}
              onChange={(e) => handleOnChange(e.target.value, "genre")}
              disabled={!productCtx.selectedItem}
            />
          </div>
          <div>
            Publication Year
            <input
              type="text"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"publicationYear"}
              placeholder={"enter the item1"}
              value={
                productCtx.selectedItem ? state?.publicationYear : "Loading..."
              }
              onChange={(e) =>
                handleOnChange(e.target.value, "publicationYear")
              }
              disabled={!productCtx.selectedItem}
            />
            {!dateError && (
              <p style={{ color: "red" }}>Date is required same YYYY:MM:DD</p>
            )}
          </div>
          <div>
            ISBN
            <input
              type="text"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"ISBN"}
              placeholder={"enter the item1"}
              value={productCtx.selectedItem ? state?.ISBN : "Loading..."}
              onChange={(e) => handleOnChange(e.target.value, "ISBN")}
              disabled={!productCtx.selectedItem}
            />
            {!numberError && (
              <p style={{ color: "red" }}>This value is required Number</p>
            )}
          </div>
          <div>
            CoverImage URL
            <input
              type="text"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"coverImageUrl"}
              placeholder={"enter the item1"}
              value={
                productCtx.selectedItem ? state?.coverImageUrl : "Loading..."
              }
              onChange={(e) => handleOnChange(e.target.value, "coverImageUrl")}
              disabled={!productCtx.selectedItem}
            />
          </div>
        </div>
      </div>
    );
  }, [productCtx, state]);

  return (
    <>
      <Modal
        onClose={onClose}
        content={contentModal}
        title={`Edit Book ID: ${id}`}
        onSubmit={handleSubmit}
        contentBottom={
          <button className={classes.submit} onClick={handleSubmit}>
            OK
          </button>
        }
      />
    </>
  );
};

export default ModalEdit;
