import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

let temp;
const date = [];

const MyProduct = () => {
  const [myProducts, setMyProducts] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const getMyProduct = async () => {
    const response = await axios.get("http://localhost:5000/products/me");
    setMyProducts(response.data);
    for (let i = 0; i < response.data.length; i++) {
      temp = new Date(response.data[i].updatedAt);
      date.push(temp.toDateString());
    }
  };

  useEffect(() => {
    getMyProduct();
  }, []);

  const handleDelete = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5000/products/${uuid}`);
      getMyProduct();
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="container">
      <Link to="/products/add">
        <Button variant="success" className="mb-4 btn-hover">
          Add Product
        </Button>
      </Link>
      <div className="row grid-scroll">
        {myProducts &&
          myProducts.map((product, i) => {
            return (
              <div className="col-md-3 mb-4" key={i}>
                <Card
                  style={{ width: "18rem" }}
                  className="shadow d-flex justify-content-center"
                >
                  <Card.Img variant="top" src="/images/logo.png" alt="contoh" />
                  <Card.Body>
                    <Card.Title>Created By: {product.user.name}</Card.Title>
                    <Card.Text>Nama Barang: {product.name}</Card.Text>
                    <Card.Text>Harga: {product.price}</Card.Text>
                    <div className="border-black">
                      {user && user.name === product.user.name && (
                        <Link to={`/products/edit/${product.uuid}`}>
                          <Button
                            variant="warning"
                            className="btn-fill-default"
                          >
                            Update
                          </Button>
                        </Link>
                      )}
                    </div>
                    <div className="mt-3">
                      <Button
                        variant="danger"
                        className="btn-fill-default"
                        onClick={() => {
                          handleDelete(product.uuid);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">{date[i]}</small>
                  </Card.Footer>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyProduct;
