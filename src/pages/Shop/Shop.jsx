import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsData } from "../../redux/slice/products.slice";
import { NavLink } from "react-router-dom";
import { Addtocart } from "../../redux/slice/cart.slice";
import { Addtocart1 } from "../../redux/slice/cart1.slice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  getFavorites,
  removeFavorite,
  saveFavorite,
} from "../../redux/slice/favorite.slice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Pagination from "../Hook/Pagination";
import useSearch from "../Hook/useSearch";
function Shop() {
  const [sort, setSort] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsData());
    dispatch(getFavorites("abcd"));
  }, []);

  const productsData = useSelector((state) => state.product);
  const favorites = useSelector(
    (state) => state.favorite.favorites.items || []
  );
  console.log(favorites);

  const { setSearch, filteredData } = useSearch(productsData.products, [
    "name",
    "description",
    "price",
  ]);

  const handleFilter = () => {
    let fData = [...filteredData];
    // console.log(fData);

    if (sort === "az") {
      fData = fData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "za") {
      fData = fData.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === "lh") {
      fData = fData.sort((a, b) => a.price - b.price);
    } else if (sort === "hl") {
      fData = fData.sort((a, b) => b.price - a.price);
    }

    return fData;
  };

  const fData = handleFilter();

  console.log(fData);

  const { pdata, handleNext, handlePrev, setCPage, page, cPage } = Pagination(
    fData,
    5
  );

  return (
    <div>
      {/* Modal Search Start */}
      <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Search by keyword
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body d-flex align-items-center">
              <div className="input-group w-75 mx-auto d-flex">
                <input
                  type="search"
                  className="form-control p-3"
                  placeholder="keywords"
                  aria-describedby="search-icon-1"
                />
                <span id="search-icon-1" className="input-group-text p-3">
                  <i className="fa fa-search" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Search End */}
      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Shop</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active text-white">Shop</li>
        </ol>
      </div>
      {/* Single Page Header End */}
      {/* Fruits Shop Start*/}
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <h1 className="mb-4">Fresh fruits shop</h1>
          <div className="row g-4">
            <div className="col-lg-12">
              <div className="row g-4">
                <div className="col-xl-3">
                  <div className="input-group w-100 mx-auto d-flex">
                    <input
                      type="search"
                      onChange={(event) => setSearch(event.target.value)}
                      className="form-control p-3"
                      placeholder="keywords"
                      aria-describedby="search-icon-1"
                    />
                    <span id="search-icon-1" className="input-group-text p-3">
                      <i className="fa fa-search" />
                    </span>
                  </div>
                </div>
                <div className="col-6" />
                <div className="col-xl-3">
                  <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                    <label htmlFor="fruits">Default Sorting:</label>
                    <select
                      id="fruits"
                      name="fruitlist"
                      className="border-0 form-select-sm bg-light me-3"
                      form="fruitform"
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="az">A to Z</option>
                      <option value="za">Z to A</option>
                      <option value="lh">Low to High</option>
                      <option value="hl">High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row g-4">
                <div className="col-lg-3">
                  <div className="row g-4">
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <h4>Categories</h4>
                        <ul className="list-unstyled fruite-categorie">
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#">
                                <i className="fas fa-apple-alt me-2" />
                                Apples
                              </a>
                              <span>(3)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#">
                                <i className="fas fa-apple-alt me-2" />
                                Oranges
                              </a>
                              <span>(5)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#">
                                <i className="fas fa-apple-alt me-2" />
                                Strawbery
                              </a>
                              <span>(2)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#">
                                <i className="fas fa-apple-alt me-2" />
                                Banana
                              </a>
                              <span>(8)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#">
                                <i className="fas fa-apple-alt me-2" />
                                Pumpkin
                              </a>
                              <span>(5)</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <h4 className="mb-2">Price</h4>
                        <input
                          type="range"
                          className="form-range w-100"
                          id="rangeInput"
                          name="rangeInput"
                          min={0}
                          max={500}
                          defaultValue={0}
                          oninput="amount.value=rangeInput.value"
                        />
                        <output
                          id="amount"
                          name="amount"
                          min-velue={0}
                          max-value={500}
                          htmlFor="rangeInput"
                        >
                          0
                        </output>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <h4>Additional</h4>
                        <div className="mb-2">
                          <input
                            type="radio"
                            className="me-2"
                            id="Categories-1"
                            name="Categories-1"
                            defaultValue="Beverages"
                          />
                          <label htmlFor="Categories-1"> Organic</label>
                        </div>
                        <div className="mb-2">
                          <input
                            type="radio"
                            className="me-2"
                            id="Categories-2"
                            name="Categories-1"
                            defaultValue="Beverages"
                          />
                          <label htmlFor="Categories-2"> Fresh</label>
                        </div>
                        <div className="mb-2">
                          <input
                            type="radio"
                            className="me-2"
                            id="Categories-3"
                            name="Categories-1"
                            defaultValue="Beverages"
                          />
                          <label htmlFor="Categories-3"> Sales</label>
                        </div>
                        <div className="mb-2">
                          <input
                            type="radio"
                            className="me-2"
                            id="Categories-4"
                            name="Categories-1"
                            defaultValue="Beverages"
                          />
                          <label htmlFor="Categories-4"> Discount</label>
                        </div>
                        <div className="mb-2">
                          <input
                            type="radio"
                            className="me-2"
                            id="Categories-5"
                            name="Categories-1"
                            defaultValue="Beverages"
                          />
                          <label htmlFor="Categories-5"> Expired</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <h4 className="mb-3">Featured products</h4>
                      <div className="d-flex align-items-center justify-content-start">
                        <div
                          className="rounded me-4"
                          style={{ width: 100, height: 100 }}
                        >
                          <img
                            src="public/assets/img/featur-1.jpg"
                            className="img-fluid rounded"
                            alt
                          />
                        </div>
                        <div>
                          <h6 className="mb-2">Big Banana</h6>
                          <div className="d-flex mb-2">
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star" />
                          </div>
                          <div className="d-flex mb-2">
                            <h5 className="fw-bold me-2">2.99 $</h5>
                            <h5 className="text-danger text-decoration-line-through">
                              4.11 $
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-start">
                        <div
                          className="rounded me-4"
                          style={{ width: 100, height: 100 }}
                        >
                          <img
                            src="public/assets/img/featur-2.jpg"
                            className="img-fluid rounded"
                            alt
                          />
                        </div>
                        <div>
                          <h6 className="mb-2">Big Banana</h6>
                          <div className="d-flex mb-2">
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star" />
                          </div>
                          <div className="d-flex mb-2">
                            <h5 className="fw-bold me-2">2.99 $</h5>
                            <h5 className="text-danger text-decoration-line-through">
                              4.11 $
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-start">
                        <div
                          className="rounded me-4"
                          style={{ width: 100, height: 100 }}
                        >
                          <img
                            src="public/assets/img/featur-3.jpg"
                            className="img-fluid rounded"
                            alt
                          />
                        </div>
                        <div>
                          <h6 className="mb-2">Big Banana</h6>
                          <div className="d-flex mb-2">
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star" />
                          </div>
                          <div className="d-flex mb-2">
                            <h5 className="fw-bold me-2">2.99 $</h5>
                            <h5 className="text-danger text-decoration-line-through">
                              4.11 $
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center my-4">
                        <a
                          href="#"
                          className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100"
                        >
                          Vew More
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <img
                          src="public/assets/img/banner-fruits.jpg"
                          className="img-fluid w-100 rounded"
                          alt
                        />
                        <div
                          className="position-absolute"
                          style={{
                            top: "50%",
                            right: 10,
                            transform: "translateY(-50%)",
                          }}
                        >
                          <h3 className="text-secondary fw-bold">
                            Fresh <br /> Fruits <br /> Banner
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row g-4 justify-content-center">
                    {pdata?.map((v) => {
                      const isFavorite =
                        Array.isArray(favorites) && favorites.includes(v.id);
                      console.log(isFavorite);

                      return (
                        <div key={v.id} className="col-md-6 col-lg-6 col-xl-4">
                          <NavLink to={"/shopDetail/" + v.id}>
                            <div className="rounded position-relative fruite-item">
                              <div className="fruite-img position-relative">
                                <img
                                  src={`../public/assets/img/${v.products_image}`}
                                  className="img-fluid w-100 h-300 rounded-top"
                                  alt=""
                                />

                                <div
                                  style={{
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                    zIndex: 10,
                                    cursor: "pointer",
                                    borderRadius: "50%",
                                    padding: "5px",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                  }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    if (isFavorite) {
                                      dispatch(
                                        removeFavorite({
                                          userId: "abcd",
                                          item: { id: v.id },
                                        })
                                      );
                                    } else {
                                      dispatch(
                                        saveFavorite({
                                          userId: "abcd",
                                          item: { id: v.id },
                                        })
                                      );
                                    }
                                  }}
                                >
                                  {isFavorite ? (
                                    <FavoriteIcon sx={{ color: "red" }} />
                                  ) : (
                                    <FavoriteBorderIcon
                                      sx={{ color: "white" }}
                                    />
                                  )}
                                </div>
                              </div>

                              <div
                                className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                                style={{ top: 10, left: 10 }}
                              >
                                Fruits
                              </div>
                              <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                <h4 className="whitetext">{v.name}</h4>
                                {/* <p>{v.description}</p> */}
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                  <p className="text-dark fs-5 fw-bold mb-0 whitetext">
                                    {` $ ${v.price} / kg`}
                                  </p>
                                  <a
                                    onClick={(event) =>
                                      event.preventDefault(
                                        dispatch(
                                          Addtocart1({
                                            userId: "abcd",
                                            cart: { id: v.id, qty: 1 },
                                          })
                                        )
                                      )
                                    }
                                    className="btn border border-secondary rounded-pill px-3 text-primary"
                                  >
                                    <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                                    Add to cart
                                  </a>
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </div>
                      );
                    })}

                    <div className="col-12">
                      <div className="pagination d-flex justify-content-center mt-5">
                        <a href="#" className="rounded" onClick={handlePrev}>
                          «
                        </a>

                        {page.map((_, i) => (
                          <a
                            className="rounded"
                            key={i}
                            onClick={() => setCPage(i + 1)}
                            active={cPage === i + 1}
                          >
                            {i + 1}
                          </a>
                        ))}

                        <a href="#" className="rounded" onClick={handleNext}>
                          »
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Fruits Shop End*/}
    </div>
  );
}

export default Shop;
