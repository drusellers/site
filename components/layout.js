import Nav from "./nav";
import Logo from "./logo";
import Footer from "./footer";
import Search from "./search";
import TagList from "./tagList";
import TitleSubtitle from "./titleSubtitle";
import Stats from "./stats";
import Date from "./date";

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
      <header className="container mx-auto flex h-24 max-w-document pt-6">
        <div>
          <Logo />
        </div>
        <div className="flex-grow">
          <Nav />
        </div>
      </header>

      <div className="container mx-auto h-6 max-w-document">
        <Search />
      </div>

      {/* This is the main stage for showing content */}
      <div className="container mx-auto pt-6 flex max-w-document">
        <div className="w-1/3 border-t-4 border-black pt-6 space-y-4">
          <TitleSubtitle title={title} subtitle={subtitle} />
          <Stats wordCount={wordCount} readingTime={readingTime} />
          <Date dateString={date} />
          <TagList tags={tags || []} />
        </div>
        <div>
          <article className="max-w-prose p-6">{children}</article>
        </div>
      </div>

      <Footer />
    </>
  );
}
