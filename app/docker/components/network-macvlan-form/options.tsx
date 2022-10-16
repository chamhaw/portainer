import { Share2, Sliders } from 'react-feather';

export function getOptions(hasNetworks: boolean) {
  const options = [
    {
      id: 'network_config',
      icon: Sliders,
      iconType: 'badge',
      label: 'Configuration',
      description: 'I want to configure a network before deploying it',
      value: 'local',
    },
    {
      id: 'network_deploy',
      icon: Share2,
      iconType: 'badge',
      label: 'Creation',
      description: 'I want to create a network from a configuration',
      value: 'swarm',
      disabled: () => !hasNetworks,
    },
  ] as const;

  return options;
}
