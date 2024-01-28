import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "../components/Layout/Header";
import ProductCard from "../components/Route/ProductCard";
import "../styles/styles.css";
import { getAllProducts } from "../redux/actions/product";
import { useDispatch } from "react-redux";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const { allProducts } = useSelector((state) => state.product);
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  useEffect(() => {
    let sortedData = Array.isArray(allProducts) ? [...allProducts] : [];

    if (category) {
      sortedData = sortedData.filter(
        (product) => product.category === category
      );
    }

    sortedData = sortedData.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    switch (sort) {
      case "price":
        sortedData.sort((a, b) =>
          sortOrder === "asc" ? a.price - b.price : b.price - a.price
        );
        break;
      case "name":
        sortedData.sort((a, b) =>
          sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
        break;
      case "newest":
        sortedData.sort((a, b) =>
          sortOrder === "asc"
            ? new Date(a.createdAt) - new Date(b.createdAt)
            : new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "rating":
        sortedData.sort((a, b) =>
          sortOrder === "asc" ? a.ratings - b.ratings : b.ratings - a.ratings
        );
        break;
      default:
        break;
    }

    setData(sortedData);
  }, [allProducts, category, sort, sortOrder, minPrice, maxPrice]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice") {
      setMinPrice(value);
    } else if (name === "maxPrice") {
      setMaxPrice(value);
    }
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleSort = (e) => {
    const [newSort, newSortOrder] = e.target.value.split("-");
    setSort(newSort);
    setSortOrder(newSortOrder);
  };

  return (
    <>
      <div>
        <Header activeHeading={3} />
        <br />
        <br />
        <div className='section'>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            <div>
              <label htmlFor="sort">Sort by: </label>
              <select
                id="sort"
                value={`${sort}-${sortOrder}`}
                onChange={handleSort}
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="newest-asc">Newest (Old to New)</option>
                <option value="newest-desc">Newest (New to Old)</option>
                <option value="rating-asc">Rating (Low to High)</option>
                <option value="rating-desc">Rating (High to Low)</option>
              </select>
            </div>
            <div>
              <label htmlFor="minPrice">Min Price: </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={minPrice}
                onChange={handlePriceChange}
              />
            </div>
            <div>
              <label htmlFor="maxPrice">Max Price: </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={maxPrice}
                onChange={handlePriceChange}
              />
            </div>
            {data &&
              data.map((item, index) => (
                <ProductCard key={index} data={item} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
