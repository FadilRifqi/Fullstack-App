import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormEditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const GetProduct = async()=>{
    const response = await axios.get(`http://localhost:5000/products/${id}`)
    const product = response.data
    console.log(product);
    setName(product.name)
    setPrice(product.price)
  }

  useEffect(() => {
    GetProduct()
  },[])
  

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, {
        name: name,
        price: price,
      });
      navigate("/dashboard");
    } catch (error) {
      if (error) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div className="container form-edit-add">
      <div className="row d-flex justify-content-center ">
        <div className="col-md-8 form-box px-5 background-white">
          <div className="login-title">
            <h3 className="title">Edit Product</h3>
          </div>
          <Form onSubmit={handleEdit}>
            <Form.Label>
              {msg && <Form.Text className="text-muted">{msg}</Form.Text>}
            </Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                value={name}
                placeholder="Nama Barang"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label></Form.Label>
              <Form.Control
                type="number"
                value={price}
                min={0}
                placeholder="Harga"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Label>Gambar</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="file" name="file" />
            </Form.Group>
            <Form.Label></Form.Label>
            <div className="border-black mt-2">
              <Button
                type="submit"
                variant="warning"
                className="btn-fill-default"
              >
                Edit
              </Button>
            </div>
            <div className="border-black mt-2">
              <Button
                type="submit"
                variant="danger"
                className="btn-fill-default"
              >
                Hapus
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduct;
