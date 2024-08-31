

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon , DollarSignIcon, UsersIcon, PercentIcon } from "lucide-react"

export function SubscriptionDashboard() {

  const customers = [
    { name: "Some_Dude | OC", plan: "Weekly", amount: "250", status: "Pending" },
    { name: "ptdnxyz - BOBO", plan: "Weekly", amount: "210", status: "Pending" },
  ]

  const calculateTotalAmount = (customers: { amount: string }[]): number => {
    return customers.reduce((total, customer) => total + parseFloat(customer.amount), 0);
  };
  const totalAmount = calculateTotalAmount(customers);
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h1 className="text-lg font-semibold">Astro - Cuisine | Caffeinated Infusion</h1>
      </header>
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <Card className="w-full mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Subscription Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-lg">
                <UsersIcon className="w-8 h-8 mb-2" />
                <p className="text-sm font-medium">Total Subscribers</p>
                <p className="text-2xl">{customers.length}</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-lg">
                <DollarSignIcon className="w-8 h-8 mb-2" />
                <p className="text-sm font-medium">Price</p>
                <p className="text-2xl">329 ICA</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-lg">
                <TrendingUpIcon className="w-8 h-8 mb-2" />
                <p className="text-sm font-medium">Weekly Output</p>
                <p className="text-2xl">N/A</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-lg">
                <TrendingDownIcon className="w-8 h-8 mb-2" />
                <p className="text-sm font-medium">Weekly Reserve</p>
                <p className="text-2xl">{totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <h2 className="text-xl font-semibold mb-4">Recent Subscriptions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customers.map((customer, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{customer.name}</CardTitle>
                <div className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  customer.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100" :
                  customer.status === "Pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100" :
                  "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100"
                }`}>
                  {customer.status}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Plan:</div>
                  <div className="font-medium">{customer.plan}</div>
                  <div className="text-muted-foreground">Amount:</div>
                  <div className="font-medium">{customer.amount}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}