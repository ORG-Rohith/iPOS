

export interface OperatingHours {
    open: string;
    close: string;
    isClosed: boolean;
}

export interface WeeklyOperatingHours {
    monday: OperatingHours;
    tuesday: OperatingHours;
    wednesday: OperatingHours;
    thursday: OperatingHours;
    friday: OperatingHours;
    saturday: OperatingHours;
    sunday: OperatingHours;
}

export interface Outlet {
    id: string;
    uuid: string;
    name: string;
    type: string;
    description: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    timezone: string;
    phone: string;
    email: string;
    devicesCount: string;
    todaySales: string;
    staffCount: string;
    operating_hours: WeeklyOperatingHours;
    tax_rule: string;
    currency: string;
    receipt_header: string;
    receipt_footer: string;
    number_of_registers: string;
    manager_id?: string;
    tenant_id: string;
    is_active: boolean;
    status: string;
    tablesCount: string;
    created_on: string;
    updated_on: string;
}

export interface CreateOutletPayload {
    name: string;
    type: string;
    description?: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    timezone: string;
    phone?: string;
    email?: string;
    operating_hours?: WeeklyOperatingHours;
    tax_rule?: string;
    currency?: string;
    receipt_header?: string;
    receipt_footer?: string;
    number_of_registers?: number;
    manager_id?: number;
    tenant_id: number;
}

export interface UpdateOutletPayload extends Partial<CreateOutletPayload> { }
