"use client";

import { Slot } from "@radix-ui/react-slot";
import {
  type ComponentPropsWithRef,
  type ComponentType,
  createContext,
  type ReactNode,
  use,
  useCallback,
  useState,
} from "react";
import { createPortal } from "react-dom";
import invariant from "tiny-invariant";

import { mergeRefs } from "@/lib/utils";

interface ModalState {
  actionsContainer: HTMLElement | null;
  setActionsContainer: (container: HTMLElement | null) => void;
  Close?: ComponentType<{ children: ReactNode; asChild?: boolean }>;
}

const ModalContext = createContext<ModalState | undefined>(undefined);

function useModal(options: { optional: true }): ModalState | undefined;

function useModal(options?: { optional?: false }): ModalState;

function useModal(options: { optional?: boolean } = {}) {
  const state = use(ModalContext);
  invariant(
    options.optional || state,
    "useActionContainer must be used within an ActionContainer",
  );
  return state;
}

export function Modal({
  children,
  Close,
}: Readonly<{
  children: ReactNode;
  Close?: ComponentType<{ children: ReactNode; asChild?: boolean }>;
}>) {
  const [actionsContainer, setActionsContainer] = useState<HTMLElement | null>(
    null,
  );
  return (
    <ModalContext.Provider
      value={{ actionsContainer, setActionsContainer, Close }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function ModalActions({
  asChild,
  ref,
  ...props
}: ComponentPropsWithRef<"div"> & Readonly<{ asChild?: boolean }>) {
  const Comp = asChild ? Slot : "div";
  const { setActionsContainer } = useModal();

  return (
    <Comp
      {...props}
      ref={mergeRefs(
        ref,
        useCallback(
          (element: HTMLDivElement | null) => setActionsContainer(element),
          [setActionsContainer],
        ),
      )}
    />
  );
}

export function ModalAction({
  children,
  requireModal,
}: Readonly<{ children: ReactNode; requireModal?: boolean }>) {
  const context = useModal({ optional: true });

  if (context) {
    return context.actionsContainer
      ? createPortal(children, context.actionsContainer)
      : null;
  }

  return requireModal ? null : children;
}

export function ModalClose({
  children,
  asChild,
}: Readonly<{ children: ReactNode; asChild?: boolean }>) {
  const Close = useModal({ optional: true })?.Close;
  return Close ? (
    <ModalAction>
      <Close asChild={asChild}>{children}</Close>
    </ModalAction>
  ) : null;
}
