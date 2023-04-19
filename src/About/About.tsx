export const About = () => {
  return (
    <div className="container mx-auto">
      <h1 className="flex flex-row text-4xl items-center text-slate-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
        About
      </h1>
      <p className="ml-1 mt-5">
        This application is developed by Jaroslav Beredi. It is created for an
        interview at AMCEF.
      </p>
    </div>
  );
};
