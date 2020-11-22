export default function Education({ school }) {
  let e = school;
  return (
    <div key={e.school} className="space-y-3">
      <h4 className="text-xl font-heading font-bold">
        {e.school}{" "}
        <small>
          <a href={e.url} className="text-blue-500" target="_blank">
            {e.urllabel} <i className="far fa-external-link-square"></i>
          </a>
        </small>
      </h4>
      <div className="flex">
        <div className="">
          {e.major}
          <br />
          <small> {e.minor}</small>
        </div>
        <div className="flex-1 text-right">
          {e.start} - {e.end}
        </div>
      </div>
    </div>
  );
}
