"use client";
import React, { useEffect, useState } from "react";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { AppDispatch, useAppSelector, RootState } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { updateProductDetails } from "@/redux/features/product-details";
import { X } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { toast } from "sonner";

const QuickViewModal = () => {
  const { isModalOpen, closeModal } = useModalContext();
  const { openPreviewModal } = usePreviewSlider();

  // get the product data
  const product = useAppSelector((state) => state.quickViewReducer.value);
  const cartItems = useSelector((state: RootState) => state.cartReducer.items);

  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || "",
  );
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[0] || "",
  );

  const dispatch = useDispatch<AppDispatch>();

  // Get current cart quantity for this product
  const cartItem = cartItems.find((item) => item._id === product?._id);
  const currentCartQuantity = cartItem?.quantity || 0;

  // Check stock status
  const isSoldOut = product?.stockQuantity === 0;
  const canAddToCart = currentCartQuantity < (product?.stockQuantity || 0);

  // preview modal
  const handlePreviewSlider = () => {
    dispatch(updateProductDetails(product));
    openPreviewModal();
  };

  // add to cart with stock validation
  const handleAddToCart = () => {
    if (isSoldOut) {
      toast.error("This item is out of stock");
      return;
    }

    if (!canAddToCart) {
      toast.error(`Only ${product.stockQuantity} available in stock`);
      return;
    }

    dispatch(
      addItemToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        mainImageUrl: product.mainImageUrl || "",
        color: selectedColor,
        size: selectedSize || null,
        quantity: 1,
        stockQuantity: product.stockQuantity,
      }),
    );
    toast.success("Added to cart!");
    closeModal();
  };

  // add to wishlist
  const handleAddToWishlist = () => {
    dispatch(
      addItemToWishlist({
        _id: product._id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        mainImageUrl: product.mainImageUrl || "",
        quantity: 1,
      }),
    );
    toast.success("Added to wishlist");
    closeModal();
  };

  useEffect(() => {
    if (product?.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
    if (product?.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        closeModal();
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, closeModal]);

  return (
    <div
      className={`${
        isModalOpen ? "z-99999" : "hidden"
      } fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5`}
    >
      <div className="flex items-center justify-center">
        <div className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
          <button
            onClick={() => closeModal()}
            aria-label="button for close modal"
            className="absolute top-0 right-0 sm:top-6 sm:right-6 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 bg-meta text-body hover:text-dark"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-12.5">
            {/* Main Image */}
            <div className="max-w-[526px] w-full">
              <div className="relative z-1 overflow-hidden flex items-center justify-center w-full h-[300px] sm:h-[400px] lg:h-[508px] bg-gray-1 rounded-lg border border-gray-3">
                {product?.mainImageUrl ? (
                  <>
                    <Image
                      src={product.mainImageUrl}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="object-contain w-full h-full max-h-[280px] sm:max-h-[380px] lg:max-h-[480px]"
                    />
                    {/* Sold Out Badge */}
                    {isSoldOut && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-red-600 text-white border font-bold px-4 py-2 rounded-lg text-xl shadow-lg transform -rotate-12">
                          SOLD OUT
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                    <span>No Image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="max-w-[445px] w-full">
              <h3 className="font-semibold text-xl xl:text-heading-5 text-dark mb-3">
                {product.name || "Untitled Product"}
              </h3>

              <div className="text-gray-600 mb-5 flex items-center gap-2">
                <p>Status:</p>

                {product?.stockQuantity === 0 ? (
                  <span className="inline-flex items-center px-3 py-1 text-sm rounded-full font-medium bg-red-light-6 text-red">
                    Out of Stock
                  </span>
                ) : product?.stockQuantity <= 3 ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium  bg-green-light-6 text-green">
                    Only {product.stockQuantity} left!
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-light-6 text-green">
                    In Stock
                  </span>
                )}
              </div>

              <div className="mb-4">
                <span className="flex items-center gap-4">
                  <span className="font-semibold text-dark text-xl lg:text-[23px]">
                    GH₵ {product.discountPrice || product.price || "0.00"}
                  </span>
                  {product.discountPrice && (
                    <span className="font-medium text-dark-4 text-lg lg:text-[20px] line-through">
                      GH₵ {product.price}
                    </span>
                  )}
                </span>
              </div>

              {/* Already in cart warning */}
              {currentCartQuantity > 0 && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-800">
                    {currentCartQuantity} already in cart
                    {!canAddToCart && " (Maximum reached)"}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-6 mt-6 mb-7.5">
                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-slate-500 whitespace-nowrap">
                      Color:
                    </h3>
                    <div className="flex space-x-2">
                      {product.colors.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(color)}
                          className={`w-7 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                            selectedColor === color
                              ? "ring-2 ring-seaBlue-dark"
                              : ""
                          }`}
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-slate-500 whitespace-nowrap">
                      Size:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1 border rounded-md text-sm font-medium transition-all ${
                            selectedSize === size
                              ? "bg-seaBlue-dark text-white border-seaBlue-dark"
                              : "bg-white text-dark border-gray-300 hover:border-seaBlue-dark"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isSoldOut || !canAddToCart}
                  className={`inline-flex font-medium text-white py-2.5 px-4.5 sm:py-3 sm:px-7 text-sm sm:text-base rounded-md transition-colors ${
                    isSoldOut || !canAddToCart
                      ? "bg-gray-6 cursor-not-allowed opacity-60"
                      : "bg-seaBlue-dark hover:bg-opacity-90"
                  }`}
                >
                  {isSoldOut
                    ? "Sold Out"
                    : !canAddToCart
                      ? "Max Quantity"
                      : "Add to Cart"}
                </button>

                <button
                  onClick={handleAddToWishlist}
                  disabled={isSoldOut}
                  className={`inline-flex items-center gap-2 font-medium py-2.5 px-4.5 sm:py-3 sm:px-6 text-sm sm:text-base rounded-md transition-colors border-2 ${
                    isSoldOut
                      ? "bg-gray-6 text-white border-gray-6 cursor-not-allowed opacity-60"
                      : "text-green-dark bg-white border-green-dark hover:bg-green-dark hover:text-white"
                  }`}
                >
                  {isSoldOut ? "Unavailable" : "Add to Wishlist"}
                </button>
              </div>

              <div className="prose prose-sm max-w-none text-gray-700 mt-6">
                {Array.isArray(product?.description) &&
                product.description.length > 0 ? (
                  <PortableText
                    value={product.description}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="mb-4">{children}</p>
                        ),
                      },
                      list: {
                        bullet: ({ children }) => (
                          <ul className="list-disc pl-5 space-y-2">
                            {children}
                          </ul>
                        ),
                        number: ({ children }) => (
                          <ol className="list-decimal pl-5 space-y-2">
                            {children}
                          </ol>
                        ),
                      },
                      listItem: {
                        bullet: ({ children }) => <li>{children}</li>,
                        number: ({ children }) => <li>{children}</li>,
                      },
                      marks: {
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic">{children}</em>
                        ),
                        link: ({ children, value }) => (
                          <a
                            href={value.href}
                            className="text-seaBlue-dark hover:underline"
                          >
                            {children}
                          </a>
                        ),
                      },
                    }}
                  />
                ) : product?.description &&
                  typeof product.description === "string" &&
                  product.description.trim() !== "" ? (
                  <p>{product.description}</p>
                ) : (
                  <p className="text-gray-500 italic">
                    No description available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
