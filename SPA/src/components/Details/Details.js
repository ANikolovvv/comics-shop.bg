import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as requests from "../../services/server";
import styles from "./Details.module.css";

const Details = () => {
  const [comic, setComic] = useState({});
  const [admin, setAdmin] = useState(false);
  const [like, setLike] = useState(false);
  const [rating, setRating] = useState(0);

  let { id } = useParams();
  console.log(id, "id");

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("details",like);

  // setLike(arr.includes(user._id))

  useEffect(() => {
    requests.getData(id).then((result) => {
      console.log(result, "result");
      const user = JSON.parse(localStorage.getItem("user"));
      if (result !== undefined) {
        setComic(result);
        let num = result.userLiked.length;
        let userLiked = result.userLiked.includes(user._id);
        setRating(num);
        setLike(userLiked);
      }
    });
  }, [id]);

  const likeHandler = async (e) => {
    try {
      let like = await requests.addLike(comic._id, user);
      let num = like.userLiked.length;
      setLike(true);
      setComic(like);
      setRating(num);
      console.log(like, "like");
    } catch (error) {
      console.log(error, "like errr");
    }
  };
  return (
    <>
      <article className={styles["art"]}>
        <h1>More details</h1>
      </article>
      <div className={styles["container"]}>
        <div className={styles["product-details"]}>
          <h1>{comic.title}</h1>

          <span className={styles["hint-star star"]}>
            <i className={styles["fa fa-star"]} aria-hidden="true"></i>
            <i className={styles["fa fa-star"]} aria-hidden="true"></i>
            <i className={styles["fa fa-star"]} aria-hidden="true"></i>
            <i className={styles["fa fa-star-half-o"]} aria-hidden="true"></i>
            <i className={styles["fa fa-star-o"]} aria-hidden="true"></i>
          </span>

          <p className={styles["information"]}>{comic.description}</p>
          {user ? (
            <>
              {like === false && (
                <div className={styles["like"]}>
                  <button className={styles["btn"]} onClick={likeHandler}>
                    Like
                  </button>
                </div>
              )}
              <div className={styles["control"]}>
                <Link
                  to={`/buy-create/${comic._id}`}
                  className={styles["link"]}
                >
                  Buy
                </Link>
                {admin === true && (
                  <>
                    <button className={styles["btn"]}>Edit</button>
                    <button className={styles["btn"]}>Delete</button>
                  </>
                )}
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        <div className={styles["product-image"]}>
          <img
            src={comic.imageUrl}
            className={styles["container img"]}
            alt={comic.title}
          />

          <div className={styles["info"]}>
            <h2>The Description</h2>
            <ul>
              <li key={comic.author}>
                <strong>Author: </strong>
                {comic.author}
              </li>
              <li key={comic.price}>
                <strong>Price: </strong>
                {comic.price}
              </li>
              <li key={comic.year}>
                <strong>Release data: </strong>
                {comic.year}
              </li>
              <li key={comic.title}>
                <strong>Rating: </strong>
                {rating}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Details;
//float: right;
