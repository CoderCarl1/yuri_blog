import { PortableTextTypeComponent } from "next-sanity";
import ImageComponent from '../Image';
import { Image } from "sanity";

interface DefaultImage extends Image {
    _type: 'image'
}

export const defaultTypes: Record<string, PortableTextTypeComponent<any>> = {
    image: ImageComponent as unknown as PortableTextTypeComponent<DefaultImage>
}
