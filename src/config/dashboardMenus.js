export const residentMenus = [
  { label: 'Overview', path: '', icon: '🏠' },
  { label: 'On-Demand Request', path: 'on-demand', icon: '📦' },
  { label: 'Payments', path: 'payments', icon: '💳' },
  { label: 'Complaints', path: 'complaints', icon: '📝' },
  { label: 'My QR Code', path: 'qr', icon: '📱' },
];

export const collectorMenus = [
  { label: 'Route Overview', path: '', icon: '🗺️' },
  { label: "Today's Tasks", path: 'tasks', icon: '✅' },
  { label: 'QR Scanner', path: 'scan', icon: '📷' },
];

export const adminMenus = [
  { label: 'Analytics', path: '', icon: '📊' },
  { label: 'Residents', path: 'residents', icon: '👤' },
  { label: 'Collectors', path: 'collectors', icon: '🚛' },
  { label: 'Zones & Routes', path: 'zones', icon: '📍' },
  { label: 'On-Demand', path: 'on-demand', icon: '📦' },
  { label: 'Complaints', path: 'complaints', icon: '📝' },
];

export function getMenusForRole(role) {
  if (role === 'admin') return { menus: adminMenus, basePath: '/dashboard/admin' };
  if (role === 'collector') return { menus: collectorMenus, basePath: '/dashboard/collector' };
  return { menus: residentMenus, basePath: '/dashboard/resident' };
}
