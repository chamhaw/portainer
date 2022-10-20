import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import ReactTooltip from 'react-tooltip';

import './BoxSelectorItem.css';

import { BoxSelectorOption, Value } from './types';

interface Props<T extends Value> {
  radioName: string;
  option: BoxSelectorOption<T>;
  onSelect?(value: T): void;
  isSelected(value: T): boolean;
  disabled?: boolean;
  tooltip?: string;
  className?: string;
  type?: 'radio' | 'checkbox';
}

export function BoxOption<T extends Value>({
  radioName,
  option,
  onSelect = () => {},
  isSelected,
  disabled,
  tooltip,
  className,
  type = 'radio',
  children,
}: PropsWithChildren<Props<T>>) {
  const tooltipId = `box-option-${radioName}-${option.id}`;
  return (
    <div
      className={clsx('box-selector-item', className)}
      data-tip
      data-for={tooltipId}
      tooltip-append-to-body="true"
      tooltip-placement="bottom"
      tooltip-class="portainer-tooltip"
    >
      <input
        type={type}
        name={radioName}
        id={option.id}
        checked={isSelected(option.value)}
        value={option.value}
        disabled={disabled}
        onChange={() => onSelect(option.value)}
      />

      <label htmlFor={option.id} data-cy={`${radioName}_${option.value}`}>
        {children}
      </label>
      {tooltip && (
        <ReactTooltip
          place="bottom"
          className="portainer-tooltip"
          id={tooltipId}
        >
          {tooltip}
        </ReactTooltip>
      )}
    </div>
  );
}
