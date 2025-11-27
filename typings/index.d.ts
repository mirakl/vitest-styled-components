import { Plugin } from '@vitest/pretty-format';
import { css } from 'styled-components';

export interface Options {
  media?: string;
  modifier?: string | ReturnType<typeof css>;
  supports?: string;
}
export declare function toHaveStyleRule(
  property: string,
  value?: string | RegExp | object | any[] | Function,
  options?: Options
): { pass: boolean; message: ()=> string };

export declare function resetStyleSheet(): void;
export interface StyledComponentsSerializerOptions {
  addStyles?: boolean,
  classNameFormatter?: (index: number) => string
}

export declare const styleSheetSerializer: Plugin & {
  setStyleSheetSerializerOptions: (options?: StyledComponentsSerializerOptions) => void
};

declare global {
  namespace jest {
    interface AsymmetricMatcher {
      $$typeof: Symbol;
      sample?: string | RegExp | object | Array<any> | Function;
    }

    type Value = string | number | RegExp | AsymmetricMatcher | undefined;

    interface Options {
      media?: string;
      modifier?: string | ReturnType<typeof css>;
      supports?: string;
    }

    interface Matchers<R, T> {
      toHaveStyleRule(property: string, value?: Value, options?: Options): R;
    }
  }
}
