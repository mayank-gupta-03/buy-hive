import { paymentFormSchema } from "@/schemas/paymentForm.schema";
import z from "zod";

export type PaymentForm = z.infer<typeof paymentFormSchema>;
