import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  getSelectedCategory,
} from "../redux/slices/productsSlice";
import { fetchAsyncProducts } from "../redux/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Rate } from "antd";
import { addToCart } from "../redux/slices/cartSlice";

function ProductList() {
  const { Meta } = Card;
  const dispatch = useDispatch();
  const productsList = useSelector(getAllProducts);
  const selectedCategory = useSelector(getSelectedCategory);

  useEffect(() => {
    dispatch(fetchAsyncProducts());
  }, [dispatch]);

  const onClick = (product) => {
    console.count("tiklandi");
    dispatch(addToCart(product));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexFlow: "row wrap",
        margin: "10px 0 10px 0",
      }}
    >
      {productsList
        ?.filter((product) => {
          if (selectedCategory.length > 0) {
            return product.category === selectedCategory;
          } else {
            return true;
          }
        })
        ?.map((product, index) => (
          <Card
            key={index}
            hoverable
            style={{
              width: 240,
              margin: 20,
              borderRadius: 10,
            }}
            cover={
              <img
                alt="product"
                src={product.image}
                style={{ height: 200, width: 150, padding: 10 }}
              />
            }
          >
            <Meta title={product.title} />
            <Rate
              allowHalf
              disabled
              defaultValue={product?.rating?.rate}
              style={{ fontSize: 15 }}
            />
            <div
              style={{
                fontSize: "18px",
                fontFamily: "oxygen-bold",
                fontWeight: 700,
              }}
            >
              {product.price} TL
            </div>
            <br />
            <div style={{ display: "grid" }}>
              <Button
                type="primary"
                style={{ borderRadius: 10 }}
                onClick={() => onClick(product)}
                product={product}
              >
                Add to cart
              </Button>
            </div>
          </Card>
        ))}
      <style jsx="true">
        {`
          .ant-card-bordered .ant-card-cover > cover img {
            display: "flex";
            justify-content: "center";
          }
        `}
      </style>
    </div>
  );
}
export default ProductList;
