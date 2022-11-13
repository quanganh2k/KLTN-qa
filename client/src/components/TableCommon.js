import React, { Fragment, useContext } from "react";
import { pathImg } from "../contexts/constants";
import Table from "react-bootstrap/Table";
import "../scss/table-shoes.scss";
import CurrencyFormat from "react-currency-format";
import { ShoeContext } from "../contexts/ShoeContext";
import { Link } from "react-router-dom";

const TableCommon = ({
  title,
  data,
  idShoeCheckBox,
  setIdShoeCheckBox,
  allId,
}) => {
  

  const handleCheckBoxAll = () => {
    let isCheck = true;
    allId.forEach((el) => {
      if (idShoeCheckBox.some((item) => item !== el)) {
        isCheck = false;
      }
    });
    if (!isCheck) {
      setIdShoeCheckBox([]);
    } else {
      setIdShoeCheckBox(allId);
    }
  };

  const handleClickCheckbox = (value) => {
    console.log("itemEl", value);
    if ((idShoeCheckBox || []).some((item) => item === value)) {
      setIdShoeCheckBox(idShoeCheckBox.filter((item) => item !== value));
    } else {
      setIdShoeCheckBox((prev) => {
        return [...prev, value];
      });
    }
  };

  return (
    <Table bordered>
      <thead>
        <tr>
          <th>
            <input
              className="form-check-input mt-0"
              type="checkbox"
              value=""
              aria-label="Checkbox for following text input"
              onChange={() => handleCheckBoxAll()}
            />
          </th>
          {title?.map((el) => {
            return <th key={el.id}>{el.name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data?.map((el) => {
          return (
            <Fragment key={el._id}>
              <tr>
                <td>
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    value={el._id}
                    checked={(idShoeCheckBox || []).some(
                      (item) => item === el._id
                    )}
                    aria-label="Checkbox for following text input"
                    onChange={(e) => handleClickCheckbox(e.target.value)}
                  />
                </td>
                <td className="td-name">{el?.name}</td>
                <td width={"12%"} className="td-img">
                  <img src={`${pathImg}/${el?.image}`} />
                </td>
                <td>{el?.color}</td>
                <td>
                  <CurrencyFormat
                    value={el?.price}
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    suffix={"đ"}
                  />
                </td>
                <td>
                  {el?.sizes?.map((el) => {
                    return (
                      <React.Fragment key={el?._id}>
                        <div className="size-css">
                          <span>Size</span> {el?.size?.sizeNumber}:{" "}
                          <span className="td-quantity">{el?.quantity} </span>{" "}
                          sản phẩm
                        </div>
                      </React.Fragment>
                    );
                  })}
                </td>
                <td>
                  {el?.sizes?.map((el) => {
                    return (
                      <React.Fragment key={el?._id}>
                        <div className="size-css">
                          <span>Size</span> {el?.size?.sizeNumber}:{" "}
                          <span className="td-quantity">{el?.inStock} </span>{" "}
                          sản phẩm
                        </div>
                      </React.Fragment>
                    );
                  })}
                </td>
                <td>{el?.category?.name}</td>
                <td>
                  <Link to={`/admin/shoes/update/${el?._id}`} className="edit-icon">
                    {" "}
                    <i
                      className="fa-solid fa-pen"
                      // onClick={() => chooseShoe(el?._id)}
                    ></i>
                  </Link>
                </td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableCommon;
