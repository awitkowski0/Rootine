import { Route, Switch, useLocation, Redirect } from "wouter";
import { SignedIn, SignedOut, useUser, AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import AuthFlow from "./pages/AuthFlow";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import MoodTracker from "./pages/MoodTracker";
import Resources from "./pages/Resources";
import GreenhouseActivities from "./pages/GreenhouseActivities";
import Calmics from "./pages/Calmics";
import Friends from "./pages/Friends";
import ComingSoon from "./pages/ComingSoon";
import AboutUs from "./pages/AboutUs";
import MyGreenhouse from "./pages/MyGreenhouse";
import MyTimeCapsules from "./pages/MyTimeCapsules";
import MyStats from "./pages/MyStats";
import DigitalJournal from "./pages/DigitalJournal";
import NewJournalEntry from "./pages/NewJournalEntry";
import AdoptionFlow from "./pages/AdoptionFlow";
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

      <Route path="/journal">
        <SignedIn>
            <ProtectedRoute>
              <DigitalJournal />
            </ProtectedRoute>
        </SignedIn>
        <SignedOut>
            <Redirect to="/login" />
        </SignedOut>
      </Route>

      <Route path="/journal/new">
        <SignedIn>
            <ProtectedRoute>
              <NewJournalEntry />
            </ProtectedRoute>
        </SignedIn>
        <SignedOut>
            <Redirect to="/login" />
        </SignedOut>
      </Route>

      <Route path="/stats">
        <SignedIn>
            <ProtectedRoute>
              <MyStats />
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

      <Route path="/profile">
        <SignedIn>
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
        </SignedIn>
        <SignedOut>
            <Redirect to="/login" />
        </SignedOut>
      </Route>

      <Route path="/mood-tracker">
        <SignedIn>
            <ProtectedRoute>
              <MoodTracker />
            </ProtectedRoute>
        </SignedIn>
        <SignedOut>
            <Redirect to="/login" />
        </SignedOut>
      </Route>

      <Route path="/resources">
        <SignedIn>
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
        </SignedIn>
        <SignedOut>
            <Redirect to="/login" />
        </SignedOut>
      </Route>

      <Route path="/greenhouse-activities">
        <SignedIn>
            <ProtectedRoute>
              <GreenhouseActivities />
            </ProtectedRoute>
        </SignedIn>
        <SignedOut>
            <Redirect to="/login" />
        </SignedOut>
      </Route>

      <Route path="/calmics">
        <SignedIn>
            <ProtectedRoute>
              <Calmics />
            </ProtectedRoute>
        </SignedIn>
        <SignedOut>
            <Redirect to="/login" />
        </SignedOut>
      </Route>

      <Route path="/friends">
        <SignedIn>
            <ProtectedRoute>
              <Friends />
            </ProtectedRoute>
        </SignedIn>
        <SignedOut>
            <Redirect to="/login" />
        </SignedOut>
      </Route>

      <Route path="/coming-soon">
        <SignedIn>
            <ProtectedRoute>
              <ComingSoon />
            </ProtectedRoute>
        </SignedIn>
        <SignedOut>
            <Redirect to="/login" />
        </SignedOut>
      </Route>

      <Route path="/about-us">
        <SignedIn>
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
        </SignedIn>
        <SignedOut>
            <Redirect to="/login" />
        </SignedOut>
      </Route>

      <Route path="/my-greenhouse">
        <SignedIn>
            <ProtectedRoute>
              <MyGreenhouse />
            </ProtectedRoute>
        </SignedIn>
        <SignedOut>
            <Redirect to="/login" />
        </SignedOut>
      </Route>

      <Route path="/my-time-capsules">
        <SignedIn>
            <ProtectedRoute>
              <MyTimeCapsules />
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
