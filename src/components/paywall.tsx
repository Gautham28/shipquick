import { CheckoutButton } from "@/components/checkout-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Paywall() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ShipQuick Pro Required</CardTitle>
        <CardDescription>
          Upgrade once to unlock the Pro dashboard and premium SaaS starter features.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <CheckoutButton />
        <p className="text-sm text-muted-foreground">
          After a successful payment, refresh this page to see Pro access.
        </p>
      </CardContent>
    </Card>
  )
}
