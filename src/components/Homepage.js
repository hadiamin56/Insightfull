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
export const Homepage = () => {
  return (
    <div className="">
      <Header/>
      <SlideInfo/>
      <InfoCards/>
      <TitlePractice/>
      <PracticeSectors/>
      <TitlleWhoWeAre/>
      <WhoWeAre/>
      <TitleGetInTo/>
      <GetInTouch/>
      <FooterCom/>
    </div>
  )
}
