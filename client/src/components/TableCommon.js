import React from "react";
import { pathImg } from "../contexts/constants";
import Table from "react-bootstrap/Table";
import "../scss/table-shoes.scss";
import CurrencyFormat from "react-currency-format";

const TableCommon = ({ title, data }) => {
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
            />
          </th>
          {title?.map((el) => {
            return <th>{el.name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data?.map((el) => {
          return (
            <>
              <tr>
                <td>
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    value=""
                    aria-label="Checkbox for following text input"
                  />
                </td>
                <td>{el?.name}</td>
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
                          <span>Size</span> {el?.size?.sizeNumber}: <span className="td-quantity">{el?.quantity} </span> sản phẩm
                        </div>
                      </React.Fragment>
                    );
                  })}
                </td>
                <td>
                  {el?.category?.name}
                </td>
                <td>
                  <span className="edit-icon">
                    <i class="fa-solid fa-pen"></i>
                  </span>
                  <span className="delete-icon">
                    <i class="fa-solid fa-trash"></i>
                  </span>
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableCommon;
