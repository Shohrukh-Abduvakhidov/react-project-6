import { EditFilled } from "@ant-design/icons";
import { Modal , Input } from "antd";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
function EditModal({ id, category, name, setData }) {
  const Api = "https://to-dos-api.softclub.tj/api/categories";

  const [isOpenEdit, setEdit] = useState(false);
  const [editName, setName] = useState(name);

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const ModalOpen = () => {
    setEdit(true);
  };

  const editUser = async (e) => {
    e.preventDefault()
    if (!editName.trim()) {
      alert("Введите новое имя!");
      return;
    }

    try {
      const response = await fetch(`${Api}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, id }),
      });

      const updatedUser = await response.json();

      if (updatedUser.data) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, name: editName } : item
          )
        );
      } else {
        console.error("Не удалось обновить данные:", updatedUser);
      }

      setEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <EditFilled
        style={{ color: "blue", fontSize: "20px", cursor: "pointer" }}
        onClick={ModalOpen}
      >
        Edit
      </EditFilled>

      <Modal
        title={"Edit User"}
        open={isOpenEdit}
        onOk={editUser}
        onCancel={() => setEdit(false)}
        footer={null}
      >
        <form action="" onSubmit={editUser}>
        <Input
          placeholder="Name..."
          value={editName}
          onChange={(e) => setName(e.target.value)}
          style={{ color: "black", border: "2px solid black" }}
        />
        <div className="flex gap-[20px] lg:ml-[300px] my-[10px]">
        <Button variant="outlined" onClick={() => setEdit(false)}>Cancel</Button>
        <Button variant="contained" type="submit">Save</Button>
        </div>
        </form>
      </Modal>
    </>
  );
}

export default EditModal;
