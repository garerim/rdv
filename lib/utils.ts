import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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


export const Disconnect = (jwtStorage : string | null | undefined, jwtExp : string | null | undefined) => {
  localStorage.removeItem('jwtToken')
  localStorage.removeItem('jwtExp')

  jwtStorage = null
  jwtExp = null

  return { jwtStorage, jwtExp }
}


export const fetchImageAndConvert = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl)
    const arrayBuffer = await response.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    return uint8Array
  } catch (error) {
    console.error('Erreur lors de la conversion de l\'image:', error)
  }
}

