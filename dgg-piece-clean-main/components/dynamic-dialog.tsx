import type { ReactNode } from "react";

import type { Dialog as DialogProps } from "@/payload-types";

import { Block } from "./block";
import { Modal, ModalActions } from "./modal";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  Dialog as DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

/**
 * Renders a dialog from dialogs collection.
 */
export function DynamicDialog({
  children,
  asChild,
  title,
  description,
  content,
}: DialogProps & Readonly<{ children: ReactNode; asChild?: boolean }>) {
  return (
    <Modal Close={DialogClose}>
      <DialogRoot>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>

        <DialogContent>
          {(title || description) && (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}

          {content?.map((block) => (
            <Block {...block} key={block.id} />
          ))}

          <ModalActions asChild>
            <DialogFooter />
          </ModalActions>
        </DialogContent>
      </DialogRoot>
    </Modal>
  );
}
