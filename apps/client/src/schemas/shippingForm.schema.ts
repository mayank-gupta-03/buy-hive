import { z } from "zod";

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.email("Invalid email address").min(1, "Email is required!"),
  phone: z
    .string()
    .length(10, "Phone number must be 10 digits!"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
});
