import React from 'react'
import Card from '../components/card'
export default function Volunteer() {
  return (
    <div className='flex flex-row items-center justify-center w-full h-screen bg-white'
    style={{backgroundImage: "url('https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Production+Library/10-02-2022-UNICEF-UN0457861-DRC.jpg/image1170x530cropped.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat", }}>
        <Card title="Select patient" data="volunteer" link="/AllPatients"/>
        <Card title="Treat new patient" data="volunteer" link="/TreatPatients" />
    </div>
  )
}
