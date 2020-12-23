import Link from 'next/link';
import { Switcher } from './elo';

export default function Profile(){
  return (
    <header>
  <Switcher>
    <div>
      <div>
        <Link href="/about">
        <a>
          <img id="avatar" src="/images/logo.svg" alt="Dru Sellers"
          height="90px"/>
        </a>
        </Link>
      </div>
      <div>
        <div id="hcard-Dru-Sellers" style={{float:'right'}}>
          <span style={{float: 'none'}}>Dru Sellers</span>
          <div className="email"><a className="link" href="mailto:dru@drusellers.com">dru@drusellers.com</a></div>
          <div className="twitter"><a className="link" href="http://twitter.com/drusellers">@drusellers</a></div>
          <div className="adr">
              <div className="street-address"></div>
              <span className="locality">Austin</span>,{" "}
              <span className="region">TX</span>{" "}
              <span className="postal-code">78745</span>{" "}
              <span className="country-name">USA</span>
          </div>
          <div className="tel">+1 785/371-4589</div>
        </div>
        {/* /hcard */}
      </div>
    </div>
  </Switcher>
</header>


  );
}
