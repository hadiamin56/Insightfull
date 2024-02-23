// 'use client'; // Assuming it's a Next.js component, 'use client' is not required here.

import { Footer } from 'flowbite-react';
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter
} from 'react-icons/bs';
import React from 'react';


export const FooterCom = () => {
  return (
    <div className="flex-grow  flex flex-col">
      <Footer className="w-full  bg-[#1A8F60] text-white md:flex md:items-center md:justify-between">
        <div className="w-full p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-8">
            <div className="mb-4 md:mb-0">
              <img
                src="assets/1.jpg"
                className="w-[150px] shadow-[#1A8F60] shadow-sm border border-1 "
                alt="Logo"
              />
              <Footer.LinkGroup className="flex-col space-y-4 mt-2 text-white">
                <Footer.Link className="hover:underline" href="#">
                Copyright © 2024 Insigntsfull Limited.
All rights reserved. Privacy Policy. Cookie Policy.
                </Footer.Link>
                
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title className="mb-6 text-sm font-semibold uppercase text-white" title="Company" />
              <Footer.LinkGroup className="flex-col space-y-4 text-white">
                <Footer.Link className="hover:underline" href="#">
                  About
                </Footer.Link>
                <Footer.Link className="hover:underline" href="#">
                  Services
                </Footer.Link>
                <Footer.Link className="hover:underline" href="#">
                  Industries
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title className="mb-6 text-sm font-semibold uppercase text-white" title="Help Center" />
              <Footer.LinkGroup className="flex-col space-y-4 text-white">
                <Footer.Link className="hover:underline" href="#">
                  Twitter
                </Footer.Link>
                <Footer.Link className="hover:underline" href="#">
                  Facebook
                </Footer.Link>
                <Footer.Link className="hover:underline" href="#">
                  Instagram
                </Footer.Link>
                <Footer.Link className="hover:underline" href="#">
                  Whatsapp
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title className="mb-6 text-sm font-semibold uppercase text-white" title="Legal" />
              <Footer.LinkGroup className="flex-col space-y-4 text-white">
                <Footer.Link className="hover:underline" href="#">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link className="hover:underline" href="#">
                  Licensing
                </Footer.Link>
                <Footer.Link className="hover:underline" href="#">
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
          <div className="w-full bg-white px-4 py-6 sm:flex sm:items-center sm:justify-between shadow-lg mt-4">
            <Footer.Copyright className="text-sm text-green-800 sm:text-center" href="#" by="InsightsFull" year={2024} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon className="text-green-500" href="#" icon={BsFacebook} />
              <Footer.Icon className="text-green-500" href="#" icon={BsInstagram} />
              <Footer.Icon className="text-green-500" href="#" icon={BsTwitter} />
              <Footer.Icon className="text-green-500" href="#" icon={BsGithub} />
              <Footer.Icon className="text-green-500" href="#" icon={BsDribbble} />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};
