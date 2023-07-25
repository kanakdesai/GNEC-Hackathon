"use client";
import Image from "next/image";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Doctor from "../../public/icons/doctor.png";
import Volunteer from "../../public/icons/volunteer.png";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import Login from "./components/Login";

export default function Home() {
  
  const router = useRouter()
  return (
    <main className="flex min-h-screen items-center justify-center  p-24 bg-blue-200 flex-col">
   
        <Login></Login>
    </main>
  );
}
