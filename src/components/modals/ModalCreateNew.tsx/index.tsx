import React, { FC, useMemo, useCallback, useState } from "react";
import classes from "./modalCreateNew.module.scss";
import Modal from "@/coreUI/Modal";
import { useProductCtx } from "@/hooks/useProduct";
import { ToastContainer, toast } from "react-toastify";

interface Props {
  isOpen?: boolean;
  onClose: () => void;
}

type ListOptionInput = {
  id: string;
  name: string;
  plh: string;
  title: string;
};

const ModalCreateNew: FC<Props> = ({ onClose }) => {
  // Dùng để set lại giá trị nếu vào case error
  const [numberError, setNumberError] = useState<boolean>(true);
  const [dateError, setDateError] = useState<boolean>(true);
  const [timeError, setTimeError] = useState<boolean>(true);
  const [compareTime, setCompareTime] = useState<boolean>(true);
  //

  const [data, setData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationYear: "",
    ISBN: "",
    coverImageUrl: "",
  });

  const productCtx = useProductCtx();

  // const handleOnchange = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = event.target;
  //     setData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   },
  //   []
  // );

  const handleOnchange = (value: string, key: string) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // hàm check time 2 lớn hơn time 1
  const compareTimes = (time1: string, time2: string): boolean => {
    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

    if (!timeRegex.test(time1) || !timeRegex.test(time2)) {
      setTimeError(false);
    }

    const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
    const [hours2, minutes2, seconds2] = time2.split(":").map(Number);

    if (hours1 > hours2) {
      return false;
    } else if (hours1 === hours2) {
      if (minutes1 > minutes2) {
        return false;
      } else if (minutes1 === minutes2) {
        return seconds1 <= seconds2;
      }
    }

    return true;
  };

  const handleSubmit = useCallback(async () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
    const numberRegex = /^\d+$/;
    const whitespaceRegex = /\s/;

    const checkDate: boolean = dateRegex.test(data?.publicationYear);
    const checkNumber: boolean = numberRegex.test(data?.ISBN);
    // const checkTimeCheckin: boolean = timeRegex.test(data?.checkIn_time);
    // const checkTimeCheckout: boolean = timeRegex.test(data?.checkOut_time);
    // const checkCompareTime: boolean = compareTimes(
    //   data?.checkIn_time,
    //   data?.checkOut_time
    // );

    // if (!checkDate || data?.date === '') {
    //   setDateError(false);
    // } else if (!checkTimeCheckin || data?.checkIn_time === '') {
    //   setTimeError(false);
    // } else if (!checkTimeCheckout || data?.checkOut_time === '') {
    //   setTimeError(false);
    // } else if (!checkCompareTime) {
    //   setCompareTime(false);
    // } else {
    if (!checkDate || data?.publicationYear === '') {
      setDateError(false);
    } else if (!checkNumber || data?.ISBN === '') {
      setNumberError(false);
    } else {
      await productCtx?.createProduct({
        title: data?.title,
        author: data?.author,
        genre: data?.genre,
        publicationYear: data?.publicationYear,
        ISBN: data?.ISBN,
        coverImageUrl: data?.coverImageUrl,
      });
      productCtx?.getListProduct();
      onClose();
      toast("Created", {
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
  }, [data, onClose, productCtx]);

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
              placeholder={"Enter Title"}
              onChange={(e) => handleOnchange(e.target.value, "title")}
            />
          </div>
          <div>
            Author
            <input
              type="text"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"author"}
              placeholder={"Enter Author"}
              onChange={(e) => handleOnchange(e.target.value, "author")}
            />
          </div>
          <div>
            Genre
            <input
              type="text"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"genre"}
              placeholder={"Enter Genre"}
              onChange={(e) => handleOnchange(e.target.value, "genre")}
            />
          </div>
          <div>
            PublicationYear
            <input
              type="text"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"publicationYear"}
              placeholder={"Enter PublicationYear"}
              onChange={(e) =>
                handleOnchange(e.target.value, "publicationYear")
              }
            />
            {(!dateError) && (
              <p style={{ color: "red" }}>Date is required same YYYY:MM:DD</p>
            )}
          </div>
          <div>
            ISBN
            <input
              type="text"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"ISBN"}
              placeholder={"Enter ISBN"}
              onChange={(e) => handleOnchange(e.target.value, "ISBN")}
            />
            {(!numberError) && (
              <p style={{ color: "red" }}>This value is required Number</p>
            )}
          </div>
          <div>
            CoverImage URL
            <input
              type="text"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name={"coverImageUrl"}
              placeholder={"Enter CoverImage URL"}
              onChange={(e) => handleOnchange(e.target.value, "coverImageUrl")}
            />
          </div>
        </div>
      </div>
    );
  }, [handleOnchange]);

  return (
    <Modal
      onClose={onClose}
      content={contentModal}
      title="Create New Item"
      onSubmit={handleSubmit}
      contentBottom={
        <button className={classes.submit} onClick={handleSubmit}>
          OK
        </button>
      }
    />
  );
};

export default ModalCreateNew;
