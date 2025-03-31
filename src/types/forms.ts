export interface FormData {
  name: string;
  origin: string;
  temperament: string;
  description: string;
  imageUrl: string;
  width: string;
  height: string;
}

export interface ValidationErrors {
  [key: string]: string;
} 