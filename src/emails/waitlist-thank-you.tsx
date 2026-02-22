type WaitlistThankYouEmailProps = {
  email: string
}

export function WaitlistThankYouEmail({ email }: WaitlistThankYouEmailProps) {
  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: "#f3f4f6",
        margin: 0,
        padding: "24px",
      }}
    >
      <table
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        role="presentation"
        style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "14px" }}
      >
        <tbody>
          <tr>
            <td style={{ padding: "28px" }}>
              <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#6b7280" }}>ShipQuick Waitlist</p>
              <h1 style={{ margin: "0 0 16px", fontSize: "26px", lineHeight: 1.2, color: "#111827" }}>
                Thanks for joining the waitlist
              </h1>
              <p style={{ margin: "0 0 12px", fontSize: "16px", lineHeight: 1.6, color: "#374151" }}>
                You are now on the list with <strong>{email}</strong>.
              </p>
              <p style={{ margin: "0 0 16px", fontSize: "16px", lineHeight: 1.6, color: "#374151" }}>
                We will let you know first when new features and early access slots go live.
              </p>
              <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>Team ShipQuick</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
