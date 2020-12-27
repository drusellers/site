import Nav from "../components/nav";
import Logo from "../components/logo";
import Footer from "../components/footer";
import Search from "../components/search";
import TagList from "../components/tagList";
import TitleSubtitle from "../components/titleSubtitle";
import Stats from "../components/stats";
import Date from "../components/date";

// This component carves out sections of the page, and applies sensible padding to
// them.
export default function Layout({
  title,
  subtitle,
  children,
  tags,
  date,
  wordCount,
  readingTime,
}) {
  return (
    <>
      <header className="container mx-auto flex flex-col max-w-document sm:flex-row sm:h-24 pt-6 px-6">
        <div>
          <Logo />
        </div>
        <div className="flex-grow my-6">
          <Nav />
        </div>
      </header>

      {/* <div className="container mx-auto max-w-document my-6 p-3">
        <Search />
      </div> */}

      {/* This is the main stage for showing content */}
      <div className="container mx-auto flex flex-col sm:flex-row max-w-document my-6 min-h-page">
        <div className="px-6 my-6 space-y-4 sm:w-1/3 sm:border-t-4 sm:border-black">
          <TitleSubtitle title={title} subtitle={subtitle} />
          <Stats wordCount={wordCount} readingTime={readingTime} />
          <Date dateString={date} />
          <TagList tags={tags || []} />
        </div>
        <div className="px-6 my-6">
          <article className="max-w-prose">{children}</article>
        </div>
      </div>

      <Footer />
    </>
  );
}
