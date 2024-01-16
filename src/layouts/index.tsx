import React, { FC, ReactNode } from "react";
import Header from "./header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <Header />
      <main {...props}>
        {children}
        <ToastContainer />
      </main>
    </>
  );
};

export default Layout;
