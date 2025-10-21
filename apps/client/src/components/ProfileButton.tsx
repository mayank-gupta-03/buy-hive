"use client";

import { UserButton } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfileButton = () => {
  const router = useRouter();

  const handleNavigateToOrders = () => {
    router.push("/orders");
  };

  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="See Orders"
          labelIcon={<ShoppingBag className="w-4 h-4" />}
          onClick={handleNavigateToOrders}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default ProfileButton;
