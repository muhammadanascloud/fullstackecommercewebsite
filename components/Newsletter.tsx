export default function Newsletter() {
    return (
      <section className="px-8 py-12 bg-gray-100 text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">
          Get the latest information and promo offers directly.
        </p>
        <form className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 w-full max-w-xs rounded-l focus:outline-none"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-r hover:bg-gray-800 transition"
          >
            Subscribe
          </button>
        </form>
      </section>
    );
  }
  