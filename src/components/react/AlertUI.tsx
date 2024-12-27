import { Button } from "@nextui-org/react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("Here is your toast");

const AlertUI = () => {
  return (
    <div>
      <Button onClick={notify}>Make me a toast</Button>
      <Toaster position="top-right" />
    </div>
  );
};

export default AlertUI;
