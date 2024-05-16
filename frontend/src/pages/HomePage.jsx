import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="HomePage">
      <h1>Touch Grass</h1>
      <Link to="/grass">
      <button type="button">Go find grass!</button>
      </Link>
    </div>
  );
}
