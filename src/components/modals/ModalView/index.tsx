import React, { FC, useMemo, useCallback, useState, useEffect } from "react";
import classes from "./modalView.module.scss";
import Modal from "@/coreUI/Modal";
import { useProductCtx } from "@/hooks/useProduct";

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  id?: string;
}

const ModalView: FC<Props> = ({ onClose, id }) => {
  const [state, _setState] = useState({
    employee_id: "",
    date: "",
    checkIn_time: "",
    checkOut_time: "",
  });

  const productCtx = useProductCtx();

  useEffect(() => {
    productCtx?.getProductById(id);
  }, [id]);

  useEffect(() => {
    _setState(productCtx.selectedItem?.data);
  });

  const handleSubmit = useCallback(() => {
    onClose();
  }, [onClose]);

  const contentModal = useMemo(() => {
    return (
      <div className="p-5 pb-10">
        <div className="grid grid-rows-2 grid-cols-2 gap-10">
          <div>
            <label>Employee ID</label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-700 rounded shadow focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled={true}
            >
              <option value={state.employee_id}>{productCtx.selectedItem ? state?.employee_id : "Loading..."}</option>
            </select>
          </div>
          <div>
            Date
            <input
              type="text"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"address"}
              placeholder={"enter the item1"}
              value={
                productCtx.selectedItem ? state?.date : "Loading..."
              }
              disabled={true}
            />
          </div>
          <div>
            Checkin Time
            <input
              type="text"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"name"}
              placeholder={"enter the item1"}
              value={
                productCtx.selectedItem ? state?.checkIn_time : "Loading..."
              }
              disabled={true}
            />
          </div>
          <div>
            Checkout Time
            <input
              type="text"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"salary"}
              placeholder={"enter the item1"}
              value={
                productCtx.selectedItem ? state?.checkOut_time : "Loading..."
              }
              disabled={true}
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
        title={`View Detail of Employee ID: ${state?.employee_id}`}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ModalView;
