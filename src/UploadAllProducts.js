import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

function UploadAllProducts() {
  const menProducts = [
  ];

  const womenProducts = [
   ];

  const kidsProducts = [
  { img: "https://m.media-amazon.com/images/I/811Ynd0M1ML._UF1000,1000_QL80_.jpg", name: "Pop-up Book", price: "₹299" }
  ];

  const uploadAll = async () => {
    try {
      for (const item of menProducts) {
        await addDoc(collection(db, "menProducts"), item);
      }
      for (const item of womenProducts) {
        await addDoc(collection(db, "womenProducts"), item);
      }
      for (const item of kidsProducts) {
        await addDoc(collection(db, "kidsProducts"), item);
      }
      alert("✅ Men, Women, and Kids products uploaded successfully!");
    } catch (error) {
      console.error("❌ Error uploading products:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Upload Men, Women & Kids Products to Firebase</h1>
      <button onClick={uploadAll} style={{
        padding: "15px 30px",
        fontSize: "18px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}>
        Upload All Products
      </button>
    </div>
  );
}

export default UploadAllProducts;
