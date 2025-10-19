import { z } from "zod";

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required!"),
  cardNumber: z.string().length(16, "Card number must be 16 digits!"),
  expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Invalid date format. Please use MM/YY.",
  }),
  cvv: z.string().length(3, "CVV must be 3 digits!"),
});
