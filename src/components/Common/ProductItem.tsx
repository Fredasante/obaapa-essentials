"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { updateProductDetails } from "@/redux/features/product-details";
import { Eye, Heart } from "lucide-react";
import { toast } from "sonner";
import StarRating from "./StarRating";

const ProductItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();

  const dispatch = useDispatch<AppDispatch>();

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
  };

  // add to cart
  const handleAddToCart = () => {
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

  const handleItemToWishList = () => {
    dispatch(
      addItemToWishlist({
        ...item,
        quantity: 1,
      }),
    );
    toast.success("Added to wishlist!");
  };

  const handleProductDetails = () => {
    dispatch(updateProductDetails({ ...item }));
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

      <h3
        className="font-medium text-dark text-center ease-out duration-200 hover:text-seaBlue-dark mb-1.5"
        onClick={() => handleProductDetails()}
      >
        <Link href={`/shop/${item.slug.current}`} className="line-clamp-1">
          {item.name}
        </Link>
      </h3>

      <span className="flex items-center justify-center gap-2 font-semibold text-lg">
        {item.discountPrice && item.discountPrice > 0 ? (
          <>
            <span className="text-dark"> GH₵ {item.discountPrice}</span>
            <span className="text-dark-4 line-through">GH₵{item.price}</span>
          </>
        ) : (
          <span className="text-dark">GH₵ {item.price}</span>
        )}
      </span>

      <div className="w-full flex items-center justify-center gap-2.5 pt-3 pb-2 border-b border-gray-3">
        <button
          onClick={() => {
            openModal();
            handleQuickViewUpdate();
          }}
          id="newOne"
          aria-label="button for quick view"
          className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-seaBlue-dark flex-shrink-0"
        >
          <Eye className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleAddToCart()}
          className="flex items-center justify-center bg-primary font-medium text-custom-sm py-[4px] md:py-[7px] px-1.5 md:px-5 rounded-[5px] text-white ease-out duration-200 hover:bg-opacity-90"
        >
          Add to cart
        </button>

        <button
          onClick={() => handleItemToWishList()}
          aria-label="button for favorite select"
          id="favOne"
          className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-seaBlue-dark flex-shrink-0"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
