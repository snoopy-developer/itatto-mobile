import React from 'react';
import { Text, TextProps } from './Themed';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextStyle } from 'react-native';
import { screenDefaultHeight } from '@/constants/Params';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}

export function SansText(props: TextProps) {
  const { style, ...otherProps } = props;

  const stylesArray = Array.isArray(style) ? style : [style];

  const isBold = stylesArray.some(
    (styleItem) => styleItem && (styleItem as TextStyle).fontWeight === 'bold',
  );
  const isHeavy = stylesArray.some(
    (styleItem) => styleItem && (styleItem as TextStyle).fontWeight === 'heavy',
  );

  const processedStyles = stylesArray.map((styleItem) => {
    if (styleItem && typeof styleItem === 'object' && 'fontSize' in styleItem) {
      return {
        ...styleItem,
        fontSize: RFValue(
          (styleItem as TextStyle).fontSize as number,
          screenDefaultHeight,
        ),
      };
    }
    return styleItem;
  });

  return (
    <Text
      {...otherProps}
      style={[
        ...processedStyles,
        {
          fontFamily:
            (isBold && 'PublicSansBold') ||
            (isHeavy && 'PublicSansHeavy') ||
            'PublicSans',
        },
      ]}
    />
  );
}
