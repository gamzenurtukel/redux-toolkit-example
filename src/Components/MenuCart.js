import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Menu, Badge, Button } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartList } from "../redux/slices/cartSlice";
import { getAllProducts } from "../redux/slices/productsSlice";

function MenuCart() {
  const cartItems = useSelector(cartList);
  const productList = useSelector(getAllProducts);

  return (
    <div>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.SubMenu
          key="SubMenu"
          title={
            <Link to="/cart">
              <Badge size="small" offset={[7, 0]} count={cartItems?.length}>
                Cart
              </Badge>
            </Link>
          }
          icon={<ShoppingCartOutlined />}
          style={{
            marginRight: 10,
          }}
        >
          <Menu.ItemGroup title={"My cart (" + cartItems?.length + " product)"}>
            {cartItems?.map((cart) => (
              <Menu.Item key={cart.id}>
                <p>{productList?.find((item) => item.id === cart.id)?.title}</p>
              </Menu.Item>
            ))}
            <Menu.Item key="button">
              <Button type="primary">
                <Link to="/cart">Go to cart</Link>
              </Button>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
      </Menu>
      <style jsx="true">
        {`
          .ant-layout-header .ant-menu {
            justify-content: space-evenly;
            padding-left: 0;
            box-shadow: 0 3px 6px 4px rgba(0, 0, 0, 0.12) !important;
          }
          .ant-menu-horizontal > .ant-menu-submenu::after {
            border-bottom: none !important;
            transition: none !important;
          }
        `}
      </style>
    </div>
  );
}
export default MenuCart;
