import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCreativeCommons,
  faCreativeCommonsBy,
} from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <div
      className={
        'text-xs pb-4 text-left pl-8 grid grid-cols-7 gap-x-4 pt-8 print:hidden'
      }
    >
      <div className={'col-start-4 col-span-4'}>
        <FontAwesomeIcon icon={faCreativeCommons} />{' '}
        <FontAwesomeIcon icon={faCreativeCommonsBy} /> Content on this site is
        licensed under a{' '}
        <a
          rel="noreferrer"
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
        >
          Creative Commons Attribution 4.0 International License
        </a>
        .
      </div>
    </div>
  )
}
