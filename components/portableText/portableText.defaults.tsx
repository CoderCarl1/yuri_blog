import type { PortableTextBlockStyle } from '@portabletext/types';

import type {
  PortableTextBlockComponent,
  PortableTextReactComponents,
} from './types';
import { DefaultListItem, defaultLists } from './portableText.list';
import { defaultTypes } from './portableText.types';
import { defaultMarks } from './portableText.marks';
import {
  DefaultUnknownBlockStyle,
  DefaultUnknownList,
  DefaultUnknownListItem,
  DefaultUnknownMark,
  DefaultUnknownType,
} from './unknown';

export const DefaultHardBreak = (): JSX.Element => <br />;

export const defaultBlockStyles: Record<
  PortableTextBlockStyle,
  PortableTextBlockComponent | undefined
> = {
  normal: ({ children }) => <p className="font-sans text-base">{children}</p>,
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  h1: ({ children }) => <h1 className="font-serif text-4xl">{children}</h1>,
  h2: ({ children }) => <h2 className="font-serif text-3xl">{children}</h2>,
  h3: ({ children }) => <h3 className="font-serif text-2xl">{children}</h3>,
  h4: ({ children }) => <h4 className="font-serif text-xl">{children}</h4>,
  // h5: ({children}) => <h5 className='font-serif text-base'>{children}</h5>,
  // h6: ({children}) => <h6 className='font-serif text-base'>{children}</h6>
};

export const defaultComponents: PortableTextReactComponents = {
  types: defaultTypes,
  block: defaultBlockStyles,
  marks: defaultMarks,
  list: defaultLists,
  listItem: DefaultListItem,
  hardBreak: DefaultHardBreak,

  unknownType: DefaultUnknownType,
  unknownMark: DefaultUnknownMark,
  unknownList: DefaultUnknownList,
  unknownListItem: DefaultUnknownListItem,
  unknownBlockStyle: DefaultUnknownBlockStyle,
};
