"use client";
import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Stripe redirect:
 * success_url: "https://yourapp.com/checkout/result?status=success&session_id={CHECKOUT_SESSION_ID}"
 * cancel_url:  "https://yourapp.com/checkout/result?status=failure"
 */

function useQuery() {
  const [query, setQuery] = React.useState<URLSearchParams>(
    new URLSearchParams()
  );
  React.useEffect(
    () => setQuery(new URLSearchParams(window.location.search)),
    []
  );
  return query;
}

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center bg-white/70 shadow-theme-xs backdrop-blur px-2.5 py-1 border border-gray-200 rounded-full font-medium text-gray-600 text-theme-xs">
    {children}
  </span>
);

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white/90 shadow-theme-lg backdrop-blur p-6 border border-gray-200 rounded-3xl w-full max-w-md">
    {children}
  </div>
);

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className="font-semibold text-gray-900 text-title-sm md:text-title-md text-center">
    {children}
  </h1>
);

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mt-3 text-gray-600 text-theme-sm text-center leading-6">
    {children}
  </p>
);

const IconWrap: React.FC<{ success?: boolean }> = ({ success }) => (
  <div className="flex justify-center items-center bg-white shadow-theme-sm mx-auto mb-3 border border-gray-200 rounded-2xl w-16 h-16">
    {success ? (
      <CheckCircle2 className="w-8 h-8 text-success-600" />
    ) : (
      <XCircle className="w-8 h-8 text-error-500" />
    )}
  </div>
);

export default function PaymentResultPage() {
  const query = useQuery();
  const status = (query.get("status") || "").toLowerCase();
  const isSuccess = status === "success" || query.get("success") === "true";
  const sessionId = query.get("session_id");
  const message = query.get("message");

  const headline = isSuccess ? "Payment Successful!!" : "Payment Failed";

  const sub = isSuccess
    ? "You have successfully completed your payment. Thank you for your purchase!"
    : message ||
      "We couldn't complete your payment. Your card was not charged. You can try again or contact support if the issue persists.";

  return (
    <div className="flex justify-center items-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary_skin via-tertiary_skin to-white_primary p-4 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full"
      >
        <div className="mx-auto max-w-md">
          <div className="flex justify-center mb-4">
            <Badge>{isSuccess ? "Stripe Checkout" : "Payment Issue"}</Badge>
          </div>

          <Card>
            <IconWrap success={isSuccess} />
            <Title>{headline}</Title>
            <Body>{sub}</Body>

            {isSuccess && sessionId ? (
              <div className="mt-3 text-gray-500 text-theme-xs text-center">
                Checkout session:{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded">
                  {sessionId}
                </code>
              </div>
            ) : null}
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
