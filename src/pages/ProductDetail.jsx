// import { useParams, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { addToCart } from "../store/slices/cartSlice";
// import { api } from "../api/client";

// import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";
// import { AiFillStar } from "react-icons/ai";

// export default function ProductDetail() {
//     const { id } = useParams();
//     const dispatch = useDispatch();

//     const reduxProduct = useSelector((state) =>
//         state.products.items.find((p) => String(p.id) === String(id))
//     );

//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [selectedVariants, setSelectedVariants] = useState({});

//     // Convert variantsData (object) → variants (array)
//     const fixVariants = (variantsData) => {
//         if (!variantsData || typeof variantsData !== "object") return [];

//         return Object.entries(variantsData).map(([type, values]) => ({
//             type,
//             values
//         }));
//     };

//     useEffect(() => {
//         let cancel = false;

//         const load = async () => {
//             setLoading(true);

//             let data = reduxProduct;

//             if (!data) {
//                 const res = await api.get(`/items/${id}.json`);
//                 data = res.data;
//             }

//             if (!cancel && data) {
//                 // Standardize variant format
//                 let fixed = data.variants || fixVariants(data.variantsData);

//                 const finalProduct = { ...data, variants: fixed };
//                 setProduct(finalProduct);

//                 // Default selections
//                 if (fixed.length > 0) {
//                     const initial = {};
//                     fixed.forEach(v => {
//                         initial[v.type] = v.values[0];
//                     });
//                     setSelectedVariants(initial);
//                 }

//                 setLoading(false);
//             }
//         };

//         load();
//         return () => (cancel = true);
//     }, [id, reduxProduct]);

//     if (loading) return <div className="h-screen flex items-center justify-center">Loading…</div>;
//     if (!product) return <div className="h-screen flex items-center justify-center">Product not found</div>;

//     // IMAGES FIX
//     const allImagesRaw = [
//         product.image,
//         ...(product.gallery || []),
//         ...(product.images?.map(i => i.url) || [])
//     ];

//     // Remove undefined and duplicate
//     const allImages = [...new Set(allImagesRaw.filter(Boolean))];

//     const galleryImages = allImages.map((img) => ({
//         original: img,
//         thumbnail: img,
//     }));

//     const renderFixedImage = (item) => (
//         <div className="w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden bg-gray-100">
//             <img src={item.original} className="w-full h-full object-cover" />
//         </div>
//     );

//     const selectVariant = (type, val) => {
//         setSelectedVariants(prev => ({ ...prev, [type]: val }));
//     };

//     const addToCartClick = () => {
//         dispatch(addToCart({ ...product, chosenVariants: selectedVariants }));
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 mb-12">
//             <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg grid md:grid-cols-2 gap-10">

//                 {/* LEFT */}
//                 <div className="rounded-xl overflow-hidden border dark:border-gray-700">
//                     <ImageGallery
//                         items={galleryImages}
//                         showFullscreenButton={true}
//                         showPlayButton={false}
//                         lazyLoad={true}
//                         showNav={true}
//                         showThumbnails={true}
//                         thumbnailPosition="bottom"
//                         renderItem={renderFixedImage}
//                     />
//                 </div>

//                 {/* RIGHT */}
//                 <div>

//                     <h1 className="text-2xl font-semibold mt-2">
//                         {product.title}
//                     </h1>
//                     <div className="text-3xl font-bold text-brand-primary">${product.price}</div>

//                     <div className="flex items-center mt-2 gap-2">
//                         <AiFillStar className="text-yellow-500" />
//                         <span>{product.rating || 4.5} / 5</span>
//                     </div>

//                     {/* VARIANTS */}
//                     {product.variants?.length > 0 && (
//                         <div className="mt-6 space-y-6">
//                             {product.variants.map((variant) => (
//                                 <div key={variant.type}>
//                                     <h3 className="font-semibold mb-2">{variant.type}</h3>

//                                     <div className="flex gap-3 flex-wrap">
//                                         {variant.values.map((val) => {
//                                             const isActive = selectedVariants[variant.type] === val;

//                                             return (
//                                                 <button
//                                                     key={val}
//                                                     onClick={() => selectVariant(variant.type, val)}
//                                                     className={`px-4 py-2 border rounded-md transition-all ${isActive
//                                                         ? "bg-blue-600 text-white border-blue-600 shadow"
//                                                         : "border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                                                         }`}
//                                                 >
//                                                     {val}
//                                                 </button>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     {/* DETAILS */}
//                     <div className="mt-6 space-y-2 text-gray-600 dark:text-gray-400 text-sm">
//                         <p>• Category: {product.category}</p>
//                         <p>• Subcategory: {product.subCategory}</p>
//                         <p>• Stock: {product.stock}</p>
//                     </div>

