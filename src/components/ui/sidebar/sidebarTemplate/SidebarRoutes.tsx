import { ROLES } from '@/theme';
import { UserIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export const SidebarRoutes = [
  {
    route: '/admin/orders',
    icon: CurrencyDollarIcon,
    label: 'Ordenes',
    scope: [ROLES.super, ROLES.client],
  },
  {
    route: '/admin/users',
    icon: UserIcon,
    label: 'Usuarios',
    scope: [ROLES.super],
  },
];
