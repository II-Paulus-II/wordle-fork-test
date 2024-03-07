/* ----- Third Party Imports ----- */
import {
  ClerkProvider,
  UserButton,
  auth,
  currentUser,
  clerkClient,
  getAuth,
} from "@clerk/nextjs";
import Link from "next/link";
import GameContextProvider from "@/context/game-context";

/* ----- Project Imports ----- */
import LoginManager from "@/components/LoginManager";

export const metadata = {
  title: "Wordly by the Lads",
  description: "Generated by Wordle Team Legends",
};

export default async function RootLayout({ children }) {
  return (
    <GameContextProvider>
      <LoginManager />
      {children}
      <footer className="footer">
        <p>© 2024 Wordly Game. All rights reserved.</p>
      </footer>
    </GameContextProvider>
  );
}
