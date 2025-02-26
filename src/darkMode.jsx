import React, { useEffect } from "react";
import { Button } from "@mui/material";
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
    handleClick()
  },[])
  return (
    <>
      <div className="w-[90%] flex gap-[20px] mt-[100px] m-auto py-[50px]">
        <div className="w-[600px]">
          <h1 className="text-[50px] py-[20px] font-bold">Our Story</h1>
          <p className="text-[20px] font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
            architecto! Animi vero accusantium placeat optio impedit quia
            delectus beatae nam vitae. Quia non quibusdam molestias voluptates
            debitis vero eum vel?
          </p>
          <p className="text-[20px] py-[30px] font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
            architecto! Animi vero accusantium placeat optio impedit quia
            delectus beatae nam vitae. Quia non quibusdam molestias voluptates
            debitis vero eum vel?
          </p>
          <Button className="bg-black" variant="contained" onClick={handleClick}>click</Button>
        </div>
        <div className="bg-[purple] w-[600px] h-[450px]"></div>
      </div>
    </>
  );
};

export default App;
