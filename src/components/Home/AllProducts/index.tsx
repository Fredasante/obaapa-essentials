"use client";

import { useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { client, fetcher } from "@/sanity/client";
import { allProductsQuery } from "@/sanity/groq";
import ProductItem from "@/components/Common/ProductItem";
import { ClipLoader } from "react-spinners";

export default function AllProducts() {
  const fetchProducts = async () => {
    return await fetcher([allProductsQuery]);
  };

  const {
    data: products = [],
    isLoading,
    mutate,
  } = useSWR("all-products-home", fetchProducts, {
    revalidateOnFocus: false,
    fallbackData: [],
  });

  // Real-time Sanity subscription for instant updates
  useEffect(() => {
    const subscription = client
      .listen('*[_type == "product"]', {}, { includeResult: true })
      .subscribe(() => {
        mutate();
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [mutate]);

  return (
    <section className="overflow-hidden pt-10 bg-[#F7F8FA] pb-10 lg:pb-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* Section Header */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.11826 15.4622C4.11794 16.6668 5.97853 16.6668 9.69971 16.6668H10.3007C14.0219 16.6668 15.8825 16.6668 16.8821 15.4622M3.11826 15.4622C2.11857 14.2577 2.46146 12.429 3.14723 8.77153C3.63491 6.17055 3.87875 4.87006 4.8045 4.10175M3.11826 15.4622C3.11826 15.4622 3.11826 15.4622 3.11826 15.4622ZM16.8821 15.4622C17.8818 14.2577 17.5389 12.429 16.8532 8.77153C16.3655 6.17055 16.1216 4.87006 15.1959 4.10175M16.8821 15.4622C16.8821 15.4622 16.8821 15.4622 16.8821 15.4622ZM15.1959 4.10175C14.2701 3.33345 12.947 3.33345 10.3007 3.33345H9.69971C7.0534 3.33345 5.73025 3.33345 4.8045 4.10175M15.1959 4.10175C15.1959 4.10175 15.1959 4.10175 15.1959 4.10175ZM4.8045 4.10175C4.8045 4.10175 4.8045 4.10175 4.8045 4.10175Z"
                  stroke="#C85A1F"
                  strokeWidth="1.5"
                />
                <path
                  d="M7.64258 6.66678C7.98578 7.63778 8.91181 8.33345 10.0003 8.33345C11.0888 8.33345 12.0149 7.63778 12.3581 6.66678"
                  stroke="#C85A1F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Our Collection
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              All Products
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-seaBlue-dark hover:text-white hover:border-transparent"
          >
            View All
          </Link>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <ClipLoader size={28} color="#C85A1F" />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 md:gap-x-7.5 gap-y-9">
            {products.length > 0 ? (
              products.map((item: any) => (
                <ProductItem key={item._id} item={item} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-7">
                <div className="w-14 h-14 rounded-full bg-seaBlue-dark/10 flex items-center justify-center mb-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 4.5H5.05848C5.7015 4.5 6.02301 4.5 6.27436 4.63624C6.49672 4.75608 6.67114 4.94908 6.76773 5.18377C6.87795 5.45197 6.84915 5.7716 6.79156 6.41087L6.20844 12.8391C6.15085 13.4784 6.12205 13.798 6.23227 14.0662C6.32886 14.3009 6.50328 14.4939 6.72564 14.6138C6.97699 14.75 7.2985 14.75 7.94152 14.75H17.3537C17.9367 14.75 18.2282 14.75 18.4665 14.6361C18.6761 14.5356 18.8455 14.3671 18.9472 14.1581C19.0625 13.9206 19.0643 13.6291 19.068 13.0462L19.1667 11.25"
                      stroke="#C85A1F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14 18C14 18.5523 13.5523 19 13 19C12.4477 19 12 18.5523 12 18C12 17.4477 12.4477 17 13 17C13.5523 17 14 17.4477 14 18Z"
                      fill="#C85A1F"
                    />
                    <path
                      d="M9 18C9 18.5523 8.55228 19 8 19C7.44772 19 7 18.5523 7 18C7 17.4477 7.44772 17 8 17C8.55228 17 9 17.4477 9 18Z"
                      fill="#C85A1F"
                    />
                    <path
                      d="M11 9H17M14 6V12"
                      stroke="#C85A1F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-dark mb-1">
                  New products coming soon
                </h3>
                <p className="text-gray-5 text-sm max-w-sm text-center">
                  We&apos;re stocking up our shelves with amazing products. Check back shortly!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
