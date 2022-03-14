import { Link } from "react-router-dom";

export const BackButton = () => {
  return (
    <Link
      to="/"
      className="w-fit flex rounded items-center space-x-2 py-1.5 px-2.5 text-sm font-medium mb-4 bg-[#EEEEF2] text-[#222222] hover:bg-[#235EF51A] hover:text-[#235EF5]"
    >
      <svg
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.07273 1.07273L6 0L0 6L6 12L7.07273 10.9273L2.14545 6L7.07273 1.07273Z"
          fill="currentColor"
        />
      </svg>
      <span>Back to all transactions</span>
    </Link>
  );
};
