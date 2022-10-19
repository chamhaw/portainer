import { Box } from 'react-feather';

import { KubernetesApplicationDataAccessPolicies } from '@/kubernetes/models/application/models';
import cubes from '@/assets/ico/cubes.svg?c';

import { BoxSelector } from '@@/BoxSelector';

interface Props {
  isEdit: boolean;
  persistedFoldersUseExistingVolumes: boolean;
  value: number;
  onChange(value: number): void;
}

export function KubeApplicationAccessPolicySelector({
  isEdit,
  persistedFoldersUseExistingVolumes,
  value,
  onChange,
}: Props) {
  const options = getOptions(isEdit, persistedFoldersUseExistingVolumes);

  return (
    <BoxSelector
      slim
      options={options}
      value={value}
      onChange={onChange}
      radioName="data_access_policy"
    />
  );
}

function getOptions(
  isEdit: boolean,
  persistedFoldersUseExistingVolumes: boolean
) {
  return [
    {
      value: KubernetesApplicationDataAccessPolicies.ISOLATED,
      id: 'data_access_isolated',
      icon: cubes,
      iconType: 'badge',
      label: 'Isolated',
      description:
        'Application will be deployed as a StatefulSet with each instantiating their own data',
      tooltip: () =>
        isEdit || persistedFoldersUseExistingVolumes
          ? 'Changing the data access policy is not allowed'
          : '',
      disabled: () => isEdit || persistedFoldersUseExistingVolumes,
    },
    {
      value: KubernetesApplicationDataAccessPolicies.SHARED,
      id: 'data_access_shared',
      icon: Box,
      iconType: 'badge',
      label: 'Shared',
      description:
        'Application will be deployed as a Deployment with a shared storage access',
      tooltip: () =>
        isEdit ? 'Changing the data access policy is not allowed' : '',
      disabled: () => isEdit,
    },
  ] as const;
}
