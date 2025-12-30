import type { FC } from "react";

import { Button } from "@/payload/blocks/button/component";
import { Carousel } from "@/payload/blocks/carousel/component";
import { ContactForm } from "@/payload/blocks/contact-form/component";
import { Headline } from "@/payload/blocks/headline/component";
import { Section } from "@/payload/blocks/section/component";
import { StatusAlert } from "@/payload/blocks/status-alert/component";
import { Text } from "@/payload/blocks/text/component";
import { Gallery } from "@/payload/blocks/gallery/component";
import { Realizations } from "@/payload/blocks/realizations/component";
realizations: Realizations,
};

export function Block(props: BlocksProps) {
  const Comp = blockComponents[props.blockType] as FC<BlocksProps>;
  return <Comp {...props} />;
}
