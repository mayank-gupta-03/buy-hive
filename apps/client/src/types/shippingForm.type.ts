import { shippingFormSchema } from "@/schemas/shippingForm.schema";
import z from "zod";

export type ShippingForm = z.infer<typeof shippingFormSchema>;
