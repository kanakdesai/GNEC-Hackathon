"use client";
import React from 'react'
import Image from "next/image";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Doctor from "../../../public/icons/doctor.png";
import Volunteer from "../../../public/icons/volunteer.png";
import {auth} from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation'

import Link from "next/link";
export default function Login() {
    const [showDoc, setShowDoc] = useState(false);
  const [showVol, setShowVol] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [doctor, setDoctor] = useState(false);
  const router = useRouter()
  
  const handleDoctorSignIn = async() => {
    try{
      
      await signInWithEmailAndPassword(auth, id, password)
    
        await router.push('/DoctorDashboard')

     
     
      
  }
  catch(e){
    alert(e.message)
    console.log(e)
  }}

  const handleVolunteerSignIn = async() => {
    try{
      await signInWithEmailAndPassword(auth, id, password)
      await router.push('/Volunteer')
  }
  catch(e){
    alert(e.message)
    console.log(e)
  }}
  return (
    <div className="flex flex-row items-center justify-center">
      {showDoc ? (
        <div
          // onClick={() => setShowDoc(!showDoc)}
          className="flex w-96 h-96  px-10 py-5 items-center justify-center flex-col bg-blue-400 cursor-pointer rounded-2xl border-2 border-blue-900"
        >
          <Image
            src={Doctor}
            // width={500}
            // height={500}
            alt="Picture of the author"
            className="w-24 h-24 object-contain"
          ></Image>
          <h1 className="my-2 text-lg font-mono font-semibold">
            Doctors login
          </h1>
          <TextField
            label="UN ID"
            id="outlined-size-small"
            size="small"
            sx={{ marginBottom: 2 }}
            color="primary"
            onChange={(e) => setId(e.target.value)}
          />
          <TextField
            label="password"
            id="outlined-size-small"
            size="small"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2, color: "white" }}
          />
          

          <Button onClick={handleDoctorSignIn}   variant="contained">Login</Button>
          
        </div>
      ) : (
        <div
          onClick={() => setShowDoc(!showDoc)}
          className="flex w-96 h-96 bg-black mx-10 items-center justify-center flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 cursor-pointer rounded-2xl"
        >
          <Image
            src={Doctor}
            // width={500}
            // height={500}
            alt="Picture of the author"
            className="w-32 h-32 object-contain"
          ></Image>
          <h1 className="my-4 text-xl font-mono font-semibold">
            Doctor sign in
          </h1>
        </div>
      )}

      {showVol ? (
        <div
          // onClick={() => setShowVol(!showVol)}
          className="flex w-96 h-96  px-10 py-5 items-center justify-center flex-col mx-10 bg-[#537188] cursor-pointer rounded-2xl border-2 border-blue-900"
        >
          <Image
            src={Volunteer}
            // width={500}
            // height={500}
            alt="Picture of the author"
            className="w-24 h-24 object-contain"

          ></Image>
          <h1 className="my-2 text-lg font-mono font-semibold">
            Volunteer login for AI
          </h1>
          <TextField
            label="UN ID"
            id="outlined-size-small"
            size="small"
            sx={{ marginBottom: 2, color: "white" }}
            onChange={(e) => setId(e.target.value)}
          />
          <TextField
            label="password"
            id="outlined-size-small"
            size="small"
            type="password"
            sx={{ marginBottom: 2, color: "white" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          
            <Button onClick={handleVolunteerSignIn} variant="contained">Login</Button>

          
        </div>
      ) : (
        <div
          onClick={() => setShowVol(!showVol)}
          className="flex w-96 h-96  mx-10 items-center justify-center cursor-pointer flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl"
        >
          <Image
            src={Volunteer}
            // width={500}
            // height={500}
            alt="Picture of the author"
            className="w-32 h-32 object-contain"
          ></Image>
          <h1 className="my-4 text-xl font-mono font-semibold">
            Volunteer sign in
          </h1>
        </div>
      )}
      </div>
  )
}
