export default function Hero() {
  return (
    <section className="section">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card flex flex-col lg:flex-row items-center justify-between">
          <div className="p-4">
            <p className="badge mb-2">Hot</p>
            <h1 className="text-3xl font-bold mb-2">Xbox Console</h1>
            <p className="text-gray-600 mb-4">Next‑gen performance with immersive 4K gaming.</p>
            <button className="px-4 py-2 bg-brand-primary text-white rounded-md">Shop Now</button>
          </div>
          <img src="/src/assets/ph-1.svg" className="w-full lg:w-1/2" />
        </div>
        <div className="grid grid-rows-2 gap-4">
          <div className="card flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Headset</h3>
              <p className="text-sm text-gray-500">Noise cancelling</p>
            </div>
            <img src="/src/assets/ph-2.svg" className="w-32" />
          </div>
          <div className="card flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Camera</h3>
              <p className="text-sm text-gray-500">4K recording</p>
            </div>
            <img src="/src/assets/ph-3.svg" className="w-32" />
          </div>
        </div>
      </div>
    </section>
  )
}
