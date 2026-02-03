"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
    User,
    Package,
    Heart,
    Settings,
    MapPin,
    CreditCard,
    LogOut,
    ChevronRight,
    Star,
    Sparkles,
    ShieldCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/products/ProductCard";

const mockOrders = [
    {
        id: "#GLT-8829",
        date: "Feb 12, 2024",
        status: "Delivered",
        total: 124.50,
        items: 3,
        image: "/images/products/product_glitter_gold_01.png"
    },
    {
        id: "#GLT-8742",
        date: "Jan 28, 2024",
        status: "Processing",
        total: 56.00,
        items: 2,
        image: "/images/products/product_glitter_rose_02.png"
    }
];

export default function AccountPage() {
    const [activeTab, setActiveTab] = React.useState("dashboard");
    const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);
    const [user, setUser] = React.useState<{ email: string } | null>(null);
    const router = useRouter();
    const { wishlistItems, wishlistCount } = useWishlist();

    React.useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const userEmail = localStorage.getItem("userEmail");

        if (isLoggedIn !== "true") {
            router.push("/login");
        } else {
            setUser({ email: userEmail || "sarah@example.com" });
            setIsCheckingAuth(false);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        router.push("/");
    };

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen bg-pearl-white flex items-center justify-center pt-32">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-champagne-gold/20 border-t-champagne-gold rounded-full animate-spin mx-auto" />
                    <p className="font-heading text-xl text-dark-luxury animate-pulse">Entering GLITTER Space...</p>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-pearl-white pb-20 pt-32">
            <div className="container mx-auto px-4">
                {/* Account Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                    <div className="flex items-center gap-6">
                        <div className="relative w-24 h-24 rounded-full border-4 border-champagne-gold/30 p-1">
                            <div className="w-full h-full rounded-full bg-dark-luxury flex items-center justify-center text-champagne-gold overflow-hidden">
                                <User size={40} />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-champagne-gold text-dark-luxury p-1.5 rounded-full shadow-lg border-2 border-white">
                                <Star size={14} fill="currentColor" />
                            </div>
                        </div>
                        <div>
                            <h1 className="font-heading text-3xl md:text-4xl font-bold text-dark-luxury">Welcome back, {user?.email.split('@')[0] || 'Sarah'}</h1>
                            <p className="text-warm-gray flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-success" />
                                Gold Member since 2024
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none border-gray-200" onClick={handleLogout}>
                            <LogOut size={18} className="mr-2" /> Logout
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Navigation Sidebar */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="sticky top-24 space-y-2">
                            {[
                                { id: "dashboard", icon: <Sparkles size={18} />, label: "Dashboard" },
                                { id: "orders", icon: <Package size={18} />, label: "Orders" },
                                { id: "wishlist", icon: <Heart size={18} />, label: "Wishlist" },
                                { id: "address", icon: <MapPin size={18} />, label: "Addresses" },
                                { id: "payment", icon: <CreditCard size={18} />, label: "Payment" },
                                { id: "settings", icon: <Settings size={18} />, label: "Settings" },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-bold transition-all text-sm uppercase tracking-widest ${activeTab === item.id
                                        ? "bg-dark-luxury text-white shadow-luxury-glow"
                                        : "text-warm-gray hover:bg-champagne-gold/10 hover:text-dark-luxury"
                                        }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 min-w-0">
                        {activeTab === "dashboard" && (
                            <div className="space-y-8 animate-fade-in">
                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <Card variant="default" className="text-center p-8 bg-gradient-to-br from-white to-champagne-gold/5">
                                        <Package className="mx-auto mb-4 text-champagne-gold" size={32} />
                                        <h3 className="text-3xl font-bold text-dark-luxury">12</h3>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Orders</p>
                                    </Card>
                                    <Card variant="default" className="text-center p-8 bg-gradient-to-br from-white to-rose-gold/5">
                                        <Heart className="mx-auto mb-4 text-rose-gold" size={32} />
                                        <h3 className="text-3xl font-bold text-dark-luxury">{wishlistCount}</h3>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Wishlist Items</p>
                                    </Card>
                                    <Card variant="default" className="text-center p-8 bg-gradient-to-br from-white to-dark-luxury/5">
                                        <Star className="mx-auto mb-4 text-dark-luxury" size={32} />
                                        <h3 className="text-3xl font-bold text-dark-luxury">2,450</h3>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Glitter Points</p>
                                    </Card>
                                </div>

                                {/* Recent Activity / Banner */}
                                <Card variant="glass" className="relative p-12 overflow-hidden group">
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src="/images/bg_glitter_texture_01.png"
                                            alt="Glitter"
                                            fill
                                            className="object-cover opacity-10 group-hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                    <div className="relative z-10 max-w-lg">
                                        <h2 className="font-heading text-3xl font-bold text-dark-luxury mb-4">You&apos;re 250 points away from a FREE Shimmer Pot!</h2>
                                        <p className="text-warm-gray mb-8">Keep shining! Your gold status gives you early access to our upcoming Midnight collection.</p>
                                        <Button className="shadow-luxury-glow">Claim My Rewards</Button>
                                    </div>
                                </Card>

                                {/* Recent Orders Preview */}
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="font-heading text-2xl font-bold text-dark-luxury">Recent Orders</h2>
                                        <button onClick={() => setActiveTab("orders")} className="text-sm font-bold text-champagne-gold-dark hover:underline flex items-center gap-1">
                                            View All <ChevronRight size={16} />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {mockOrders.map((order) => (
                                            <Card key={order.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6">
                                                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                                    <Image src={order.image} alt="Order" fill className="object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0 text-center sm:text-left">
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                                                        <h4 className="font-bold text-dark-luxury">Order {order.id}</h4>
                                                        <Badge variant={order.status === "Delivered" ? "outline" : "outline"} className={order.status === "Delivered" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>
                                                            {order.status}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-warm-gray">{order.date} • {order.items} Items</p>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <p className="font-bold text-xl text-dark-luxury">${order.total.toFixed(2)}</p>
                                                    <Button variant="ghost" size="sm" className="mt-1">Order Details</Button>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "orders" && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="font-heading text-3xl font-bold text-dark-luxury mb-8">Order History</h2>
                                <Card className="p-8 text-center text-gray-400">
                                    <div className="max-w-xs mx-auto space-y-4">
                                        <Package size={48} className="mx-auto mb-4 opacity-20" />
                                        <p>You have made 12 orders in the last 12 months.</p>
                                        <Button variant="outline" className="w-full">Download Order History</Button>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {activeTab === "settings" && (
                            <div className="space-y-8 animate-fade-in">
                                <h2 className="font-heading text-3xl font-bold text-dark-luxury mb-8">Personal Settings</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Card variant="default" className="p-8">
                                        <div className="flex items-center gap-4 mb-6">
                                            <User className="text-champagne-gold" />
                                            <h3 className="font-bold">Profile Info</h3>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-1">Full Name</label>
                                                <p className="font-medium text-dark-luxury">Sarah Jenkins</p>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-1">Email Address</label>
                                                <p className="font-medium text-dark-luxury">sarah@example.com</p>
                                            </div>
                                            <Button variant="outline" size="sm" className="w-full mt-4">Edit Profile</Button>
                                        </div>
                                    </Card>

                                    <Card variant="default" className="p-8">
                                        <div className="flex items-center gap-4 mb-6">
                                            <ShieldCheck className="text-success" />
                                            <h3 className="font-bold">Security</h3>
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-sm text-warm-gray">Password last changed 3 months ago.</p>
                                            <Button variant="outline" size="sm" className="w-full">Change Password</Button>
                                            <Button variant="outline" size="sm" className="w-full">Enable 2FA</Button>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        )}

                        {activeTab === "wishlist" && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="font-heading text-3xl font-bold text-dark-luxury mb-8">My Wishlist</h2>
                                {wishlistItems.length === 0 ? (
                                    <div className="text-center py-20 bg-gray-50 rounded-xl">
                                        <Heart size={48} className="mx-auto mb-4 text-gray-300" />
                                        <h3 className="text-xl font-bold text-dark-luxury mb-2">Your wishlist is empty</h3>
                                        <p className="text-warm-gray mb-6">Save your favorite luxury items here.</p>
                                        <Link href="/collections/all">
                                            <Button>Explore Collection</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                        {wishlistItems.map(product => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Fallback for other tabs in this demo */}
                        {["address", "payment"].includes(activeTab) && (
                            <div className="py-20 text-center animate-fade-in">
                                <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
                                    <Settings size={32} />
                                </div>
                                <h2 className="text-2xl font-bold text-dark-luxury mb-2">Section Coming Soon</h2>
                                <p className="text-warm-gray">We are currently perfecting the {activeTab} section to give you the best experience.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
