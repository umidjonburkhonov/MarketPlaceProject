import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useNavigate } from 'react-router-dom'

const slides = [
    {
        title: 'Xbox Console',
        text: 'Next-gen performance with immersive 4K gaming.',
        img: '/src/assets/ph-1.svg',
    },
    {
        title: 'Headset',
        text: 'Noise cancelling, 30h battery life.',
        img: '/src/assets/ph-2.svg',
    },
    {
        title: 'Laptop',
        text: 'Ultrabook for creators and developers.',
        img: '/src/assets/ph-4.svg',
    },
]

export default function HeroCarousel() {
    const navigate = useNavigate()

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: true,
        adaptiveHeight: true,
    }

    return (
        <section className="w-full px-3 sm:px-6 lg:px-12 py-6 sm:py-10">
            <div className="rounded-2xl overflow-hidden shadow-md">
                <Slider {...settings}>
                    {slides.map((s, idx) => (
                        <div key={idx}>
                            <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-white dark:bg-gray-800">
                                {/* Left: Text Content */}
                                <div className="flex flex-col justify-center px-5 sm:px-10 py-6 sm:py-12">
                                    <p className="inline-block text-xs sm:text-sm bg-brand-primary text-white rounded-full px-3 py-1 w-fit mb-3">
                                        Hot
                                    </p>
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-3">
                                        {s.title}
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
                                        {s.text}
                                    </p>
                                    <button
                                        onClick={() => navigate('/products')}
                                        className="px-5 py-2 sm:px-6 sm:py-2.5 bg-brand-primary text-white rounded-md hover:bg-brand-accent transition w-fit text-sm sm:text-base"
                                    >
                                        Shop Now
                                    </button>
                                </div>

                                {/* Right: Image */}
                                <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
                                    <img
                                        src={s.img}
                                        alt={s.title}
                                        className="w-full max-w-xs sm:max-w-md lg:max-w-lg object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Custom Dots Position */}
            <style>
                {`
          .slick-dots {
            bottom: -35px;
          }
          .slick-dots li button:before {
            color: #2563EB; /* brand-primary */
            opacity: 0.5;
            font-size: 10px;
          }
          .slick-dots li.slick-active button:before {
            opacity: 1;
            color: #1E40AF; /* brand-accent */
          }
        `}
            </style>
        </section>
    )
}
