const NotFound = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-2xl md:text-3xl font-light mt-4">
          Sorry, the page you're looking for cannot be found.
        </p>
        <p className="mt-2 text-gray-600">
          But don't worry, you can find plenty of other things on our homepage.
        </p>
        <a href="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-700">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
