import React from "react";
import { Card, Row, Col, Image, Divider, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  cartList,
  clearAllCart,
  deleteCartItem,
} from "../redux/slices/cartSlice";
import { getAllProducts } from "../redux/slices/productsSlice";

function Cart() {
  const cartItems = useSelector(cartList);
  const productList = useSelector(getAllProducts);
  const dispatch = useDispatch();

  const cartTotalPrice = () => {
    let total = 0;
    cartItems?.map((x) => {
      const products = productList.find((product) => product.id === x.id);
      total += products.price * x.amount;
    });
    return total;
  };
  const onClick = (cartItems) => {
    dispatch(deleteCartItem(cartItems));
  };

  return (
    <div style={{ paddingTop: 10 }}>
      <Row>
        <Col flex="1 1 200px" style={{ paddingRight: 20 }}>
          <h2 style={{ fontSize: "30px" }}>
            My cart{" "}
            <span style={{ fontSize: "14px" }}>
              {" "}
              ({cartItems.length} product){" "}
            </span>
          </h2>
          <Card>
            {cartItems?.map((item) => (
              <Card type="inner" key={item.id}>
                <Row>
                  <Col span={4}>
                    <Image width={60} height={60} src={item.image} />
                  </Col>
                  <Col style={{ paddingLeft: 10 }} span={16}>
                    <p>{item.title}</p>
                    <p style={{ fontWeight: "bold" }}>{item.price} TL</p>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-start",
                    }}
                    span={4}
                  >
                    <Button type="primary" onClick={() => onClick(cartItems)}>
                      x
                    </Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </Card>
        </Col>
        <Col flex="0 1 270px">
          <Card style={{ width: 270 }}>
            <h2 style={{ fontSize: "30px" }}>{cartTotalPrice()} TL</h2>
            <Button
              type="primary"
              size="large"
              style={{ borderRadius: 10 }}
              onClick={() => dispatch(clearAllCart())}
            >
              Complete the order
            </Button>
            <Divider />
            <p>
              Sepetindekileri, alışveriş kredisine özel vade seçenekleriyle
              alabilirsin.
            </p>
            <Divider />
            <p>kargo</p>
            <p>ürünler</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Cart;
