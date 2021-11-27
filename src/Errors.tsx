/** Renders errors from backend
 *
 * props: errors
 * state: none
 *
 * {JobList, CompanyDetail, CompanyList} -> Errors
 */

function Errors({ errors }) {
  return (
    <div className="Errors text-center alert alert-danger">
      {errors.map((err, idx) => (
        <p className="mb-0 small" key={idx}>{err}</p>
      ))}
    </div>
  );
}
export default Errors;
