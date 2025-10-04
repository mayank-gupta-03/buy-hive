import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 flex flex-col justify-between gap-8 md:gap-0 items-center md:flex-row md:items-start bg-gray-800 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href={"/"} className="flex items-center">
          <Image src={"/logo.png"} alt="BuyHive" width={36} height={36} />
          <p className="hidden md:block text-md font-medium tracking-wider text-white">
            BuyHive.
          </p>
        </Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Contact</Link>
        <Link href={"/"}>Terms of Service</Link>
        <Link href={"/"}>Privacy Policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Products</p>
        <Link href={"/"}>All Products</Link>
        <Link href={"/"}>New Arrivals</Link>
        <Link href={"/"}>Best Sellers</Link>
        <Link href={"/"}>Sale</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Company</p>
        <Link href={"/"}>About</Link>
        <Link href={"/"}>Contact</Link>
        <Link href={"/"}>Blog</Link>
        <Link href={"/"}>Affiliate Program</Link>
      </div>
    </footer>
  );
};

export default Footer;
