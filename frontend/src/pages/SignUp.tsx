import { useSignUp } from "@clerk/clerk-react";
import { useState } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [, setLocation] = useLocation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle standard email/password sign up
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);
    setError("");

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send email verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifying(true);
    } catch (err: any) {
      console.error("SignUp error:", err);
      setError(err.errors?.[0]?.longMessage || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Verification Code Submission
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setLocation("/onboarding"); // New users go to onboarding
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

  // Handle Discord Social Login
  const handleDiscordLogin = async () => {
    if (!isLoaded) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_discord",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/onboarding",
      });
    } catch (err: any) {
        console.error("Discord Login Error:", err);
        setError("Failed to connect with Discord.");
    }
  };

  return (
    <div className="min-h-screen bg-rootine-bg flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        {/* Header / Logo */}
        <div className="text-center space-y-4">
            <img 
              src="/rootine_logo_no_background.png" 
              alt="Rootine Logo" 
              className="h-24 mx-auto object-contain"
            />
            <h1 className="text-3xl font-display text-text-black">Join the Family</h1>
            <p className="text-neutral-dark">Start your journey today</p>
        </div>

        <div className="bg-white/50 backdrop-blur-sm border-2 border-primary-green rounded-3xl p-8 ">
            {!verifying ? (
              <>
                 {/* Social Login */}
                <Button 
                    variant="outline" 
                    className="w-full mb-6 bg-[#5865F2] text-white border-transparent hover:bg-[#4752C4]"
                    onClick={handleDiscordLogin}
                >
                    <img src="https://assets-global.website-files.com/6257adef93867e56f84d3092/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png" alt="Discord" className="w-6 h-6 mr-2 brightness-0 invert" />
                    Join with Discord
                </Button>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-soft"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-[#f2f3e8] px-2 text-neutral-dark">Or sign up with email</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="hello@dino.com"
                        autoComplete="email"
                    />
                    
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="new-password"
                    />

                    {error && (
                        <p className="text-rose-red text-sm font-medium text-center bg-rose-red/10 p-3 rounded-lg">
                            {error}
                        </p>
                    )}

                    <Button 
                        type="submit" 
                        className="w-full py-4 text-lg shadow-lg"
                        isLoading={isLoading}
                    >
                        Create Account
                    </Button>
                </form>
              </>
            ) : (
                /* Verification Step */
                <form onSubmit={handleVerify} className="space-y-6">
                    <div className="text-center">
                        <p className="text-neutral-dark mb-4">
                            We sent a code to <span className="font-bold text-text-black">{email}</span>
                        </p>
                    </div>

                    <Input
                        label="Verification Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="123456"
                    />

                    {error && (
                        <p className="text-rose-red text-sm font-medium text-center bg-rose-red/10 p-3 rounded-lg">
                            {error}
                        </p>
                    )}

                     <Button 
                        type="submit" 
                        className="w-full py-4 text-lg shadow-lg"
                        isLoading={isLoading}
                    >
                        Verify & Start
                    </Button>
                </form>
            )}
        </div>

        <p className="text-center text-neutral-dark">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-green font-bold hover:underline">
                Sign In
            </Link>
        </p>
      </motion.div>
    </div>
  );
}
