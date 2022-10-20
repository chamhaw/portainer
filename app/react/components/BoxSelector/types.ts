import type { FeatureId } from '@/react/portainer/feature-flags/enums';

import { IconProps } from '@@/Icon';

export type Value = number | string;

export interface BoxSelectorOption<T extends Value> extends IconProps {
  id: string;
  label: string;
  description: string;
  value: T;
  disabled?: () => boolean;
  tooltip?: () => string;
  feature?: FeatureId;
  hide?: boolean;
}
