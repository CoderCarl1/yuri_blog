import type {PortableTextMarkComponent} from './types'
import SanityLink from '../Link';

const underlineStyle = {textDecoration: 'underline'}

export const defaultMarks: Record<string, PortableTextMarkComponent | undefined> = {
  em: ({children}) => <em>{children}</em>,
  strong: ({children}) => <strong>{children}</strong>,
  // code: ({children}) => <code>{children}</code>,
  underline: ({children}) => <span style={underlineStyle}>{children}</span>,
  // 'strike-through': ({children}) => <del>{children}</del>,
  link: SanityLink,
  external: SanityLink
}