import React, { useState } from "react";
import styles from "./AddProduct.module.scss";
import Card from "../../card/Card";
import { db, storage } from "../../../firebase/config";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Loader from "../../loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const AddProducts = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);
  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed(0);
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully");
        });
      }
    );
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });

      setIsLoading(false);
      setProduct({ ...initialState });
      setUploadProgress(0);

      toast.success("Product saved successfully");
      navigate("/admin/all-proudcts");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h1>{detectForm(id, "Add New Product", "Edit Product")}</h1>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label>Product Name:</label>
            <input
              type='text'
              placeholder='Product name'
              name='name'
              value={product.name}
              required
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product Image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}%`
                      : `Upload Completed ${uploadProgress}%`}
                  </div>
                </div>
              )}
              <input
                type='file'
                accept='image/*'
                name='image'
                placeholder='Product image'
                onChange={(e) => handleImageChange(e)}
              />

              {product.imageURL === "" ? null : (
                <input
                  type='text'
                  name='imageURL'
                  value={product.imageURL}
                  placeholder='Image URL'
                  required
                  disabled
                />
              )}
            </Card>

            <label>Product Price:</label>
            <input
              type='number'
              placeholder='Product price'
              name='price'
              value={product.price}
              required
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product Category:</label>
            <select
              name='category'
              value={product.category}
              required
              onChange={(e) => handleInputChange(e)}
            >
              <option value='' disabled>
                -- Choose Product Category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

            <label>Product Company/Brand:</label>
            <input
              type='text'
              placeholder='Product brand'
              name='brand'
              value={product.brand}
              required
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product Description:</label>
            <textarea
              name='desc'
              value={product.desc}
              rows='10'
              cols='30'
              onChange={(e) => handleInputChange(e)}
            ></textarea>

            <button type='submit' className='--btn --btn-primary'>
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProducts;
