import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "antd";
import {
  fetchAsyncProductsCategory,
  setCategory,
} from "../redux/slices/productsSlice";
import { getCategoryProducts } from "../redux/slices/productsSlice";

function Navbar() {
  const categories = useSelector(getCategoryProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncProductsCategory());
  }, [dispatch]);

  const onClick = (category) => {
    dispatch(setCategory(category));
  };

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <Menu
        mode="inline"
        style={{
          height: "100%",
        }}
      >
        {categories.map((category, index) => (
          <Menu.Item key={index} onClick={() => onClick(category)}>
            {category}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}
export default Navbar;
