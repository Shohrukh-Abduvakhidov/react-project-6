import { Modal } from "antd";
import { Input } from "antd";
import { Button } from "@mui/material";
import { useState } from "react";
const AddModal = ({ open, closeModal, postUser }) => {
  const [name, setName] = useState("");
  function addForm(e) {
    e.preventDefault();
    let newUser = {
      name: name,
    };
    postUser(newUser);
    closeModal();
    setName("");
  }
  return (
    <Modal open={open} title="Add User" onCancel={closeModal} footer={null}>
      <form action="" onSubmit={addForm}>
        <Input
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ color: "black", border: "2px solid black" }}
        />
        <div className="flex gap-[20px] lg:ml-[300px] my-[10px]">
        <Button variant="outlined" onClick={closeModal}>Cancel</Button>
        <Button variant="contained" type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddModal;
