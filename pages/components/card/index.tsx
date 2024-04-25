'use client'
import {Product} from "./type";
import Image from 'next/image'
import {GetStaticProps} from "next/types";
import api from "./api";
import {useTheme} from "next-themes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import {faMoon} from "@fortawesome/free-solid-svg-icons";
import {useEffect} from "react";
import ThemeButton from "../../theme/ThemeButton";

interface Props {
    products: Product[]
    date: string
}

const ProductCard: React.FC<{ product: Product }> = ({product}) => {
    return (
        <div
            className={`flex flex-col shadow-lg overflow-hidden relative ${
                product.hasStock ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
            }`}
        >
            <Image
                layout="responsive"
                width="100"
                height="48"
                objectFit="cover"
                src={product.image}
                alt=""
            />
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                    <p className="text-sm leading-5 font-medium text-indigo-600 uppercase tracking-wide text-sm text-indigo-600 font-bold">
                        {product.category}
                    </p>
                    <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
                        {product.title}
                    </h3>
                    <p className="mt-2 text-base leading-6 text-gray-500">
                        {product.description}
                    </p>
                </div>
                <div className="mt-4 text-xl leading-none font-extrabold text-gray-900">
                    <span>{product.hasStock ? product.price : 'Not available'}</span>
                </div>
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const products = await api.list()

    return {
        props: {
            products,
            date: new Date().toTimeString()
        }
    }
}

const Page = ({products, date}: Props) => {
    return (
        <>
            <article className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </article>
        </>
    )
}

export default Page