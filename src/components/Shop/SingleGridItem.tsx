"use client";

import React from "react";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import Image from "next/image";
import { Eye, Heart } from "lucide-react";
import { toast } from "sonner";

const SingleGridItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  const isSoldOut = item.stockQuantity === 0;

  // 🟢 Update QuickView
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
  };

  // 🛒 Add to Cart
  const handleAddToCart = () => {
    if (isSoldOut) {
      toast.error("This item is sold out");
      return;
    }

    const selectedColor = item.colors?.[0] || null;

    dispatch(
      addItemToCart({
        ...item,
        quantity: 1,
        color: selectedColor,
      }),
    );
    toast.success("Added to cart!");
  };

  // 💖 Add to Wishlist
  const handleItemToWishList = () => {
    if (isSoldOut) {
      toast.error("Cannot add sold out items to wishlist");
      return;
    }

    dispatch(
      addItemToWishlist({
        ...item,
        quantity: 1,
      }),
    );
    toast.success("Added to wishlist!");
  };

  return (
    <div className="group">
      <Link href={`/shop/${item.slug.current}`}>
        <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-1 mb-4">
          <Image
            src={item.mainImageUrl || "/images/placeholder.png"}
            alt={item.name || "Product image"}
            fill
            className="object-cover object-center"
          />
        </div>
      </Link>

      {/* <StarRating /> */}

      {/* Product title */}
      <h3 className="font-medium text-center text-dark ease-out duration-200 hover:text-seaBlue-dark mb-1.5 line-clamp-1">
        <Link href={`/shop/${item.slug?.current || item.slug}`}>
          {item.name}
        </Link>
      </h3>

      {/* Price */}
      <span className="flex items-center justify-center gap-2 font-semibold text-lg">
        <span className="text-dark">
          GH₵ {item.discountPrice ?? item.price}
        </span>
        {item.discountPrice && (
          <span className="text-dark-4 line-through">GH₵{item.price}</span>
        )}
      </span>

      {/* Hover buttons */}
      <div className="w-full flex items-center justify-center gap-2.5 pt-3 pb-2 ease-linear duration-200 group-hover:translate-y-0">
        <button
          onClick={() => {
            openModal();
            handleQuickViewUpdate();
          }}
          disabled={isSoldOut}
          aria-label="Quick view product"
          className={`flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 ${
            isSoldOut
              ? "text-gray-400 bg-gray-100 cursor-not-allowed opacity-60"
              : "text-dark bg-white hover:text-seaBlue-dark"
          }`}
        >
          <Eye className="w-4 h-4" />
        </button>

        <button
          onClick={handleAddToCart}
          disabled={isSoldOut}
          className={`inline-flex font-medium text-custom-sm py-[4px] md:py-[7px] px-1.5 md:px-5 rounded-[5px] text-white ease-out duration-200 ${
            isSoldOut
              ? "bg-gray-7 cursor-not-allowed opacity-60"
              : "bg-primary hover:bg-opacity-90"
          }`}
        >
          {isSoldOut ? "Sold Out" : "Add to cart"}
        </button>

        <button
          onClick={handleItemToWishList}
          disabled={isSoldOut}
          aria-label="Add to wishlist"
          className={`flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 ${
            isSoldOut
              ? "text-gray-400 bg-gray-100 cursor-not-allowed opacity-60"
              : "text-dark bg-white hover:text-seaBlue-dark"
          }`}
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SingleGridItem;
