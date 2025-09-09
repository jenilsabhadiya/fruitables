import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsData } from "../../redux/slice/products.slice";
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getFavorites, removeFavorite } from "../../redux/slice/favorite.slice";

function Favorite() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsData());
    dispatch(getFavorites("abcd"));
  }, [dispatch]);

  const productsData = useSelector((state) => state.product.products);
  const favorites = useSelector(
    (state) => state.favorite.favorites.items || []
  );

  const fData = productsData.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <div className="container">
      <h2 className="my-4">My Favorite Products</h2>

      {fData.length === 0 ? (
        <p>No favorite products found.</p>
      ) : (
        <div className="row whitetext" style={{ paddingTop: "110px" }}>
          {fData.map((v) => {
            return (
              <div key={v.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <NavLink to={`/shopDetail/${v.id}`}>
                    <img
                      src={`../public/assets/img/${v.products_image}`}
                      alt={v.name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </NavLink>
                  <div className="card-body boxFavorite">
                    <h5 className="card-title whitetext">{v.name}</h5>
                    <p className="card-text">${v.price} / kg</p>

                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        dispatch(
                          removeFavorite({
                            userId: "abcd",
                            item: { id: v.id },
                          })
                        );
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <FavoriteIcon sx={{ color: "red" }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Favorite;
