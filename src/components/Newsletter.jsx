export default function Newsletter() {
  return (
    <section className="bg-brand-primary text-white py-10">
      <div className="container-max flex flex-col md:flex-row items-center gap-4">
        <h3 className="text-2xl font-semibold">Subscribe for new arrivals</h3>
        <div className="flex w-full md:w-auto md:ml-auto">
          <input placeholder="you@example.com" className="w-full md:w-96 px-3 py-2 rounded-l-md text-gray-900" />
          <button className="bg-black text-white px-4 py-2 rounded-r-md">Subscribe</button>
        </div>
      </div>
    </section>
  )
}
