"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock authentication delay
        setTimeout(() => {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", email);
            setIsLoading(false);
            router.push("/account");
        }, 1500);
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-pearl-white">
            {/* Left Side: Dynamic Visual */}
            <div className="hidden lg:flex relative items-center justify-center overflow-hidden bg-dark-luxury">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/bg_glitter_texture_01.png"
                        alt="Luxury Background"
                        fill
                        className="object-cover opacity-20 scale-110 animate-pulse"
                    />
                </div>
                <div className="relative z-10 text-center space-y-8 p-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <Sparkles className="mx-auto text-champagne-gold mb-6" size={64} />
                        <h1 className="font-heading text-6xl font-bold text-white tracking-widest mb-4">
                            GLITTER
                        </h1>
                        <p className="font-accent text-2xl italic text-champagne-gold/80">
                            Where luxury meets your inner radiance.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md space-y-10"
                >
                    <div className="text-center lg:text-left">
                        <h2 className="font-heading text-4xl font-bold text-dark-luxury mb-3">Welcome Back</h2>
                        <p className="text-warm-gray">Sign in to your exclusive Glitter dashboard.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="pl-12 h-14 bg-gray-50 border-gray-100 focus:ring-champagne-gold"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
                                <button type="button" className="text-xs font-bold text-champagne-gold-dark hover:underline uppercase tracking-widest">Forgot?</button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-12 h-14 bg-gray-50 border-gray-100 focus:ring-champagne-gold"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 text-lg font-bold shadow-luxury-glow"
                            isLoading={isLoading}
                        >
                            Sign In <ArrowRight className="ml-2" size={20} />
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-widest">
                            <span className="bg-white px-4 text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-14 border-gray-100 font-bold">
                            <Chrome size={18} className="mr-2" /> Google
                        </Button>
                        <Button variant="outline" className="h-14 border-gray-100 font-bold">
                            <Github size={18} className="mr-2" /> GitHub
                        </Button>
                    </div>

                    <p className="text-center text-sm text-gray-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="font-bold text-dark-luxury hover:text-champagne-gold-dark hover:underline">
                            Join the Glitter List
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
