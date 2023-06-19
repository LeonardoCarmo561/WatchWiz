import { FormHandles } from "@unform/core";
import { useRef } from "react";


export function useForm() {
  const formRef = useRef<FormHandles>(null);

  return {
    formRef
  }
} 
