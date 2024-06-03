import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
const jwt = require('jsonwebtoken');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function isTokenExpired(exp: number): boolean {
  try {
    if (!exp) {
      throw new Error('Invalid exp');
    }
    const now = new Date().getTime();
    console.log("now: " + now)
    console.log("exp: " + exp)
    console.log("exp - now: " + (exp - now))
    return exp < now;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
}

