import { useCallback } from "react";

const useBengaliNumber = () => {
  const toBengaliNumber = useCallback((num: number | string): string => {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
      .toString()
      .split("")
      .map((d) => (/\d/.test(d) ? bengaliDigits[parseInt(d)] : d))
      .join("");
  }, []);

  return toBengaliNumber;
};

export default useBengaliNumber;
