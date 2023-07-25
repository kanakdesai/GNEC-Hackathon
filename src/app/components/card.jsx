import React from "react";
import Link from "next/link";
export default function Card({ title, link, data }) {
  return (
    <div className="w-1/4 h-1/3 bg-gray-400 mx-6 rounded-xl flex items-center justify-center opacity-80 hover:bg-slate-300">
      <Link className=" flex items-center justify-center w-full h-full" 
       href={{
            pathname: link,
            query: {item: data}, // the data
          }}
      >
      <h1 className="text-2xl font-semibold">
      {title}
      </h1>
      </Link>
     
    </div>
  );
}
