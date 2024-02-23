import React from 'react'
import { Header } from './common/Header'
import {TitleContact} from './TitleContact'
import {FooterCom} from  './common/FooterCom'
import { ContactImageform } from './ContactImageform'

export const ContactUs = () => {
  return (
    <>
    <Header/>
    <TitleContact/>
    <ContactImageform/>
    <FooterCom/>
    </>
  )
}
