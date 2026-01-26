import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string) {
  const cleaned = phone.replace(/\D/g, "");

  // +55 (11) 98765-4321
  if (cleaned.length === 13) {
    return cleaned.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4");
  }

  // +55 (11) 3456-7890
  if (cleaned.length === 12) {
    return cleaned.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, "+$1 ($2) $3-$4");
  }

  return phone;
}

export function formatName(name: string) {
  const arr_name: string[] = name.split(" ");

  if (arr_name.length === 0) {
    return arr_name[0]
      .charAt(0)
      .toLocaleUpperCase()
      .concat(arr_name[0].slice(1));
  } else {
    return arr_name.map((name, index) => {
      let name_formated = name
        .charAt(0)
        .toLocaleUpperCase()
        .concat(name.slice(1));

      if (index + 1 !== arr_name.length) {
        name_formated = name_formated.concat(" ");
      }

      return name_formated;
    });
  }
}
