import { useMemo } from "react";
import { codesToCountry } from "../constants/countries";

export function useCountryToCodeOptions() {
  return useMemo(() => {
    return Object.entries(codesToCountry).map(([value, label]) => {
      return {
        value: value as keyof typeof codesToCountry,
        label,
      };
    });
  }, []);
}
