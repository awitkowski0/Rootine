import {useSignIn} from "@clerk/clerk-react";
import {useMemo, useState} from "react";
import {Link, useLocation} from "wouter";
import {motion} from "framer-motion";
import {Input} from "../components/ui/Input";
import {Button} from "../components/ui/Button";
import {DINOS} from "../data/dinos";
import {Instagram, Twitter} from "lucide-react";
import * as React from "react";

export default function Login() {
    const {isLoaded, signIn, setActive} = useSignIn();
    const [, setLocation] = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Pick a random dino for the footer
    const randomDino = useMemo(() => {
        return DINOS[Math.floor(Math.random() * DINOS.length)];
    }, []);

    // Handle standard email/password login
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === "complete") {
                await setActive({session: result.createdSessionId});
                setLocation("/"); // Redirect to dashboard
            } else {
                console.log(result);
            }
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.errors?.[0]?.longMessage || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Discord Social Login
    const handleDiscordLogin = async () => {
        if (!isLoaded) return;
        try {
            await signIn.authenticateWithRedirect({
                strategy: "oauth_discord",
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/",
            });
        } catch (err: any) {
            console.error("Discord Login Error:", err);
            setError("Failed to connect with Discord.");
        }
    };

    return (
        <div
            className="min-h-screen bg-dark-green flex flex-col items-center justify-center p-4 font-display relative overflow-hidden">
            {/* Main Card Container */}
            <motion.div
                initial={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                className="w-full max-w-[402px] rounded-[50px] shadow-2xl overflow-hidden mb-8 z-10"
            >
                {/* Main Section - Form Area */}
                <div className="bg-primary-green">
                    {/* Top Section - Logo Background */}
                    <div
                        className="bg-[#EAEBDC] h-[350px] rounded-b-[50px] flex items-center justify-center relative overflow-hidden">
                        <div className="w-[300px] h-[300px] flex items-center justify-center">
                            <img
                                src="/rootine_logo_no_background.png"
                                alt="Rootine Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                    <div className={"p-8 pt-10 min-h-[400px]"}>
                        {/* Discord Button */}
                        <Button
                            className="w-full mb-6 bg-[#EEEEEE] text-text-black border-2 border-black/5 hover:bg-white py-4 rounded-2xl flex items-center justify-center gap-3 text-lg font-thin shadow-sm"
                            onClick={handleDiscordLogin}
                        >
                            <img src="/discord_logo.png" alt="Discord" className="w-6 h-5"/>
                            Continue with Discord
                        </Button>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/30"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-[#ACBD8D] px-2 text-white font-medium">OR LOGIN WITH EMAIL</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                autoComplete="email"
                                className="bg-white border-none placeholder:text-gray-400"
                            />

                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                autoComplete="current-password"
                                className="bg-white border-none placeholder:text-gray-400"
                            />

                            {error && (
                                <p className="text-white text-sm font-medium text-center bg-rose-red/20 p-2 rounded-lg">
                                    {error}
                                </p>
                            )}

                            <Button
                                type="submit"
                                className="w-full py-4 text-lg rounded-2xl mt-4 bg-accent-yellow text-white hover:bg-[#ffe175] font-bold shadow-sm"
                                isLoading={isLoading}
                            >
                                Sign In
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link href="/sign-up"
                                  className="text-white hover:text-accent-yellow transition-colors font-bold">
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="w-full max-w-[400px] flex items-end justify-between px-4 pb-4">
                {/* Left: Random Dino */}
                <div className="w-16 h-16">
                    <img src={randomDino.image} alt="Dino Footer"
                         className="w-full h-full object-contain drop-shadow-xl"/>
                </div>

                {/* Center: Text */}
                <div className="mb-4 text-center">
                    <h3 className="font-display text-1xl text-rootine-bg drop-shadow-md">Rooting for You!</h3>
                </div>

                {/* Right: Social Links */}
                <div className="flex gap-2 mb-4">
                    <a href="#"
                       className="bg-transparent text-white p-2 rounded-full hover:scale-110 transition-transform">
                        <Instagram size={18}/>
                    </a>
                    <a href="#"
                       className="bg-transparent text-white p-2 rounded-full hover:scale-110 transition-transform">
                        <Twitter size={18}/>
                    </a>
                </div>
            </div>
        </div>
    );
}
