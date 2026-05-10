export type Customer = {
  id: number;
  name: string;
  phone?: string;
  city?: string;
  gold_type?: string;
  visit_count?: number;
  created_at?: string | null;
};

// Determine API base URL from environment (REACT_APP_API_URL) or default to localhost:5000
// This lets you run the backend on port 5000 directly without relying on CRA proxy.
// Determine API base URL from environment (REACT_APP_API_URL). If not set,
// use relative paths so the CRA dev server proxy can forward requests to the backend
// (avoids CORS during development).
const API_BASE = process.env.REACT_APP_API_URL || '';
const API_CUSTOMERS_PATH = API_BASE ? `${API_BASE}/customers` : '/customers';

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

    // The backend returns column names that may be capitalized (e.g. `Name`, `Phone`, `City`).
    // Normalize each record to the lowercase keys the UI expects.
    const raw = await res.json();
    if (!Array.isArray(raw)) return [];

    const normalize = (obj: any): Customer => {
      return {
        id: obj.id ?? obj.ID ?? obj.Id ?? null,
        name: (obj.name ?? obj.Name ?? obj.NAME ?? '') as string,
        phone: (obj.phone ?? obj.Phone ?? obj.PHONE ?? '') as string,
        city: (obj.city ?? obj.City ?? obj.CITY ?? '') as string,
        gold_type: (obj.gold_type ?? obj.gold_type ?? obj.Gold_Type ?? obj.goldType ?? '') as string,
        created_at: (obj.created_at ?? obj.createdAt ?? obj.Created_At ?? null) as string | null,
      };
    };

    const data = raw.map(normalize) as Customer[];
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
    const text = await res.text();
    throw new Error(`Failed to delete customer: ${res.status} ${res.statusText} - ${text}`);
  }
  // some backends return JSON, others return empty; try to parse JSON safely
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return text;
  }
}

