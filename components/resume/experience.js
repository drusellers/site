export default function Experience({ job }) {
  return (
    <div key={job.employeer} className="ml-6 space-y-3">
      <h4 className="text-xl font-bold font-heading">
        {job.employer}{" "}
        <small>
          <a href={job.url} className="text-blue-500" target="_blank">
            {job.urllabel} <i className="far fa-external-link-square"></i>
          </a>
        </small>
      </h4>
      {job.roles.map((role) => {
        return (
          <div key={role.title} className="space-y-3">
            <div className="flex">
              <div className="flex-1">{role.title}</div>
              <div className="flex-1 text-right">
                {role.start} - {role.end}
              </div>
            </div>

            {role.description.map((d, i) => {
              {
                /* markdown ify */
              }
              return <p key={i} className="ml-6">{d}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}
