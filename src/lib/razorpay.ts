import Razorpay from "razorpay"

export function getRazorpayInstance() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    throw new Error("Missing Razorpay env vars: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET")
  }

  const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })

  return { razorpay, keyId }
}
