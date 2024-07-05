import Link from 'next/link';
import type { TypedObject } from '@portabletext/types'
import cx from 'classnames';
import type { PortableTextMarkComponent } from './portableText/types'
import { HiOutlineExternalLink } from "react-icons/hi";
import classNames from 'classnames';

const variants = ['internal', 'external', 'button'] as const;
type linkVariant = typeof variants[number];

const linkTypes = ['link', 'external'] as const;
type linkType = typeof linkTypes[number];

export interface DefaultLink extends TypedObject {
  _type: linkType;
  href: string;
  variant?: linkVariant;
}
const isExternalURL = (url: string) => {
  try {
    console.log("1")
    console.log("url", url)
    console.log(" typeof window",  typeof window)
    const internalHost = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_URL_HOST || 'localhost2' : 'localhost2';
    console.log("internal host value ", internalHost)
    const parsedURL = new URL(url, internalHost);
    console.log("2, parsedURL", parsedURL)
    console.log(":internalHost", internalHost)
    return  parsedURL.hostname !== internalHost;
  } catch {
    return false;
  }
};

export const SanityLink: PortableTextMarkComponent<DefaultLink> = ({ children, value }) => {

  if (typeof value?.href !== 'string') {
    return <span style={{ display: "none" }}>Link not recognized, check URL settings</span>
  }

  const isExternal = isExternalURL(value.href);
  console.log("isExternal", isExternal)
  if (!value?.variant || value.variant === 'internal') {
    return <InternalLink href={value.href}>{children}</InternalLink>
  }

  if (value.variant === 'external' || value._type === 'external' ||isExternal) {
    return <ExternalLink href={value.href}>{children}</ExternalLink>;
  }
  if (value.variant === 'button') {
    return <ButtonLink href={value.href}>{children}</ButtonLink>
  }
}

type LinkProps = {
  href: string;
  children: React.ReactNode;
  classNames?: string;
} & React.HTMLProps<HTMLAnchorElement>

export const InternalLink = ({ href, children, classNames, ...props }: LinkProps) => <Link
  className={cx("underline transition hover:opacity-50", classNames)}
  href={href}
  prefetch={true}
  {...props}
>
  {children}
</Link>

export const ExternalLink = ({ href, children, classNames, ...props }: LinkProps) => <Link
className={cx("underline transition hover:opacity-50", classNames)}
href={href}
prefetch={false}
rel={"noopener nofollow noreferrer"}
{...props}
>
{children}{' '}<HiOutlineExternalLink />
</Link>

export const ButtonLink = ({href, children, classNames, ...props}: LinkProps) =>  <Link
className={cx("rounded-md p-4 bg-blue-400 text-white block border border-transparent hover:bg-indigo-200 hover:border-indigo-500 hover:text-black focus:bg-indigo-200 focus:border-indigo-500 focus:text-black active:bg-indigo-200 active:border-indigo-600 active:text-black", classNames)}
href={href}
prefetch={true}
{...props}
>
{children}
</Link>


export default SanityLink;
