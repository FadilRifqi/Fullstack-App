import React,{useState} from "react";
import { Button, Form } from "react-bootstrap";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const FormTambahProduct = () => {
  const [name,setName] = useState("")
  const [price,setPrice] = useState(0)
  const [msg,setMsg] = useState("")
  const navigate = useNavigate();


  const handleAdd = async(e)=>{
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/products',{
        name:name,
        price:price
      });
      navigate('/dashboard')
    } catch (error) {
      if(error){
        setMsg(error.response.data.msg);
      }
    }
  }
  return (
    <div className="container form-edit-add">
      <div className="row d-flex justify-content-center ">
        <div className="col-md-8 form-box px-5 background-white">
          <div className="login-title">
            <h3 className="title">Tambah Product</h3>
          </div>
          <Form onSubmit={handleAdd}>
          <Form.Label>
            {msg && <Form.Text className="text-muted">{msg}</Form.Text>}
          </Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" value={name} placeholder="Nama Barang" onChange={(e)=>{setName(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label></Form.Label>
              <Form.Control type="number" value={price} min={0} placeholder="Harga" onChange={(e)=>{setPrice(e.target.value)}}/>
            </Form.Group>
            <Form.Label>Gambar</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="file"
              name="file"
            />
            </Form.Group>
            <Form.Label></Form.Label>
            <div className="border-black mt-2">
              <Button type="submit" variant="success" className="btn-fill-default">
                Add
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FormTambahProduct;
