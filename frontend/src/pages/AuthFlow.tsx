import { useSignIn, useSignUp, useClerk } from "@clerk/clerk-react";
import { useState, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { DINOS } from "../data/dinos";
import { Instagram, Twitter } from "lucide-react";
import * as React from "react";

type AuthMode = "login" | "signup" | "verify";

interface AuthFlowProps {
  initialMode?: AuthMode;
}

export default function AuthFlow({ initialMode = "login" }: AuthFlowProps) {
  const { isLoaded: isSignInLoaded, signIn, setActive: setSignInActive } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
  const clerk = useClerk();
  const [, setLocation] = useLocation();

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sync mode with prop if it changes (e.g. navigation)
  useEffect(() => {
    setMode(initialMode);
    setError("");
    // Also reset form fields mostly
  }, [initialMode]);

  // Pick a random dino for the footer
  const randomDino = useMemo(() => {
    return DINOS[Math.floor(Math.random() * DINOS.length)];
  }, []);

  const clearErrors = () => setError("");

  // --- Handlers ---

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignInLoaded) return;
    setIsLoading(true);
    clearErrors();

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setSignInActive({ session: result.createdSessionId });
        setLocation("/");
      } else {
        console.log("Login result:", result);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      // Fallback to hosted login page for configuration/fatal errors
      const isConfigError = err.errors?.some((e: any) => 
        e.code !== "form_password_incorrect" && 
        e.code !== "form_identifier_not_found"
      );
      
      if (isConfigError) {
         clerk.redirectToSignIn();
         return;
      }
      
      setError(err.errors?.[0]?.longMessage || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignUpLoaded) return;
    setIsLoading(true);
    clearErrors();

    try {
      await signUp.create({
        emailAddress: email,
        username,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setMode("verify");
    } catch (err: any) {
      console.error("SignUp error:", err);
      // Fallback: If username triggers invalid parameter error, try creating account without it
      const isUsernameError = err.errors?.some((e: any) => 
        e.code === 'form_param_nil' || 
        (e.message && e.message.includes('username'))
      );

      if (isUsernameError && username) {
        try {
           await signUp.create({
            emailAddress: email,
            password,
          });
          await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
          setMode("verify");
          return; // Exit success path
        } catch (retryErr: any) {
           // If even the fallback fails, redirect to hosted flow
           clerk.redirectToSignUp();
           return;
        }
      } else {
         // for other fatal errors (strategy not allowed etc)
         const isConfigError = err.errors?.some((e: any) => 
            e.code === 'strategy_not_allowed'
         );
         if (isConfigError) {
             clerk.redirectToSignUp();
             return;
         }

        setError(err.errors?.[0]?.longMessage || "Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignUpLoaded) return;
    setIsLoading(true);
    clearErrors();

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setSignUpActive({ session: result.createdSessionId });
        setLocation("/onboarding");
      } else {
        console.error(result);
        setError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.errors?.[0]?.longMessage || "Invalid code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscordLogin = async () => {
    if (!isSignInLoaded || !isSignUpLoaded) return;
    clearErrors();
    
    try {
       await signIn.authenticateWithRedirect({
        strategy: "oauth_discord",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: mode === "signup" ? "/onboarding" : "/",
      });
    } catch (err: any) {
      console.error("Discord Login Error:", err);
      // If our custom button fails (strategy blocked etc), send them to hosted page where it might work (or they see why)
      clerk.redirectToSignIn(); 
    }
  };

  // --- Renders ---

  const renderForm = () => {
    if (mode === "verify") {
      return (
        <motion.div
            key="verify-container"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
             <form onSubmit={handleVerify} className="space-y-4">
                <div className="text-center mb-4">
                     <p className="text-gray-600 text-sm">
                        We sent a code to <span className="font-bold">{email}</span>
                    </p>
                </div>
                 <Input
                    label=""
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="123456"
                    className="bg-white border-none placeholder:text-gray-400"
                />
                 <Button
                    type="submit"
                    className="w-full py-4 text-lg rounded-2xl mt-4 bg-accent-yellow text-white hover:bg-[#ffe175] font-bold shadow-sm"
                    isLoading={isLoading}
                >
                    Verify & Start
                </Button>
            </form>
            <div className="mt-4 text-center">
                 <button 
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-gray-500 text-sm hover:text-black transition-colors"
                 >
                    Back to Sign Up
                 </button>
            </div>
        </motion.div>
      );
    }

    return (
        <motion.form
            key={mode === "login" ? "login-form" : "signup-form"}
            initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
            onSubmit={mode === "login" ? handleLogin : handleSignUp} 
            className="space-y-4"
        >
            {mode === "signup" && (
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    autoComplete="username"
                    className="bg-white border-none placeholder:text-gray-400"
                />
            )}

            <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={mode === "login" ? "Email or Username" : "Email"}
                autoComplete="email"
                className="bg-white border-none placeholder:text-gray-400"
            />

            <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                className="bg-white border-none placeholder:text-gray-400"
            />

            <Button
                type="submit"
                className="w-full py-4 text-lg rounded-2xl mt-4 bg-accent-yellow text-white hover:bg-[#ffe175] font-bold shadow-sm"
                isLoading={isLoading}
            >
                {mode === "login" ? "Sign In" : "Create Account"}
            </Button>
        </motion.form>
    );
  };

  return (
    <div className="min-h-screen bg-dark-green flex flex-col items-center justify-center p-4 font-display relative overflow-hidden">
      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[402px] rounded-[50px] shadow-2xl overflow-hidden mb-8 z-10"
      >
        {/* Main Section - Form Area */}
        <div className="bg-primary-green">
          {/* Top Section - Logo Background */}
          <div className="bg-rootine-bg h-[350px] rounded-b-[50px] flex items-center justify-center relative overflow-hidden">
            <div className="w-[300px] h-[300px] flex items-center justify-center">
              <img
                src="/rootine_logo_no_background.png"
                alt="Rootine Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="p-8 pt-10 min-h-[400px]">
            {/* Discord Button */}
            {mode !== "verify" && (
                <>
                <Button
                className="w-full mb-6 bg-gray-v-light text-text-black border-2 border-black/5 hover:bg-white py-4 rounded-2xl flex items-center justify-center gap-3 text-lg font-thin shadow-sm"
                onClick={handleDiscordLogin}
                >
                <img src="/discord_logo.png" alt="Discord" className="w-6 h-5" />
                {mode === "login" ? "Continue with Discord" : "Join with Discord"}
                </Button>

                <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-primary-green px-2 text-white font-medium uppercase">
                    OR {mode === "login" ? "LOGIN" : "SIGN UP"} WITH EMAIL
                    </span>
                </div>
                </div>
                </>
            )}

            {/* Error Message */}
            {error && (
                <div className="mb-4">
                     <p className="text-white text-sm font-medium text-center bg-rose-red/20 p-2 rounded-lg">
                    {error}
                </p>
                </div>
            )}

            <AnimatePresence mode="wait">
                {renderForm()}
            </AnimatePresence>

            {/* Toggle Logic */}
            {mode !== "verify" && (
                <div className="mt-6 text-center">
                    {mode === "login" ? (
                         <div
                            onClick={() => {
                                setMode("signup");
                                setLocation("/sign-up"); 
                            }}
                            className="text-white hover:text-accent-yellow transition-colors font-bold cursor-pointer"
                        >
                        Create an account
                        </div>
                    ) : (
                         <div
                            onClick={() => {
                                setMode("login");
                                setLocation("/login");
                            }}
                            className="text-white hover:text-accent-yellow transition-colors font-bold cursor-pointer"
                        >
                        Already have an account? Sign In
                        </div>
                    )}
                </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="w-full max-w-[400px] flex items-end justify-between px-4 pb-4">
        {/* Left: Random Dino */}
        <div className="w-16 h-16">
          <img
            src={randomDino.image}
            alt="Dino Footer"
            className="w-full h-full object-contain drop-shadow-xl"
          />
        </div>

        {/* Center: Text */}
        <div className="mb-4 text-center">
          <h3 className="font-display text-1xl text-rootine-bg drop-shadow-md">
            Rooting for You!
          </h3>
        </div>

        {/* Right: Social Links */}
        <div className="flex gap-2 mb-4">
          <a
            href="#"
            className="bg-transparent text-white p-2 rounded-full hover:scale-110 transition-transform"
          >
            <Instagram size={18} />
          </a>
          <a
            href="#"
            className="bg-transparent text-white p-2 rounded-full hover:scale-110 transition-transform"
          >
            <Twitter size={18} />
          </a>
        </div>
      </div>
      <div id="clerk-captcha" />
    </div>
  );
}
