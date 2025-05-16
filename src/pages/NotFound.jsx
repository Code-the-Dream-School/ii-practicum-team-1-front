export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-no-repeat bg-cover bg-[url('/images/bg.png')]">
      <div className="flex-1">
        <div className="max-w-[1440px] px-[100px] mx-auto pt-20">
          <img
            src="/images/404.png"
            alt="Page Not Found"
            className="mb-8"
          />
          <h1 className="text-xl md:text-3xl font-extrabold font-montserrat text-primary mb-8">
            Oops! Page Not Found
          </h1>
          <a
            href="/"
            className="text-dark font-montserrat hover:underline"
          >
            Go back to homepage →
          </a>
        </div>
      </div>
    </div>
  );
}
