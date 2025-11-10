import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
    uz: {
        translation: {
            search_placeholder: "Mahsulot qidirish...",
            deals: "Aksiyalar",
            help: "Yordam",
            track_order: "Buyurtma holati",
            sign_in: "Kirish",
            sign_up: "Ro‘yxatdan o‘tish",
            hot_deals: "Chegirmalar",
            popular_categories: "Mashhur toifalar",
            recommended: "Tavsiya etilgan",
            subscribe_title: "Yangi kelganlar uchun obuna bo‘ling",
            subscribe_btn: "Obuna bo‘lish",
            shop_now: "Sotib olish",
            add: "Qo‘shish",
            cart: "Korzina",
            clear_cart: "Tozalash",
            checkout: "To‘lov",
            total: "Jami",
            language: "Til",
        }
    },
    en: {
        translation: {
            search_placeholder: "Search products...",
            deals: "Deals",
            help: "Help",
            track_order: "Track order",
            sign_in: "Sign in",
            sign_up: "Sign up",
            hot_deals: "Hot Deals",
            popular_categories: "Popular Categories",
            recommended: "Recommended",
            subscribe_title: "Subscribe for new arrivals",
            subscribe_btn: "Subscribe",
            shop_now: "Shop Now",
            add: "Add",
            cart: "Cart",
            clear_cart: "Clear cart",
            checkout: "Checkout",
            total: "Total",
            language: "Language",
        }
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('lng') || 'uz',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
})

export default i18n
