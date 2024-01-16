import React, { FC, useState, Suspense, useCallback, useEffect } from "react";
import cx from "classnames";
import classes from "./home.module.scss";
import TableHome from "./tableHome";
import { useProductCtx } from "@/hooks/useProduct";

const CreateNewModal = React.lazy(() => import("../modals/ModalCreateNew.tsx"));

const HomePage: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const productCtx = useProductCtx();

  useEffect(() => {
    const payload = {
      page: 1,
      size: 10
    }
    productCtx?.getListProduct(payload);
  }, []);

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <div className={cx("Container", classes.Wrapper)}>
      <div className={classes.projectName}>Final Test</div>
      <div className={classes.tableWrapper}>
        <div className={classes.headerTable}>
          <div className={classes.tableName}>Book</div>
          <div className={classes.createNew} onClick={() => setShowModal(true)}>
            Create A New Book
          </div>
        </div>
        <TableHome data={productCtx?.listProduct?.data?.data} />
      </div>
      {showModal && (
        <Suspense fallback={null}>
          <CreateNewModal isOpen={showModal} onClose={handleClose} />
        </Suspense>
      )}
    </div>
  );
};

export default HomePage;
