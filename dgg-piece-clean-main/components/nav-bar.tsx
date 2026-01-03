"use client";

import {
  type AnimationPlaybackControls,
  animate,
  m,
  stagger,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import {
  type ComponentPropsWithRef,
  createContext,
  type ReactNode,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import invariant from "tiny-invariant";

import { useIsClient } from "@/hooks/use-is-client";
import { cn } from "@/lib/utils";

import { Text } from "./text";

interface NavBarState {
  isOpen: boolean;
  toggle(): void;
}

const NavBarContext = createContext<NavBarState | undefined>(undefined);

function useNavBar() {
  const context = use(NavBarContext);
  invariant(context, "useNavBar must be used within a NavBar");
  return context;
}

export function NavBar({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const isClient = useIsClient();

  return (
    <NavBarContext.Provider
      value={{
        isOpen,
        toggle: useCallback(() => setOpen((value) => !value), []),
      }}
    >
      <nav className="-translate-x-1/2 fixed top-4 left-1/2 z-50 w-[90%] rounded-[40px] bg-gradient-to-b from-accent to-[rgba(33,33,33,0.4)] p-px">
        <m.div
          animate={isOpen ? "open" : "closed"}
          initial={isClient}
          variants={{
            closed: {
              height: "64px",
              transition: {
                delay: 0.2,
                delayChildren: stagger(0.03, { from: "last" }),
              },
            },
            open: {
              height: 399,
              transition: {
                when: "beforeChildren",
                delayChildren: stagger(0.03),
              },
            },
          }}
          className="flex min-h-[64px] flex-col gap-8 overflow-hidden rounded-[40px] bg-dark-600 px-8 py-2 transition-[height]"
        >
          {children}
        </m.div>
      </nav>
    </NavBarContext.Provider>
  );
}

export function NavBarHeader({
  className,
  children,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      {...props}
      className={cn("zoom-out flex animate-in flex-col gap-3", className)}
    >
      <div className="grid grid-flow-col items-center justify-between">
        {children}
      </div>

      <m.div
        className="mx-auto h-px bg-[linear-gradient(90deg,#00000000_0%,var(--color-dark-300)_25%,var(--color-dark-300)_75%,#00000000_100%)]"
        variants={{
          open: { width: 254 },
          closed: { width: 0 },
        }}
      />
    </div>
  );
}

export function NavBarTrigger({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof m.button>) {
  const { isOpen, toggle } = useNavBar();
  const isClient = useIsClient();

  return (
    <m.button
      initial={isClient ? undefined : false}
      animate={isOpen ? "open" : "closed"}
      onClick={toggle}
      {...props}
      className={cn("relative h-6 w-6 cursor-pointer", className)}
    >
      {children ?? (
        <>
          <m.div
            className="-translate-x-1/2 absolute left-1/2 h-0.5 w-5 rounded-lg bg-[#999999]"
            variants={{
              closed: { top: "30%", rotate: 0 },
              open: {
                top: "calc(50% - var(--spacing) * 0.25)",
                rotate: -45,
              },
            }}
          />

          <m.div
            className="-translate-x-1/2 absolute left-1/2 h-0.5 w-5 rounded-lg bg-[#999999]"
            variants={{
              closed: { top: "70%", rotate: 0 },
              open: {
                top: "calc(50% - var(--spacing) * 0.25)",
                rotate: 45,
              },
            }}
          />
        </>
      )}
    </m.button>
  );
}

export function NavBarContent({
  className,
  ...props
}: ComponentPropsWithRef<"ul">) {
  return (
    <ul
      {...props}
      className={cn("flex flex-col items-center gap-6", className)}
    />
  );
}

export function NavBarItem({
  className,
  ...props
}: ComponentPropsWithRef<typeof m.li>) {
  const { toggle } = useNavBar();
  return (
    <Text
      variant="p2"
      className={cn(
        "not-last:mb-0 text-light-400 transition-colors hover:text-light-200",
        className,
      )}
      asChild
    >
      <m.li
        variants={{
          closed: { filter: "blur(10px)", scale: 0.8, opacity: 0 },
          open: { filter: "blur(0px)", scale: 1, opacity: 1 },
        }}
        {...props}
        onClick={(e) => {
          toggle();
          props.onClick?.(e);
        }}
      />
    </Text>
  );
}

export function NavBarAction({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof m.button>) {
  const idleControls = useRef<AnimationPlaybackControls>(undefined);
  const inOutControls = useRef<AnimationPlaybackControls>(undefined);

  const gradientX = useMotionValue("0%");
  const gradientY = useMotionValue("0%");
  const gradientSize = useMotionValue(0);
  const gradientWidth = useTransform(gradientSize, [0, 1], ["30%", "100%"]);
  const gradientHeight = useTransform(gradientSize, [0, 1], ["50%", "100%"]);
  const gradient = useMotionTemplate`radial-gradient(${gradientWidth} ${gradientHeight} at ${gradientX} ${gradientY}, var(--color-primary-450), transparent)`;

  const startIdleAnimation = useCallback(() => {
    idleControls.current = animate(
      [
        [gradientX, ["100%", "100%", "0%", "0%", "100%"]],
        [gradientY, ["0%", "100%", "100%", "0%", "0%"], { at: 0 }],
      ],
      {
        // @ts-expect-error
        repeat: Infinity,
        duration: 2,
        ease: "linear",
        times: [0, 0.13, 0.5, 0.63, 1],
      },
    );
  }, [gradientX, gradientY]);

  useEffect(() => startIdleAnimation(), [startIdleAnimation]);

  const handlePointerEnter = () => {
    idleControls.current?.stop();
    inOutControls.current?.stop();
    inOutControls.current = animate(
      [
        [gradientX, "50%"],
        [gradientY, "50%", { at: 0 }],
        [gradientSize, 1, { at: 0 }],
      ],
      {
        duration: 1,
      },
    );
  };

  const handlePointerLeave = () => {
    startIdleAnimation();

    inOutControls.current?.stop();
    inOutControls.current = animate(gradientSize, 0, { duration: 1 });
  };

  return (
    <m.button
      variants={{
        closed: { filter: "blur(10px)", scale: 0.8, opacity: 0 },
        open: { filter: "blur(0px)", scale: 1, opacity: 1 },
      }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      {...props}
      className={cn("relative cursor-pointer rounded-lg", className)}
    >
      <m.div
        className={cn(
          "absolute top-0 left-0 h-full w-full overflow-visible blur-lg",
        )}
        style={{
          backgroundImage: gradient,
        }}
      />
      <m.div
        className={cn("relative h-full w-full rounded-xl p-px")}
        style={{ backgroundImage: gradient }}
      >
        <m.div className="flex h-full w-full items-center justify-center gap-2 rounded-xl bg-dark-500 px-5 py-2 text-light-200">
          {children}
        </m.div>
      </m.div>
    </m.button>
  );
}
