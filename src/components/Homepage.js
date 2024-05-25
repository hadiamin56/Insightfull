import React from "react";

import {Header} from "./common/Header";
import { SlideInfo } from "./SlideInfo";
import { InfoCards } from "./InfoCards";
import { FooterCom } from "./common/FooterCom";
import { PracticeSectors } from "./PracticeSectors";
import { TitlePractice } from "./TitlePractice";
import { TitlleWhoWeAre } from "./TitlleWhoWeAre";
import { WhoWeAre } from "./WhoWeAre";
import { TitleGetInTo } from "./TitleGetInTo";
import { GetInTouch } from "./GetInTouch";
import { Analytics } from "./Analytics";
import { ContactBar } from "./ContactBar";
export const Homepage = () => {
  return (
    <div className="">
      
      <Header className='bg-cover bg-center ' style={{backgroundImage: 'url(assets/cover.png)'}} />
      <SlideInfo/>
      <InfoCards/>
      <Analytics/>
      <TitlePractice/>
      <PracticeSectors/>
      <TitlleWhoWeAre/>
      <WhoWeAre/>
      <TitleGetInTo/>
      <GetInTouch/>
      <ContactBar/>
      <FooterCom/>
    </div>
  )
}
