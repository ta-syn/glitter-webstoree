import * as React from "react";
import { Metadata } from "next";
import ClientCartPage from "./client-page";

export const metadata: Metadata = {
    title: "Shopping Cart | Glitter",
    description: "View your selected luxury cosmetics and proceed to secure checkout.",
};

export default function CartPage() {
    return <ClientCartPage />;
}
