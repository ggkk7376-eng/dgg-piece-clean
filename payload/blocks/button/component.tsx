import { cache, type ReactNode } from "react";

import External from "@/assets/icons/external.svg";
import { EnterAnimationBlur } from "@/components/animation/enter-animation";
import { Flipper, FlipperContent } from "@/components/animation/flipper";
import { DynamicDialog } from "@/components/dynamic-dialog";
import { Text } from "@/components/text";
import { payload } from "@/lib/payload";
import type { Button as ButtonProps, Dialog } from "@/payload-types";

import Link from "next/link";
import { Page } from "@/payload-types";

export function Button(props: ButtonProps) {
  const { type, label, dialog, page, url } = props;

  const content = (
    <EnterAnimationBlur className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-[#212121] bg-[radial-gradient(66%_93%_at_48%_0%,#262626_0%,var(--color-dark-600)_76%)] px-7 py-4 font-sans">
      <Flipper asChild>
        <Text variant="p2" asChild>
          <span className="flex items-center gap-2">
            <span>{label}</span>
            <FlipperContent
              className="h-6 w-6"
              itemClassName="h-5 w-5 rotate-90"
            >
              <External />
            </FlipperContent>
          </span>
        </Text>
      </Flipper>
    </EnterAnimationBlur>
  );

  if (type === "page" && page) {
    // Check if page is an object (populated) or ID (string)
    const pageSlug = typeof page === 'object' && page !== null ? (page as Page).slug : '';

    if (pageSlug) {
      return <Link href={`/${pageSlug === 'home' ? '' : pageSlug}`}>{content}</Link>;
    }
  }

  if (type === "custom" && url) {
    return <a href={url} target="_blank" rel="noopener noreferrer">{content}</a>;
  }

  if (type === "file" && props.file && typeof props.file === 'object' && props.file.url) {
    return <a href={props.file.url} target="_blank" rel="noopener noreferrer">{content}</a>;
  }

  return (
    <DialogTrigger dialog={dialog}>
      <button type="button">{content}</button>
    </DialogTrigger>
  );
}

async function DialogTrigger({
  children,
  dialog: dialogOrId,
}: Readonly<{ children: ReactNode; dialog?: number | Dialog | null }>) {
  if (dialogOrId == null) {
    return children;
  }

  const dialog =
    typeof dialogOrId === "number" ? await getDialog(dialogOrId) : dialogOrId;

  return (
    <DynamicDialog {...dialog} asChild>
      {children}
    </DynamicDialog>
  );
}

const getDialog = cache(
  async (id: number) => await payload.findByID({ collection: "dialogs", id }),
);
