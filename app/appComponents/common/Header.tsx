"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  const user = useUser();
 
  return (
    <div className="w-full py-4 ]">
      <div className="container mx-auto">
        <div className="w-full flex items-center justify-between">
          <div className="text-2xl font-bold shrink-0">
            <Image
              src="/logos/pixora-logo-large.svg"
              alt="Logo"
              width={140}
              height={60}
            />
          </div>
          <nav className="flex items-center gap-5">
            <a
              href="#"
              className="text-gray-700 hover:text-secondary font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-secondary font-medium"
            >
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-2">
            {!user.isSignedIn ? (
              <SignInButton mode="modal">
                <Button
                  size={"lg"}
                  className="cursor-pointer"
                  variant="default"
                >
                  Get Started{" "}
                </Button>
              </SignInButton>
            ) : (
              <UserButton />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
