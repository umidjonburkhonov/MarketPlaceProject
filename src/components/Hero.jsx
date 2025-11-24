import Slider from "./Slider";
import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function Hero() {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSlides() {
            try {
                const res = await api.get("/slides.json");
                setSlides(res.data);
            } catch (err) {
                console.log("Slides load error:", err);
            } finally {
                setLoading(false);
            }
        }

        loadSlides();
    }, []);

    return (
        <section className="section space-y-4">
            {loading ? (
                <div className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ) : (
                <Slider slides={slides} />
            )}
        </section>
    );
}
