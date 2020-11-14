import { Switcher } from './elo';

export default function Footer() {
  return (
    <div>
      <Switcher>
        <div>
          <div>
            {

                /* trying w/o this for a bit
          <p style="font-size: var(--font-s4); font-weight: var(--weight-9);">A Curious Mind</p>
          <p style="font-size: var(--font-s1)">Curiosity is Life</p>
          */

            }
            &nbsp;
          </div>
          <div>
            <div style={{ float: "right", maxWidth: "var(--measure-narrow)" }}>
              <p>
                <i className="fab fa-creative-commons"></i>
                <i className="fab fa-creative-commons-by"></i>
                <br />
                Content on this site is licensed under a{" "}
                <a
                  rel="license"
                  href="http://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                >
                  Creative Commons Attribution 4.0 International License
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </Switcher>
    </div>
  );
}
