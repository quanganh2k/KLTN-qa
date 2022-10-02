import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ShoeContext } from "../contexts/ShoeContext";
import Header from "./Header";
import Footer from "./Footer";
import { pathImg } from "../contexts/constants";


const ProductDetails = () => {
  const {
    shoeState: { shoes },
    getProductDetails,
  } = useContext(ShoeContext);

  const {id} = useParams();

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  console.log(shoes)
  

  return (
    <>
    <Header />
    <div className="container">
        <div className="product-details">
            <div className="row">
                <div className="col-6">
                    <img src={`${pathImg}/${shoes.image}`} alt="Hình ảnh sản phẩm"/>
                </div>
                <div className="col-6">
                    <h3 className="product-details__name">{shoes.name}</h3>
                    <p className="product-details__price">{shoes.price}</p>
                    <p className="product-details__color">{shoes.color}</p>
                    <p className="product-details__size">{shoes.name}</p>
                    <p className="product-details__quatity">{shoes.inStock}</p>
                    <p className="product-details__description">{shoes.description}</p>
                    

                </div>
            </div>
        </div>
    </div>
    {/* <Footer /> */}
    </>
  )
};

export default ProductDetails;
