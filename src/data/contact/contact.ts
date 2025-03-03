import type { InputConfig } from "../components/DynamicForm.astro";
import contactData from "./contact.json";

interface ContactPage {
  title: string;
  questions: string[];
  formInputs: InputConfig[];
}

export const contactPages: Record<string, ContactPage> = contactData as Record<string, ContactPage>; 