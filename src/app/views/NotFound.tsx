import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="mb-4">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go back to the homepage
      </Link>
    </div>
  );
}
