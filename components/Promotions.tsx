export default function Promotions() {
    return (
      <section className="px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Promotion 1 */}
        <div className="bg-gray-200 p-6 text-center rounded-lg">
          <h3 className="text-xl font-bold mb-2">GET UP TO 60%</h3>
          <p className="text-gray-600">For the summer season</p>
        </div>
  
        {/* Promotion 2 */}
        <div className="bg-black text-white p-6 text-center rounded-lg">
          <h3 className="text-xl font-bold mb-2">GET 30% Off</h3>
          <p>Use Promo Code</p>
          <p className="font-mono text-lg">DINEWEEKENDSALE</p>
        </div>
  
        {/* Promotion 3 */}
        <div className="bg-gray-200 p-6 text-center rounded-lg">
          <h3 className="text-xl font-bold mb-2">FLEX SWEATSHIRT</h3>
          <p className="line-through">$100</p>
          <p className="text-xl font-bold">$75</p>
        </div>
      </section>
    );
  }
  