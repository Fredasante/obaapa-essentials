"use client";
import React, { useState } from "react";
import Billing from "./Billing";
import { useAppSelector } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectTotalPrice } from "@/redux/features/cart-slice";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { initializePaystackPayment } from "@/lib/paystack";
import { CircleCheck } from "lucide-react";
import { removeAllItemsFromCart } from "@/redux/features/cart-slice";
import PriceChangeModal from "./PriceChangeModal";

type PriceChangePrompt = {
  oldTotal: number;
  newTotal: number;
  resolve: (accepted: boolean) => void;
};

const Checkout = () => {
  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useSelector(selectTotalPrice);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedTotal, setConfirmedTotal] = useState<number | null>(null);
  const [priceChangePrompt, setPriceChangePrompt] =
    useState<PriceChangePrompt | null>(null);
  const dispatch = useDispatch();

  const total = confirmedTotal ?? cartTotal;

  const askPriceChange = (oldTotal: number, newTotal: number) =>
    new Promise<boolean>((resolve) => {
      setPriceChangePrompt({ oldTotal, newTotal, resolve });
    });

  const resolvePriceChange = (accepted: boolean) => {
    if (priceChangePrompt) {
      priceChangePrompt.resolve(accepted);
      setPriceChangePrompt(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);

      const customerInfo = {
        fullName: formData.get("fullName") as string,
        phone: formData.get("phone") as string,
        email:
          (formData.get("email") as string) ||
          user?.primaryEmailAddress?.emailAddress ||
          "",
      };

      const deliveryInfo = {
        region: formData.get("region") as string,
        city: formData.get("city") as string,
        address: formData.get("address") as string,
      };

      // Server locks pricing and items into a single-use intent before we
      // open Paystack. /api/orders/create later trusts only the intent.
      const initRes = await fetch("/api/checkout/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            color: item.color || null,
            size: item.size || null,
          })),
        }),
      });
      const initJson = await initRes.json();
      if (!initRes.ok || !initJson?.success) {
        alert(
          initJson?.message ||
            "We couldn't start your checkout. Please refresh and try again.",
        );
        setIsProcessing(false);
        return;
      }

      const intentId: string = initJson.intentId;
      const lockedTotal: number = initJson.total;
      const paystackReference: string = initJson.paystackReference;

      if (Math.abs(lockedTotal - total) > 0.01) {
        const proceed = await askPriceChange(total, lockedTotal);
        if (!proceed) {
          setIsProcessing(false);
          return;
        }
        setConfirmedTotal(lockedTotal);
      }

      initializePaystackPayment({
        email: customerInfo.email || "customer@example.com",
        amount: lockedTotal,
        reference: paystackReference,
        metadata: {
          orderId: intentId,
          customerName: customerInfo.fullName,
          phone: customerInfo.phone,
          items: cartItems.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.discountPrice ?? item.price,
          })),
        },
        onSuccess: async (transaction) => {
          try {
            const response = await fetch("/api/orders/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                intentId,
                customerInfo,
                deliveryInfo,
                paystackReference: transaction.reference,
              }),
            });

            const result = await response.json();

            if (!response.ok || !result?.success) {
              throw new Error(result?.message || "Failed to create order");
            }

            dispatch(removeAllItemsFromCart());

            router.push(
              `/order-success?orderId=${encodeURIComponent(
                result.orderId,
              )}&token=${encodeURIComponent(result.accessToken)}`,
            );
          } catch (error) {
            console.error("Post-payment error:", error);
            alert(
              "Payment was successful but there was an error finalising your order. Please contact support with reference: " +
                transaction.reference,
            );
            setIsProcessing(false);
          }
        },
        onCancel: () => {
          setIsProcessing(false);
          alert("Payment was cancelled. Your order has not been placed.");
        },
      });
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        "Something went wrong. Please try again or contact us on WhatsApp.",
      );
      setIsProcessing(false);
    }
  };

  if (!isLoaded) {
    return (
      <>
        <section className="overflow-hidden py-20 bg-[#F7F8FA] mt-10">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex justify-center items-center min-h-[400px]">
              <ClipLoader size={28} color="#E80088" />
            </div>
          </div>
        </section>
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <section className="overflow-hidden py-20 bg-[#F7F8FA]">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="bg-white shadow-1 rounded-[10px] p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Add some products to your cart before proceeding to checkout.
              </p>
              <Link
                href="/shop"
                className="inline-block font-medium text-white bg-seaBlue-dark py-3 px-8 rounded-md ease-out duration-200 hover:bg-opacity-90"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="overflow-hidden py-10 bg-[#F7F8FA] md:pb-10 lg:pb-18">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              <div className="lg:max-w-[670px] w-full">
                <Billing isGuest={!isSignedIn} />
              </div>

              <div className="max-w-[455px] w-full mt-3 md:mt-5 lg:mt-20">
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      Order Summary
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {cartItems.map((item) => {
                      const itemPrice = item.discountPrice ?? item.price;
                      const itemTotal = itemPrice * item.quantity;

                      return (
                        <div
                          key={item._id}
                          className="flex items-start justify-between gap-4 py-4 border-b border-gray-3"
                        >
                          <div className="flex items-start gap-3 flex-1">
                            {item.mainImageUrl && (
                              <div className="relative w-16 h-16 flex-shrink-0 rounded bg-gray-1">
                                <Image
                                  src={item.mainImageUrl}
                                  alt={item.name}
                                  fill
                                  className="object-contain p-1"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <p className="text-dark text-sm font-medium mb-1">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                Qty: {item.quantity} x GH₵{itemPrice.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <p className="text-dark font-medium">
                            GH₵{itemTotal.toFixed(2)}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex items-center justify-between py-4 border-b border-gray-3 bg-blue-50 -mx-4 sm:-mx-8.5 px-4 sm:px-8.5">
                      <div>
                        <p className="font-semibold text-dark">Total Amount</p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Payment for items only
                        </p>
                      </div>
                      <p className="font-semibold text-lg text-seaBlue-dark">
                        GH₵{total.toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-xs text-yellow-800">
                        <strong>Note:</strong> Delivery fee will be collected
                        separately by the rider upon delivery
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex justify-center items-center gap-2 font-medium text-white bg-seaBlue-dark py-3.5 px-6 rounded-md ease-out duration-200 hover:bg-opacity-90 mt-7.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <ClipLoader size={20} color="#ffffff" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <CircleCheck className="w-4 h-4" />
                      <span>Pay GH₵{total.toFixed(2)} Now</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-gray-600 mt-4">
                  🔒 Secure payment via Paystack • Choose Card or Mobile Money
                  in checkout
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>

      {priceChangePrompt && (
        <PriceChangeModal
          oldTotal={priceChangePrompt.oldTotal}
          newTotal={priceChangePrompt.newTotal}
          onConfirm={() => resolvePriceChange(true)}
          onCancel={() => resolvePriceChange(false)}
        />
      )}
    </>
  );
};

export default Checkout;
