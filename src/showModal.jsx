import { Modal } from "antd";
import { useEffect, useState } from "react";

const ShowModal = ({ open, closeModal, userId }) => {
  const [user, setUser] = useState(null);
  const Api = "https://to-dos-api.softclub.tj/api/categories";

  async function getById() {
    try {
      const response = await fetch(`${Api}/${userId}`);
      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getById();
  }, [userId]);

  return (
    <Modal open={open} title="Show User" onCancel={closeModal} footer={null}>
      {user ? (
        <>
          <p className="text-[25px]">Name: {user.name}</p>
          <p className="text-[20px]">ID: {user.id}</p>
          <p className="text-[14px]">Info : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi voluptatem dolor ullam et beatae consequatur deleniti nobis amet ex soluta nam consequuntur quisquam rerum debitis incidunt, quaerat iure adipisci doloribus.</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
};

export default ShowModal;
