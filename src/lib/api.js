const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

const STORAGE_KEYS = {
  token: 'token',
  user: 'user',
};

export function getStoredToken() {
  return localStorage.getItem(STORAGE_KEYS.token);
}

export function setStoredToken(token) {
  if (token) {
    localStorage.setItem(STORAGE_KEYS.token, token);
  } else {
    localStorage.removeItem(STORAGE_KEYS.token);
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.user);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.user);
  }
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.token);
  localStorage.removeItem(STORAGE_KEYS.user);
}

export function getUserRole(user = getStoredUser()) {
  const raw = (
    user?.role ||
    user?.userRole ||
    user?.role_name ||
    user?.user_metadata?.role ||
    user?.user_metadata?.userRole ||
    user?.user_metadata?.role_name ||
    user?.raw_user_meta_data?.role ||
    user?.raw_user_meta_data?.userRole ||
    user?.app_metadata?.role ||
    user?.app_metadata?.userRole ||
    null
  );

  if (!raw) return 'citizen';
  const r = String(raw).toLowerCase();
  if (r.includes('authority') || r.includes('admin')) return 'authority';
  return 'citizen';
}

function getUserWard(user = getStoredUser()) {
  return (
    user?.ward_no ||
    user?.user_metadata?.ward_no ||
    user?.ward ||
    null
  );
}

async function parseResponse(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

async function request(path, options = {}) {
  const token = getStoredToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    const message = data?.error || data?.message || `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return data;
}

export async function registerUser(payload) {
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginUser({ email, password }) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function submitComplaint(payload) {
  return request('/api/complaints', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getMyComplaints() {
  return request('/api/complaints/my');
}

export async function getWardComplaints(wardNo = getUserWard()) {
  if (!wardNo) {
    throw new Error('Ward number is missing for authority account.');
  }
  return request(`/api/complaints/ward/${encodeURIComponent(wardNo)}`);
}

export async function updateComplaintStatus(complaintId, status) {
  return request(`/api/complaints/${encodeURIComponent(complaintId)}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function resolveComplaint(complaintId, payload = {}) {
  return request(`/api/complaints/${encodeURIComponent(complaintId)}/resolve`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}
