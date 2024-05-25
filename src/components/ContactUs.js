import React from "react";
import { Header } from "./common/Header";
import { TitleContact } from "./TitleContact";
import { FooterCom } from "./common/FooterCom";
// import { ContactImageform } from './ContactImageform'
import { GetInTouch } from "./GetInTouch";
import Contactform from "./_auth/signupbackend/Contactform";

export const ContactUs = () => {
  return (
    <>
      <div
        className="bg-cover bg-center h-230"
        style={{ backgroundImage: "url(assets/header.png)" }}
      >
        <Header />
        <TitleContact />
      </div>
      <div className="mt-5">
        <GetInTouch />
      </div>
      <Contactform />
      <FooterCom />
    </>
  );
};