//                     {/* BUTTONS */}
//                     <div className="flex gap-4 mt-8">
//                         <button
//                             onClick={addToCartClick}
//                             className="flex-1 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 text-lg"
//                         >
//                             Add to Cart
//                         </button>

//                         <button className="flex-1 py-3 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-lg">
//                             Buy Now
//                         </button>
//                     </div>

//                     <p className="text-gray-700 dark:text-gray-300 mt-4 leading-6">
//                         {product.desc}
//                     </p>

//                     <Link to="/" className="inline-block mt-6 text-blue-600 hover:underline">
//                         ← Back to shop
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }


import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addToCart } from "../store/slices/cartSlice";
import { api } from "../api/client";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { AiFillStar } from "react-icons/ai";
import { Recommended } from "../components/Recommended";
// agar Recommended componenting bo'lsa, shu importni yoqib qo'yasan
// import { Recommended } from "../components/Recommended";

export default function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const reduxProduct = useSelector((state) =>
        state.products.items.find((p) => String(p.id) === String(id))
    );

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedVariants, setSelectedVariants] = useState({});
    const [qty, setQty] = useState(1);

    // Convert variantsData (object) → variants (array)
    const fixVariants = (variantsData) => {
        if (!variantsData || typeof variantsData !== "object") return [];

        return Object.entries(variantsData).map(([type, values]) => ({
            type,
            values,
        }));
    };

    useEffect(() => {
        let cancel = false;

        const load = async () => {
            try {
                setLoading(true);

                let data = reduxProduct;

                if (!data) {
                    const res = await api.get(`/items/${id}.json`);
                    data = res.data;
                }

                if (!cancel && data) {
                    // Standardize variant format
                    let fixed = data.variants || fixVariants(data.variantsData);

                    const finalProduct = { ...data, variants: fixed };
                    setProduct(finalProduct);

                    // Default selections
                    if (fixed.length > 0) {
                        const initial = {};
                        fixed.forEach((v) => {
                            if (Array.isArray(v.values) && v.values.length > 0) {
                                initial[v.type] = v.values[0];
                            }
                        });
                        setSelectedVariants(initial);
                    }
                }
            } finally {
                if (!cancel) setLoading(false);
            }
        };

        load();
        return () => (cancel = true);
    }, [id, reduxProduct]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
                <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
                    <div className="h-[320px] sm:h-[380px] md:h-[420px] bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse" />
                    <div className="space-y-4">
                        <div className="h-6 w-2/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                        <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                        <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                        <div className="h-24 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                        <div className="h-10 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="h-screen flex flex-col gap-4 items-center justify-center text-gray-500">
                <p>Product not found</p>
                <Link
                    to="/"
                    className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-100"
                >
                    Go back to shop
                </Link>
            </div>
        );
    }

    // IMAGES FIX
    const allImagesRaw = [
        product.image,
        ...(product.gallery || []),
        ...(product.images?.map((i) => i.url) || []),
    ];

    const allImages = [...new Set(allImagesRaw.filter(Boolean))];

    const galleryImages = allImages.map((img) => ({
        original: img,
        thumbnail: img,
    }));

    const renderFixedImage = (item) => (
        <div className="w-full h-[320px] sm:h-[380px] md:h-[430px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img src={item.original} className="w-full h-full object-cover" />
        </div>
    );

    const selectVariant = (type, val) => {
        setSelectedVariants((prev) => ({ ...prev, [type]: val }));
    };

    const addToCartClick = () => {
        dispatch(
            addToCart({
                ...product,
                chosenVariants: selectedVariants,
                quantity: 1
            })
        );
    };

    const inStock = product.stock > 0;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-6 px-3 sm:px-6 lg:px-10 mb-10">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Breadcrumb + back */}
                <div className="flex items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Link to="/" className="hover:text-blue-600">
                            Home
                        </Link>
                        <span>/</span>
                        {product.category && (
                            <>
                                <span className="capitalize">{product.category}</span>
                                {product.subCategory && (
                                    <>
                                        <span>/</span>
                                        <span className="capitalize">{product.subCategory}</span>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    <Link
                        to="/"
                        className="text-xs border px-3 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        ← Back to shop
                    </Link>
                </div>

                {/* MAIN CARD */}
                <div className="bg-white dark:bg-slate-950/80 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 p-4 sm:p-6 lg:p-8 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
                    {/* LEFT: GALLERY */}
                    <div className="space-y-3">
                        <ImageGallery
                            items={galleryImages}
                            showFullscreenButton={true}
                            showPlayButton={false}
                            lazyLoad={true}
                            showNav={true}
                            showThumbnails={true}
                            thumbnailPosition="bottom"
                            renderItem={renderFixedImage}
                        />
                    </div>

                    {/* RIGHT: INFO */}
                    <div className="flex flex-col gap-5">
                        {/* Title + rating */}
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                                {product.category && (
                                    <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                                        {product.category}
                                    </span>
                                )}
                                {product.subCategory && (
                                    <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                        {product.subCategory}
                                    </span>
                                )}
                                {inStock ? (
                                    <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                                        In stock: {product.stock}
                                    </span>
                                ) : (
                                    <span className="px-2 py-1 rounded-full bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300">
                                        Out of stock
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-50 leading-snug">
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <AiFillStar className="text-xl" />
                                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                                        {product.rating || 4.5}
                                    </span>
                                </div>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    ({product.reviewsCount || "120+"} reviews)
                                </span>
                            </div>

                            <div className="flex items-end gap-3">
                                <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">
                                    ${product.price}
                                </div>
                                {product.oldPrice && (
                                    <div className="flex flex-col text-xs text-slate-500 dark:text-slate-400">
                                        <span className="line-through">${product.oldPrice}</span>
                                        <span className="text-emerald-500 font-medium">
                                            -{Math.round(
                                                ((product.oldPrice - product.price) / product.oldPrice) *
                                                100
                                            )}
                                            %
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* VARIANTS */}
                        {product.variants?.length > 0 && (
                            <div className="space-y-5 border-t border-slate-100 dark:border-slate-800 pt-4">
                                {product.variants.map((variant) => (
                                    <div key={variant.type} className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                                                {variant.type}
                                            </h3>
                                            <span className="text-[10px] uppercase tracking-wide bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300 px-2 py-0.5 rounded-full">
                                                Choose one
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5">
                                            {variant.values.map((val) => {
                                                const isActive = selectedVariants[variant.type] === val;

                                                return (
                                                    <label
                                                        key={val}
                                                        className={`
                              cursor-pointer px-3.5 py-2 rounded-2xl border text-xs sm:text-sm
                              flex items-center gap-2 transition-all
                              ${isActive
                                                                ? "bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]"
                                                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                            }
                            `}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={variant.type}
                                                            value={val}
                                                            checked={isActive}
                                                            onChange={() => selectVariant(variant.type, val)}
                                                            className="hidden"
                                                        />
                                                        <span
                                                            className={`
                                w-3 h-3 rounded-full border flex-shrink-0
                                ${isActive
                                                                    ? "border-white bg-white"
                                                                    : "border-slate-400"
                                                                }
                              `}
                                                        />
                                                        <span>{val}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}

                                {/* Selected summary */}
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                    Selected:{" "}
                                    {Object.keys(selectedVariants).length > 0
                                        ? Object.entries(selectedVariants)
                                            .map(([k, v]) => `${k}: ${v}`)
                                            .join(" | ")
                                        : "no variants selected"}
                                </div>
                            </div>
                        )}

                        {/* QTY + BUTTONS */}
                        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-600 dark:text-slate-300">
                                        Quantity
                                    </span>
                                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-full overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setQty((q) => (q > 1 ? q - 1 : 1))
                                            }
                                            className="px-3 py-1 text-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        >
                                            -
                                        </button>
                                        <div className="w-10 text-center text-sm">
                                            {qty}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setQty((q) => (q < product.stock ? q + 1 : q))
                                            }
                                            className="px-3 py-1 text-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {inStock && (
                                    <span className="text-xs text-emerald-600 dark:text-emerald-400">
                                        {product.stock <= 3 ? "Only a few left in stock" : "Ready to ship"}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={addToCartClick}
                                    disabled={!inStock}
                                    className={`flex-1 py-3 rounded-2xl text-sm sm:text-base font-medium shadow transition 
                    ${inStock
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-slate-300 text-slate-500 cursor-not-allowed"
                                        }`}
                                >
                                    {inStock ? "Add to Cart" : "Out of stock"}
                                </button>

                                {/* <button
                                    disabled={!inStock}
                                    className={`flex-1 py-3 rounded-2xl text-sm sm:text-base font-medium border transition 
                    ${inStock
                                            ? "border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100"
                                            : "border-slate-300 text-slate-500 cursor-not-allowed"
                                        }`}
                                >
                                    Buy Now
                                </button> */}
                            </div>

                            <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                                <p>• Free shipping for orders over $100</p>
                                <p>• 14-day return policy</p>
                                <p>• Secure payment</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DESCRIPTION CARD */}
                {product.desc && (
                    <div className="bg-white dark:bg-slate-950/80 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 sm:p-6 lg:p-7">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
                            Description
                        </h2>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                            {product.desc}
                        </p>
                    </div>
                )}

                {/* AGAR Recommended component bo'lsa, shu blokni ishlat */}

                <Recommended
                    currentId={id}
                    currentCat={product.category}
                    currentSub={product.subCategory}
                />

            </div>
        </div>
    );
}
