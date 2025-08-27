import { describe, test, expect } from '@jest/globals';
import type { TwConfig } from '../tw-config';
import { create, plugin } from '../';

describe(`custom match variants`, () => {
  test(`register custom match variants, using package plugin fn`, () => {
    const config: TwConfig = {
      plugins: [
        plugin(({ matchVariant }) => {
          matchVariant({
            variant: () => true,
            'not-variant': () => false,
          });
        }),
      ],
    };
    const tw = create(config);
    expect(tw`variant:pt-[33px] pt-[34px]`).toEqual({ paddingTop: 33 });
    expect(tw`variant:pt-[33px] not-variant:pt-[34px]`).toEqual({ paddingTop: 33 });
    expect(tw`pt-[34px] variant:pt-[33px]`).toEqual({ paddingTop: 33 });
    expect(tw`pt-[33px] not-variant:pt-[34px]`).toEqual({ paddingTop: 33 });
  });

  test(`registered custom match variants merge with regular utilities`, () => {
    const config: TwConfig = {
      plugins: [
        plugin(({ addUtilities, matchVariant }) => {
          addUtilities({
            custom: `mt-1 text-white`,
          });
          matchVariant({
            variant: () => true,
          });
        }),
      ],
    };
    const tw = create(config);
    expect(tw`custom variant:mr-1`).toEqual({
      marginTop: 4,
      color: `#fff`,
      marginRight: 4,
    });
  });
});
