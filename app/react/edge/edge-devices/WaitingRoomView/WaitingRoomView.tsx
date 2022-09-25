import { useEnvironmentList } from '@/react/portainer/environments/queries/useEnvironmentList';
import { EdgeTypes } from '@/react/portainer/environments/types';
import { withLimitToBE } from '@/react/hooks/useLimitToBE';

import { InformationPanel } from '@@/InformationPanel';
import { TextTip } from '@@/Tip/TextTip';
import { TableSettingsProvider } from '@@/datatables/useTableSettings';
import { PageHeader } from '@@/PageHeader';

import { DataTable } from './Datatable/Datatable';
import { TableSettings } from './Datatable/types';

export default withLimitToBE(WaitingRoomView);

function WaitingRoomView() {
  const storageKey = 'edge-devices-waiting-room';
  const { environments, isLoading, totalCount } = useEnvironmentList({
    edgeDevice: true,
    edgeDeviceUntrusted: true,
    excludeSnapshots: true,
    types: EdgeTypes,
  });

  return (
    <>
      <PageHeader
        title="Waiting Room"
        breadcrumbs={[
          { label: 'Edge Devices', link: 'edge.devices' },
          { label: 'Waiting Room' },
        ]}
      />

      <InformationPanel>
        <TextTip color="blue">
          Only environments generated from the AEEC script will appear here,
          manually added environments and edge devices will bypass the waiting
          room.
        </TextTip>
      </InformationPanel>

      <TableSettingsProvider<TableSettings>
        defaults={{ pageSize: 10, sortBy: { desc: false, id: 'name' } }}
        storageKey={storageKey}
      >
        <DataTable
          devices={environments}
          totalCount={totalCount}
          isLoading={isLoading}
          storageKey={storageKey}
        />
      </TableSettingsProvider>
    </>
  );
}
