import React from "react";
import clsx from "clsx";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "bg-white shadow-md rounded-xl p-6 w-full",
        className
      )}
    >
      {children}
    </div>
  );
}
