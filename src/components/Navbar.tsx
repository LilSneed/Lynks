import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div className="text-center flex flex-row justify-between gap-5">
          <Link href={"/"}>
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Lynks
            </h2>
          </Link>
          <nav className="flex items-center text-sm font-medium">
            <Button asChild variant="link" className="sm:inline-block hidden">
              <Link href="/dashboard">Examples</Link>
            </Button>
            <Button asChild variant="link" className="sm:inline-block hidden">
              <Link href="/login">About</Link>
            </Button>
          </nav>
        </div>
        <div className="flex flex-row justify-between gap-5 items-center">
          <SignedIn>
            <Button variant="outline" asChild className="bg-teal-600">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </SignedIn>
          <UserButton />
          <SignedOut>
            <Button variant="outline" asChild className="">
              <SignInButton>Login</SignInButton>
            </Button>

            <Button variant="outline" asChild className="bg-teal-600">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
