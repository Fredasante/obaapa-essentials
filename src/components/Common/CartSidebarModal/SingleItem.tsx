"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/redux/features/cart-slice";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type SingleItemProps = {
  item: {
    _id: string;
    name: string;
    price: number;
    discountPrice?: number;
    quantity: number;
    stockQuantity: number;
    mainImageUrl?: string;
    color?: string;
  };
};

const SingleItem: React.FC<SingleItemProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(item._id));
    toast.success("Item removed from cart");
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > item.stockQuantity) {
      toast.error(`Only ${item.stockQuantity} available in stock`);
      return;
    }

    if (newQuantity < 1) {
      handleRemoveFromCart();
      return;
    }

    dispatch(updateCartItemQuantity({ _id: item._id, quantity: newQuantity }));
  };

  const priceToUse = item.discountPrice ?? item.price;
  const subtotal = priceToUse * item.quantity;

  return (
    <div className="flex flex-col gap-3 pb-4 border-b border-gray-200 last:border-b-0">
      <div className="flex items-start justify-between gap-5">
        <div className="w-full flex items-center gap-6">
          {/* Product Image */}
          <div className="relative flex items-center justify-center rounded-[8px] bg-white max-w-[80px] w-full h-20 overflow-hidden p-1.5 flex-shrink-0">
            <Image
              src={item.mainImageUrl || "/placeholder.jpg"}
              alt={item.name || "Product image"}
              fill
              className="object-contain rounded-[5px] p-2"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-dark mb-1 ease-out duration-200 hover:text-seaBlue-dark line-clamp-2">
              {item.name}
            </h3>

            {/* Color */}
            {item.color && (
              <div className="flex gap-2 text-xs text-gray-600 mb-1">
                <span>Color: {item.color}</span>
              </div>
            )}

            <p className="text-custom-sm text-gray-600">
              Price: GH₵ {priceToUse.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemoveFromCart}
          aria-label="Remove product from cart"
          className="flex items-center justify-center rounded-lg w-[38px] h-9.5 bg-white border border-gray-2 text-dark ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red flex-shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Quantity Controls and Subtotal */}
      <div className="flex items-center justify-between pl-[104px]">
        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="flex items-center justify-center w-7 h-7 rounded border border-gray-300 bg-white hover:bg-gray-100 text-sm font-medium"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-8 text-center font-medium text-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="flex items-center justify-center w-7 h-7 rounded border border-gray-300 bg-white hover:bg-gray-100 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            disabled={item.quantity >= item.stockQuantity}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Subtotal */}
        <div className="text-right">
          <p className="font-semibold text-dark">GH₵ {subtotal.toFixed(2)}</p>
          {item.quantity >= item.stockQuantity && (
            <p className="text-xs text-red-600">Max stock</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
