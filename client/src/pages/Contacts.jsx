import React, { useState } from "react";
import { url } from "../utils/url";
import { DotLoader } from "react-spinners";
import { useFetch } from "../utils/useFetch";
import ContactItem from "../components/ContactItem";
function Contacts() {
  let token = localStorage.getItem("token");
  let { data } = useFetch(url, token);

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className=" md:flex md:flex-wrap p-16 gap-6">
        {data ? (
          data.map((contact, i) => <ContactItem key={i} {...contact} />)
        ) : (
          <div className=" m-auto">
            <DotLoader color="#38bdf8" size={70} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Contacts;
