import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div id="error">
      <h1>Not Found</h1>
      <p>Kaynak Bulunamadı</p>
      <Link to="/">Home Page</Link>
    </div>
  );
};

export default NotFoundPage;
