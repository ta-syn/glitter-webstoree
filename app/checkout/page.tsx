import * as React from "react";
import { Metadata } from "next";
import ClientCheckoutPage from "./client-page";

export const metadata: Metadata = {
    title: "Checkout | Glitter",
    description: "Securely complete your purchase.",
};

export default function CheckoutPage() {
    return <ClientCheckoutPage />;
}
