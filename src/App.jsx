import { useEffect, useState } from "react";
import { Button, colors } from "@mui/material";
import AddModal from "./addModal.jsx";
import EditModal from "./editModal.jsx";
import ShowModal from "./showModal.jsx";
import { DeleteFilled, EditFilled, EyeFilled } from "@ant-design/icons";

const App = () => {
  function handleClick() {
    if (localStorage.theme === "dark" || !("theme" in localStorage)) {
      //add class=dark in html element
      document.documentElement.classList.add("dark");
    } else {
      //remove class=dark in html element
      document.documentElement.classList.remove("dark");
    }

    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
    }
  }

  useEffect(() => {
    handleClick();
  }, []);
  const Api = "https://to-dos-api.softclub.tj/api/categories";
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState({});

  const [show, setShow] = useState({});
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const [openE, setOpenE] = useState(false);

  const openModalE = () => setOpenE(true);
  const closeModalE = () => setOpenE(false);
  const [openS, setOpenS] = useState(false);

  const openModalS = () => setOpenS(true);
  const closeModalS = () => setOpenS(false);

  async function get() {
    try {
      const response = await fetch(Api);
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    get();
  }, []);

  async function deleteUser(id) {
    try {
      await fetch(`${Api}?id=${id}`, {
        method: "DELETE",
      });
      get();
    } catch (error) {
      console.error(error);
    }
  }
  async function postUser(user) {
    try {
      await fetch(Api, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      get();
    } catch (error) {
      console.error(error);
    }
  }
  async function putUser(user) {
    try {
      await fetch(Api, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name: user.name, id: user.id }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  function editUser(user) {
    setEdit(user);
    openModalE();
  }
  function showUser(user) {
    setShow(user);
    openModalS();
  }

  return (
    <>
      <div className="lg:w-[90%] py-[20px] lg:py-3   lg:h-[80px] flex items-center  justify-between px-[20px]  m-auto rounded-b-2xl">
        <Button onClick={openModal} variant="contained">
          + Add New
        </Button>
        <div className="flex gap-[10px]">
          <h1
            className="text-[30px] hidden lg:block font-bold"
            onClick={handleClick}
          >
            TodoList With SWAGGER
          </h1>

          <label class="relative inline-flex items-center cursor-pointer">
            <input
              class="sr-only peer"
              value=""
              type="checkbox"
              onChange={handleClick}
              checked={localStorage.getItem("theme" == "dark")}
            />
            <div class="w-24 h-12 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-10 before:w-10 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-10 after:h-10 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"></div>
          </label>
        </div>
        <AddModal open={open} closeModal={closeModal} postUser={postUser} />
      </div>

      <div className="flex gap-[10px] flex-wrap mt-[50px] lg:mt-[20px] w-[90%] lg:w-[80%] m-auto">
        {users.length == 0 ? (
          <h1 className="absolute left-[15%] lg:left-[40%] text-[50px] text-[red]">
            NOT FOUND
          </h1>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className=" flex items-center gap-[10px] border-b-2  w-full justify-between p-2"
            >
              <h1 className="text-[20px] ">{user.name}</h1>
              <div className="flex gap-[20px]">
                <DeleteFilled
                  style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
                  onClick={() => deleteUser(user.id)}
                />
                {/* <EditFilled
                style={{ color: "blue", fontSize: "20px", cursor: "pointer" }}
                onClick={() => editUser(user)}
              /> */}
                <EditModal
                  id={user.id}
                  name={user.name}
                  category={user}
                  setData={setUsers}
                />
                <EyeFilled
                  onClick={() => showUser(user)}
                  style={{
                    color: "#00aaff",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
      <ShowModal open={openS} closeModal={closeModalS} userId={show.id} />
    </>
  );
};

export default App;
