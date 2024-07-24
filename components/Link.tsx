import Link from 'next/link';
import type { TypedObject } from '@portabletext/types';
import cx from 'classnames';
import type { PortableTextMarkComponent } from './portableText/types';
import { HiOutlineExternalLink } from 'react-icons/hi';

const variants = ['internal', 'external', 'button'] as const;
type linkVariant = (typeof variants)[number];

const linkTypes = ['link', 'external'] as const;
type linkType = (typeof linkTypes)[number];

export interface DefaultLink extends TypedObject {
  _type: linkType;
  href: string;
  variant?: linkVariant;
}
const isExternalURL = (url: string) => {
  try {
    const internalHost =
      typeof window !== 'undefined'
        ? process.env.NEXT_PUBLIC_URL_HOST || 'localhost2'
        : 'localhost2';
    const parsedURL = new URL(url, internalHost);
    return parsedURL.hostname !== internalHost;
  } catch {
    return false;
  }
};

export const SanityLink: PortableTextMarkComponent<DefaultLink> = ({
  children,
  value,
}) => {
  if (typeof value?.href !== 'string') {
    return (
      <span style={{ display: 'none' }}>
        Link not recognized, check URL settings
      </span>
    );
  }

  // TODO: fix this
  const isExternal = isExternalURL(value.href);
  console.log('isExternal', isExternal);
  if (!value?.variant || value.variant === 'internal') {
    return <InternalLink href={value.href}>{children}</InternalLink>;
  }

  if (
    value.variant === 'external' ||
    value._type === 'external' ||
    isExternal
  ) {
    return <ExternalLink href={value.href}>{children}</ExternalLink>;
  }
  if (value.variant === 'button') {
    return <ButtonLink href={value.href}>{children}</ButtonLink>;
  }
};

type LinkProps = {
  href: string;
  children: React.ReactNode;
  classNames?: string;
} & React.HTMLProps<HTMLAnchorElement>;

export const InternalLink = ({
  href,
  children,
  classNames,
  ...props
}: LinkProps) => (
  <Link
    className={cx('link', classNames)}
    href={href}
    prefetch={true}
    {...props}
  >
    {children}
  </Link>
);

export const ExternalLink = ({
  href,
  children,
  classNames,
  ...props
}: LinkProps) => (
  <Link
    className={cx('link', classNames)}
    href={href}
    prefetch={false}
    rel={'noopener nofollow noreferrer'}
    {...props}
  >
    {children} <HiOutlineExternalLink />
  </Link>
);

export const ButtonLink = ({
  href,
  children,
  classNames,
  ...props
}: LinkProps) => (
  <Link
    className={cx('btn btn-primary', classNames)}
    href={href}
    prefetch={true}
    {...props}
  >
    {children}
  </Link>
);

export default SanityLink;
