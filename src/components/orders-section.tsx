import { Truck, CheckCircle, Clock } from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    date: "Dec 15, 2024",
    status: "delivered",
    total: "$89.99",
    items: 3,
    store: "Tech Store Plus",
  },
  {
    id: "ORD-002",
    date: "Dec 12, 2024",
    status: "shipping",
    total: "$156.50",
    items: 2,
    store: "Fashion Hub",
  },
  {
    id: "ORD-003",
    date: "Dec 10, 2024",
    status: "processing",
    total: "$45.00",
    items: 1,
    store: "Local Grocery",
  },
]

const statusConfig = {
  delivered: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-100" },
  shipping: { icon: Truck, color: "text-blue-500", bg: "bg-blue-100" },
  processing: { icon: Clock, color: "text-orange-500", bg: "bg-orange-100" },
}

export default function OrdersSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>

      {orders.map((order) => {
        const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
        const statusColor = statusConfig[order.status as keyof typeof statusConfig].color
        const statusBg = statusConfig[order.status as keyof typeof statusConfig].bg

        return (
          <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${statusBg} rounded-full flex items-center justify-center`}>
                  <StatusIcon className={`w-5 h-5 ${statusColor}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{order.id}</h3>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{order.total}</p>
                <p className="text-sm text-gray-500 capitalize">{order.status}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                {order.items} items from {order.store}
              </span>
              <button className="text-purple-600 hover:text-purple-700 font-medium">View Details</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
