export interface SidebarItem {
  label: string;
  icon: string;
  path: string;
}

export interface SidebarSection {
  label: string;
  items: SidebarItem[];
}

export interface SidebarData {
  sections: SidebarSection[];
}

export interface StatData {
  color: string
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  type: 'sales' | 'orders' | 'customers' | 'revenue';
}

export interface ChartData {
  label: string;
  value: number;
  type: 'primary' | 'secondary';
}

export interface OutletStatus {
  name: string;
  type: 'Retail' | 'F&B';
  sales: string;
  status: 'Online' | 'Offline' | 'Syncing';
  iconType: 'retail' | 'fb';
}

export interface Transaction {
  id: string;
  orderNumber: string;
  outlet: string;
  cashier: string;
  amount: string;
  paymentType: 'Card' | 'Cash' | 'UPI';
}

export interface Alert {
  id: string;
  message: string;
  type: 'warning' | 'info' | 'danger';
}

export interface DashboardData {
  stats: StatData[];
  chartData: ChartData[];
  outlets: OutletStatus[];
  transactions: Transaction[];
  alerts: Alert[];
}
