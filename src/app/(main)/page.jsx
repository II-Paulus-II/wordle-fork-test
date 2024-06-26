/* ----- Third Party Imports ----- */ 
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs";

/* ----- Project Imports ----- */
import "@/styles/home.css"

export default async function Home() {

  const { userId } = auth();
  const user = await currentUser();

  return (
    <article className="homePageArticle">
      <section className="homePageCenter">
        <p>
          Unleash the power of your vocabulary and explore words waiting to be discovered.
        </p>

        {userId && <Link className="playButton" href="/play">Start Your Adventure</Link>}
        {!userId && <Link className="playButton" href="/sign-in">Sign In To Play!</Link>}

      </section>

      <section className="homePageFeatures">
        <div className="homePageFeature">
          <h2>Word Quests</h2>
          <p>Embark on epic word quests, solve the puzzle, and unlock your potencial.</p>
        </div>

        <div className="homePageFeature">
          <h2>Word Challenges</h2>
          <p>Challenge your friends in thrilling word challenges.</p>
        </div>

        <div className="homePageFeature">
          <h2>Word Mastery</h2>
          <p>Improve your vocabulary and become a Wordly Master!</p>
        </div>
      </section>
    </article>
  );
}
