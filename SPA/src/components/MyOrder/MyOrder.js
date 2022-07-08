import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as requests from "../../services/server";

import { MyCard } from "../MyCard/MyCard";

import styles from "./MyOrder.module.css";

export const MyOrder = () => {
  const [currentItems, setCurrentItems] = useState([]);

  console.log(...currentItems, "fdfdgdfdcurrrr");
  let token = JSON.parse(localStorage.getItem("user")).accessToken;
  // let token = JSON.parse(localStorage.getItem("user"));
  console.log(token, "token");
  useEffect(() => {
    (async () => {
      try {
        let token = JSON.parse(localStorage.getItem("user"));
        let data = await requests.getMyData(token._id);

        if (data !== undefined) {
          if (data.history) {
            setCurrentItems(data.history);
          } else {
            setCurrentItems(data);
          }
          console.log(data.history, "data");
        }
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  const deleteHandller = async (item) => {
    const id = item._id;

    let updateMyData = currentItems.filter((x) => x._id !== id);
    console.log("data", updateMyData);
    try {
      await requests.deleteOrder(id, token);
      let updateMyData = currentItems.filter((x) => x._id !== id);
      setCurrentItems(updateMyData);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h1 className={styles["art"]}>My orders</h1>

      {currentItems.length > 0 ? (
        currentItems.map((x) => (
          <MyCard key={x._id} data={x} onClick={() => deleteHandller(x)}>
            {" "}
          </MyCard>
        ))
      ) : (
        <Link to={"/create"} className={styles["link"]}>
          Make your first order, click here!
        </Link>
      )}
    </>
  );
};
