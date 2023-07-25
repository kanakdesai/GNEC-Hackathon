"use client";
import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { countries } from "../../../data/countries";
import Button from "@mui/material/Button";
import {collection, addDoc} from 'firebase/firestore'
import { db } from '../config/firebase'
import {auth} from '../config/firebase'
import { useRouter } from "next/router";



export default function TreadPatients(context) {

  const data = context.searchParams.item
  
  
  const [Gender, setGender] = useState("");
  const [Country, setCountry] = useState("");
  const [Disease, setDisease] = useState("");
  const [Prescription, setPrescription] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const collectionRef = collection(db, "AllPatients");
  const user = auth.currentUser.email

  const saveIncoming=()=>{
    if(context.searchParams.name && context.searchParams.age && context.searchParams.country && context.searchParams.gender){
       setAge(context.searchParams.age)
       setName(context.searchParams.name)
      setCountry(context.searchParams.country)
      setGender(context.searchParams.gender)
    }
    else{
      setAge(0)
      setName('')
     setCountry('')
     setGender('')
    }
  }

  const handleChange = (event) => {
    setGender(event.target.value);
  };
 console.log(data)

  const savePatient = async () => {
    try{
    await addDoc(collectionRef, {
      name: name,
      age: age,
      gender: Gender,
      country: Country,
      doctor: user,
      diseaseHistory:[
        {
          disease: Disease,
          prescription: Prescription
        }
      ]
    });
   
    alert("Patient Saved")
  } catch(e){
      alert(e.message)
      console.log(e)
    }
  }

  useEffect(() => {
    saveIncoming()
  },[]);

  return (
    <div className="bg-white flex w-screen h-screen flex-col">
      <div className="w-screen h-20 items-center justify-center flex bg-blue-400">
        <h1 className="text-black self-center text-2xl font-medium align-center">
          Prescription
        </h1>
      </div>
      <div className="w-full h-[100%] flex flex-row">
        <div className="flex flex-col w-1/2 h-full px-20 py-16 bg-gray-200">
          <h1 className="text-black text-xl my-4">Name of the Patient</h1>
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h1 className="text-black text-xl my-4">Gender</h1>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Required *</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Gender}
              label="Gender"
              onChange={handleChange}
              defaultValue={Gender}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
          
          <h1 className="text-black text-xl my-4">Age</h1>
          <TextField
            required
            id="outlined-required"
            label="Required"
            
            type="number"
            defaultValue={age}
            onChange={(e)=>setAge(Number(e.target.value))}
          />
          <h1 className="text-black text-xl my-4">Country</h1>
          <TextField 
            required
            id="outlined-required"
            label="Required"
            defaultValue={Country}
            
            onChange={(e)=>setCountry(e.target.value)}></TextField>
        
        </div>
        <div className="flex flex-col w-1/2 h-full px-20 py-16 bg-gray-200 ">
          <h1 className="text-black text-xl my-4">Disease</h1>
          <TextField
            id="outlined-multiline-static"
            label="Required *"
            multiline
            rows={4}
            defaultValue=""
            onChange={(e)=>setDisease(e.target.value)}
          />
          { data=="volunteer"?
          <Button onClick={savePatient} variant="outlined" color="success">
              Generate Prescription using A.I 
            </Button>: null

          }
          <h1 className="text-black text-xl my-4">Prescription</h1>
          <TextField
            id="outlined-multiline-static"
            label="Required *"
            multiline
            rows={4}
            defaultValue=""
            onChange={(e)=>setPrescription(e.target.value)}
          />
          <div className="flex flex-row w-full h-12 mt-12 justify-between">
            <Button onClick={()=>window.print()} variant="outlined" color="error">
              Print Prescription
            </Button>
            <Button onClick={savePatient} variant="outlined" color="success">
              Save Patient
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
