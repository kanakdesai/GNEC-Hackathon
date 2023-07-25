import React from 'react'
import Card from '../components/card'
import Link from 'next/link'

export default function DoctorDashboard() {
  return (
    <div className='flex flex-row items-center justify-center w-full h-screen bg-white'
    style={{backgroundImage: "url('https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Production+Library/10-02-2022-UNICEF-UN0457861-DRC.jpg/image1170x530cropped.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat", }}
    >
      
      <Card data="doctor" title="Treat new patient" link="/TreatPatients">
      </Card>
      
      <Card data="doctor" title="All patients" link="/AllPatients"></Card>
      <Card data="doctor" title="Your patients" link="/YourPatients"></Card>
     </div>
  )
}
