import React, { FC } from "react";
import classes from "./modal.module.scss";

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  content?: React.ReactElement;
  onSubmit?: () => void;
  contentBottom?: React.ReactElement;
}

const ModalCreateNew: FC<Props> = ({
  isOpen,
  onClose,
  title,
  content,
  onSubmit,
  contentBottom,
}) => {
  return (
    <div className={classes.popupBackground}>
      <div className={classes.popupContainer}>
        <div className="popup-content">
          <div className="flex justify-between pb-5">
            <h2 className="text-2xl font-bold">{title}</h2>
            <div
              className={classes.onClose}
              onClick={onClose}
            >
              Close
            </div>
          </div>
          <div>{content}</div>
          <div className={classes.bottom}>
            {contentBottom}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateNew;
