import { Route, Switch, useLocation, Redirect } from "wouter";
import { SignedIn, SignedOut, useUser, AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import AuthFlow from "./pages/AuthFlow";
import Home from "./pages/Home";
import AdoptionFlow from "./pages/AdoptionFlow";
import JournalEntry from "./components/features/journal/JournalEntry";
import Statistics from "./components/features/stats/Statistics";
import { useProfile } from "./hooks/useProfile";
import { useEffect } from "react";

// Wrapper to handle Onboarding Redirection
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const { profile, loading: profileLoading } = useProfile();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (isLoaded && user && !profileLoading) {
      if (!profile && location !== "/onboarding") {
        setLocation("/onboarding");
      } else if (profile && location === "/onboarding") {
        setLocation("/");
      }
    }
  }, [isLoaded, user, profileLoading, profile, location, setLocation]);

  if (!isLoaded || profileLoading) {
    return (
      <div className="min-h-screen bg-rootine-bg flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}

function App() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/login">
        <AuthFlow initialMode="login" />
      </Route>
      <Route path="/sign-up">
        <AuthFlow initialMode="signup" />
      </Route>

      <Route path="/sso-callback">
        <AuthenticateWithRedirectCallback 
            signInUrl="/login" 
            signUpUrl="/sign-up" 
        />
      </Route>

      {/* Protected Routes */}
      <Route path="/onboarding">
        <SignedIn>
            <ProtectedRoute>
              <AdoptionFlow />
            </ProtectedRoute>
        </SignedIn>
        <SignedOut>
            <Redirect to="/login" />
        </SignedOut>
      </Route>

      <Route path="/journal/new">
        <SignedIn>
            <ProtectedRoute>
              <JournalEntry />
            </ProtectedRoute>
        </SignedIn>
        <SignedOut>
            <Redirect to="/login" />
        </SignedOut>
      </Route>

      <Route path="/stats">
        <SignedIn>
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
        </SignedIn>
        <SignedOut>
            <Redirect to="/login" />
        </SignedOut>
      </Route>

      <Route path="/">
        <SignedIn>
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
        </SignedIn>
        <SignedOut>
            <Redirect to="/login" />
        </SignedOut>
      </Route>

      {/* Catch-all */}
      <Route>
        <Redirect to="/login" />
      </Route>
    </Switch>
  )
}

export default App
