"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { withRouter } from "next/router";
import { auth } from "../config/firebase";
import { db, app } from "../config/firebase";
import Button from "@mui/material/Button";
import {
  collection,
  getDoc,
  onSnapshot,
  where,
  getDocs,
  getFirestore,
  query,
  doc,
} from "firebase/firestore";
import Link from "next/link";

export default function PatientInfo(props) {
  const name = props.searchParams.name;
  const [patientInfo, setPatientInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  // const disease = query.diseaseHistory.disease.split(",");

  const collectionRef = collection(db, "AllPatients");

  // Perform the query
  const q = query(collectionRef, where("name", "==", name));

  // Get the results
  const getData = async() => {
     setLoading(true);
    await getDocs(q)
      .then((querySnapshot) => {
        
        if (!querySnapshot.empty) {
          
          // The document(s) with name="rakes" exist(s)
          querySnapshot.forEach((documentSnapshot) => {
            const documentData = documentSnapshot.data();
            console.log("Document data:", documentData);
            setPatientInfo(documentData);

          });
        } else {
          console.log("Document not found.");
        }
      })
      .catch((error) => {
        console.error("Error getting documents:", error);
      });
      setLoading(false);
     
      
  };

  useEffect(() => {
   
    getData();
    
  }, []);

  return (
    <div>
    {loading? <h1>Loading...</h1> :<>
      <div className="w-full h-20 flex bg-blue-400 items-center justify-center">
        <h1 className="text-xl font-semibold">Patient Info</h1>
      </div>
      <div className="flex flex-row">
        <div className="w-1/2 h-screen bg-white flex flex-col px-10 py-20">
          <h1 className="text-black text-md ">Name:</h1>
          <div className="flex w-full h-14 bg-gray-200 rounded">
            <h1 className="text-md font-semibold text-black px-5 self-center">
              {patientInfo.name}
            </h1>
          </div>
          <h1 className="text-black mt-10">Age:</h1>
          <div className="flex w-full h-14 bg-gray-200 rounded">
            <h1 className="text-md font-semibold text-black px-5 self-center">
              {patientInfo.age}
            </h1>
          </div>
          <h1 className="text-black mt-10">Gender:</h1>
          <div className="flex w-full h-14 bg-gray-200 rounded">
            <h1 className="text-md font-semibold text-black px-5 self-center">
              {patientInfo.gender}
            </h1>
          </div>
          <h1 className="text-black mt-10">Country:</h1>
          <div className="flex w-full h-14 bg-gray-200 rounded">
            <h1 className="text-md font-semibold text-black px-5 self-center">
              {patientInfo.country}
            </h1>
          </div>
        </div>
        <div className="w-1/2 h-screen bg-white flex flex-col px-10 py-20 ">
          <h1 className="text-black">Disease History:</h1>
          { patientInfo.diseaseHistory?.map((disease, i) => {
              return(
          <div className="overflow-scroll">
          <div className="flex w-full py-2 bg-gray-200 rounded flex-col mb-4">
            <h1 className="text-md font-semibold text-black px-5 self-start">
              {i+1}. Disease: {disease.disease}
            </h1>
            <h1 className="text-md font-semibold text-black px-5 self-start">
              Prescription: {disease.prescription}
            </h1>
          </div>
          </div>
              )
          })
          }
          <Button aria-description="treat this patient" >
            <Link href={{pathname:'/TreatPatients', query:{
            existing: true,
            name: patientInfo.name,
            gender: patientInfo.gender,
            age: Number(patientInfo.age),
            country: patientInfo.country,
            }}}>Treat Patient</Link>
          </Button>
        </div>
      </div>
      </>
    }
    </div>
  );
}
