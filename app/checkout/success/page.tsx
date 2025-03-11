"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState, useId } from "react";

export default function CheckoutSuccessPage() {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';
  const [mounted, setMounted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  // Use a stable ID for SSR
  const stableId = useId();
  
  useEffect(() => {
    // Only run on client-side
    setMounted(true);
    // Generate order number only on client-side to avoid hydration mismatch
    setOrderNumber(Math.floor(100000 + Math.random() * 900000).toString());
  }, []);
  
  if (!mounted) {
    return (
      <div className="container py-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800 text-center flex items-center justify-center" style={{ minHeight: "300px" }}>
            <div className="animate-pulse">
              <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-20">
      <motion.div 
        className="max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800 text-center">
          <motion.div 
            className="h-24 w-24 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
          >
            <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
          </motion.div>
          
          <motion.h1 
            className="text-3xl font-bold mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Thank you for your order!
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your order has been placed successfully. You will receive an email confirmation shortly.
          </motion.p>
          
          <motion.div 
            className="bg-muted/50 dark:bg-muted/30 p-5 rounded-lg mb-6"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm">
              Order Reference: <span className="font-bold">NB-{orderNumber || `${stableId.replace(/:/g, '')}`}</span>
            </p>
          </motion.div>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/products" className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30">
              <Link href="/">
                Return Home
              </Link>
            </Button>
          </motion.div>
          
          <motion.p 
            className="text-sm text-muted-foreground mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            If you have any questions about your order, please contact our customer support.
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
