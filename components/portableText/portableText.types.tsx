import { PortableTextTypeComponent } from "next-sanity";
import Image from '../Image';

export const defaultTypes: Record<string, PortableTextTypeComponent<any>> = {
    image: Image as PortableTextTypeComponent<any>
}
