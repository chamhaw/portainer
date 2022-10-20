import clsx from 'clsx';

import { isLimitedToBE } from '@/react/portainer/feature-flags/feature-flags.service';
import { Icon } from '@/react/components/Icon';

import './BoxSelectorItem.css';

import { BoxSelectorOption, Value } from './types';
import { LimitedToBeIndicator } from './LimitedToBeIndicator';
import { BoxOption } from './BoxOption';

type Props<T extends Value> = {
  option: BoxSelectorOption<T>;
  radioName: string;
  disabled?: boolean;
  tooltip?: string;
  onSelect(value: T, limitedToBE: boolean): void;
  isSelected(value: T): boolean;
  type?: 'radio' | 'checkbox';
};

export function BoxSelectorItem<T extends Value>({
  radioName,
  option,
  onSelect = () => {},
  disabled,
  tooltip,
  type = 'radio',
  isSelected,
}: Props<T>) {
  const limitedToBE = isLimitedToBE(option.feature);

  const beIndicatorTooltipId = `box-selector-item-${radioName}-${option.id}-limited`;
  return (
    <BoxOption
      className={clsx({
        business: limitedToBE,
        limited: limitedToBE,
      })}
      radioName={radioName}
      option={option}
      isSelected={isSelected}
      disabled={disabled}
      onSelect={(value) => onSelect(value, limitedToBE)}
      tooltip={tooltip}
      type={type}
    >
      <>
        {limitedToBE && (
          <LimitedToBeIndicator
            tooltipId={beIndicatorTooltipId}
            featureId={option.feature}
          />
        )}
        <div className={clsx({ 'opacity-30': limitedToBE })}>
          <div className="boxselector_img_container">
            {!!option.icon && (
              <Icon
                icon={option.icon}
                feather={option.featherIcon}
                className="boxselector_icon !flex items-center"
              />
            )}
          </div>
          <div className="boxselector_header">{option.label}</div>
          <p className="box-selector-item-description">{option.description}</p>
        </div>
      </>
    </BoxOption>
  );
}
