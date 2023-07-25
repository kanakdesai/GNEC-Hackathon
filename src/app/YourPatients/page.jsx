"use client";
import React from "react";
import { db } from "../config/firebase";
import { getDocs, collection, query, where, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function YourPatients() {
  const [patients, setPatients] = useState();
  
  const doctor = auth.currentUser.email;
  
  useEffect(() => {
    const getPatients = async () => {
      try {
        const data = await getDocs(collection(db, "AllPatients"));
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPatients(filterData);
        console.log(filterData,doctor);
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    };
    getPatients();
  }, []);

  return (
    <div className="flex h-screen w-screen bg-slate-100  flex-col">
      <div className="w-screen h-20 flex justify-center items-center bg-blue-200">
        <h1 className="text-xl font-semibold ">Your Patients</h1>
      </div>
      <div className="flex flex-row justify-between px-10 py-2 mt-2 items-center mx-6 h-16 ">
        <h1 className="text-gray-800 w-4  font-mono font-semibold">No.</h1>
        <h1 className="text-gray-800 w-24 font-mono font-semibold">Name</h1>
        <h1 className="text-gray-800 w-4 font-mono font-semibold">Age</h1>
        <h1 className="text-gray-800 w-12 font-mono font-semibold">Gender</h1>
        <h1 className="text-gray-800 w-24 font-mono font-semibold">Country</h1>
      </div>
      <div className="flex h-full flex-col overflow-scroll">
        {patients?.map((patient, index) => {
          return(
            patient.doctor == doctor?
          <div key={index} className="cursor-pointer flex flex-row justify-between px-10 py-2 bg-slate-200 mt-2 items-center mx-6 h-16 rounded-xl">
           
             <h1 className="text-black w-4">{index + 1}.</h1>
            <Link 
              href={{
                pathname: "/PatientInfo",
                query: {
                  name: patient.name,
                 
                  
                },
              }}
            >
            <h1 className="text-black w-24 ">
              {patient.name.charAt(0).toUpperCase() + patient.name.slice(1)}
            </h1>
            </Link>
            <h1 className="text-black w-4">{patient.age}</h1>
            <h1 className="text-black w-12 text-center">{patient.gender}</h1>
            <h1 className="text-black w-24 text-center">{patient.country}</h1>

          
          </div>:null
        )})}
      </div>
    </div>
  );
}
