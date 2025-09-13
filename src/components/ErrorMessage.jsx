import { useEffect, useState } from "react";

export default function ErrorMessage({ message }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-fit max-w-lg bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg animate-bounce">
      {message}
    </div>
  );
}
