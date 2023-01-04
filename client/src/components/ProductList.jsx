import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

let temp;
const date = [];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const { user } = useSelector((state) => state.auth);

  const GetProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
    console.log(response.data);
    for (let i = 0; i < response.data.length; i++) {
      temp = new Date(response.data[i].updatedAt);
      date.push(temp.toDateString());
    }
  };

  useEffect(() => {
    GetProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search === "" || search === undefined) {
      setMsg("");
      GetProducts();
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/search/${search}`
        );
        setProducts(response.data);
        setMsg("");
      } catch (error) {
        if (error) {
          setMsg(error.response.data.msg);
        }
      }
    }
  };

  const handleChange = async (e) => {
    if (e === "" || e === undefined) {
      setMsg("");
      GetProducts();
    } else {
      try {
        const response = await axios.get(`http://localhost:5000/search/${e}`);
        setProducts(response.data);
        setMsg("");
      } catch (error) {
        if (error) {
          setMsg(error.response.data.msg);
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="search-box">
        <Form
          className="d-flex flex-row justify-content-center"
          onSubmit={handleSubmit}
        >
          <Form.Group>
            <Form.Text muted>Cari Barang</Form.Text>
            <Form.Control
              type="text"
              className="px-10"
              onChange={(e) => {
                handleChange(e.target.value);
              }}
            />
          </Form.Group>
          <div>
            <Button className="btn-grey mx-2 mt-4" type="submit">
              Search
            </Button>
          </div>
        </Form>
        <div className="text-center">
          <Form.Text muted>{msg}</Form.Text>
        </div>
      </div>

      <div className="row grid-scroll">
        {products &&
          products.map((product, i) => {
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
                      {product.user.name !== user.name ? (
                        <Link>
                          <Button
                            variant="warning"
                            className="btn-fill-default"
                          >
                            Beli
                          </Button>
                        </Link>
                      ) : (
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
                        className="btn-fill-default btn-grey"
                        onClick={() => {}}
                      >
                        Kirim Pesan
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

export default ProductList;
