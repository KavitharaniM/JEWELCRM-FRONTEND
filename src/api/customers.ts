export type Customer = {
  id: number;
  name: string;
  phone?: string;
  city?: string;
  gold_type?: string;
  visit_count?: number;
  created_at?: string | null;
};

// Use relative paths so the CRA dev server proxy can forward requests to the backend
// (avoid CORS during development). In production, set a full API URL via env vars.
const API_CUSTOMERS_PATH = '/customers';

export async function getCustomers(): Promise<Customer[]> {
    const res = await fetch(API_CUSTOMERS_PATH);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch customers: ${res.status} ${res.statusText} - ${text}`);
    }
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await res.text();
      throw new Error(`Expected JSON response but got ${contentType || 'unknown'}: ${text.slice(0,300)}`);
    }
    const data = (await res.json()) as Customer[];
    return data || [];
}

export async function createCustomer(payload: {
  name: string;
  phone: string;
  city: string;
  gold_type: string;
}): Promise<Customer> {
  const res = await fetch(API_CUSTOMERS_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to create customer: ${res.status} ${res.statusText} - ${text}`);
    }
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await res.text();
      throw new Error(`Expected JSON response but got ${contentType || 'unknown'}: ${text.slice(0,300)}`);
    }
    const data = (await res.json()) as Customer;
    return data;
}

export async function removeCustomer(id: number): Promise<any> {
  const res = await fetch(`${API_CUSTOMERS_PATH}/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error(`Failed to delete customer: ${res.status} ${res.statusText}`);
  }
  // some backends return JSON, others return empty; try to parse JSON safely
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return text;
  }
}
