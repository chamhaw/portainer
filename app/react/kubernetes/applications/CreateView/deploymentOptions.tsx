import { Sliders } from 'react-feather';

import { KubernetesApplicationDeploymentTypes } from '@/kubernetes/models/application/models';
import cubes from '@/assets/ico/cubes.svg?c';

export function getDeploymentOptions(supportGlobalDeployment: boolean) {
  return [
    {
      id: 'deployment_replicated',
      label: 'Replicated',
      value: KubernetesApplicationDeploymentTypes.REPLICATED,
      icon: Sliders,
      iconType: 'badge',
      description: 'Run one or multiple instances of this container',
    },
    {
      id: 'deployment_global',
      disabled: () => !supportGlobalDeployment,
      tooltip: () =>
        !supportGlobalDeployment
          ? 'The storage or access policy used for persisted folders cannot be used with this option'
          : '',
      label: 'Global',
      description:
        'Application will be deployed as a DaemonSet with an instance on each node of the cluster',
      value: KubernetesApplicationDeploymentTypes.GLOBAL,
      icon: cubes,
      iconType: 'badge',
    },
  ] as const;
}
