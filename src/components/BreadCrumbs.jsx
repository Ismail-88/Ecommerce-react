import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const BreadCrumbs = ({ title, parent, parentPath = "/products" }) => {
  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 md:px-6 my-6">
      <ol className="flex items-center flex-wrap gap-1.5 text-sm">
        <li>
          <Link to="/" className="inline-flex items-center gap-1.5 text-text-muted hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <Home size={14} aria-hidden />
            Home
          </Link>
        </li>
        <li aria-hidden className="text-text-faint flex">
          <ChevronRight size={14} />
        </li>
        {parent && (
          <>
            <li>
              <Link to={parentPath} className="text-text-muted hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                {parent}
              </Link>
            </li>
            <li aria-hidden className="text-text-faint flex">
              <ChevronRight size={14} />
            </li>
          </>
        )}
        <li aria-current="page" className="font-semibold text-foreground truncate max-w-[200px]">
          {title}
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
