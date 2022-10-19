import { KubernetesConfigurationKinds } from 'Kubernetes/models/configuration/models';
import { Lock } from 'react-feather';

import filecode from '@/assets/ico/file-code.svg?c';

import { BoxSelectorOption } from '@@/BoxSelector';

export const typeOptions: ReadonlyArray<BoxSelectorOption<number>> = [
  {
    id: 'type_basic',
    value: KubernetesConfigurationKinds.CONFIGMAP,
    icon: filecode,
    iconType: 'badge',
    label: 'ConfigMap',
    description: 'This configuration holds non-sensitive information',
  },
  {
    id: 'type_secret',
    value: KubernetesConfigurationKinds.SECRET,
    icon: Lock,
    iconType: 'badge',
    label: 'Secret',
    description: 'This configuration holds sensitive information',
  },
] as const;
