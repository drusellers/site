import Nav from './nav';
import Profile from './profile';
import Sidebara from './sidebar';
import Footer from './footer';
import { Stack, Center, Sidebar } from './elo';
import Search from './search';

export default function Layout({ title, subtitle, children, tags, date, isHome, wordCount, readingTime }) {
  return (
    <Center max="var(--document-width)" gutters="var(--s0)">
      <Stack>
        <Nav isHome={isHome || false} />
        <Profile />
        <Search />
        <Sidebar sideWidth="var(--sidebar-side-width)" contentMin="var(--sidebar-content-min)">
          <div>
            <Sidebara
              tags={tags || []}
              title={title}
              subtitle={subtitle}
              date={date}
              wordCount={wordCount}
              readingTime={readingTime}
              />
            <article>
              {children}
            </article>
          </div>
        </Sidebar>
        <Footer />
      </Stack>
    </Center>
  );
}
