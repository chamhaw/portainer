import { Calendar, Edit } from 'react-feather';

import { BoxSelectorOption } from '@@/BoxSelector';

export const cronMethodOptions: Array<BoxSelectorOption<string>> = [
  {
    id: 'config_basic',
    value: 'basic',
    icon: Calendar,
    iconType: 'badge',
    label: 'Basic configuration',
    description: 'Select date from calendar',
  },
  {
    id: 'config_advanced',
    value: 'advanced',
    icon: Edit,
    iconType: 'badge',
    label: 'Advanced configuration',
    description: 'Write your own cron rule',
  },
];
