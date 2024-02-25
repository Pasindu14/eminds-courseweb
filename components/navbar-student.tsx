"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { Separator } from "./ui/separator";

export function NavigationStudent() {
  const { data: session }: any = useSession();
  const [isCollapsed, setCollapsed] = React.useState(false);

  const navigationItems = [
    { url: "/dashboard", title: "Dashboard" },
    { url: "/student-payment", title: "Payment" },
    { url: "/student-events", title: "Events" },
    { url: "/student-jobs", title: "Jobs" },
    { url: "/student-exam", title: "Exams" },
    { url: "/student-usage", title: "Usage" },
  ];

  return (
    <motion.div
      className="h-16 w-full flex items-center justify-center shadow-md px-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/*       {session && <AuthSessionValidator userId={session?.id!} />} */}

      <div className="md:flex items-center justify-between w-full  hidden ">
        <div></div>
        <NavigationMenu className="-z-20">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/student-payment" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Payment
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/student-events" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Events
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/student-jobs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Jobs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/student-exam" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Exams
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/student-usage" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Usage
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div>
          {session && (
            <Button
              variant={"ghost"}
              onClick={() => signOut()}
              className="rounded-full"
            >
              <LogOut />
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between w-full md:hidden">
        <h1 className="text-lg font-semibold">Eminds</h1>
        <div onClick={() => setCollapsed(!isCollapsed)}>
          <Menu />
        </div>
      </div>
      <div
        className={`absolute w-[calc(100vw-10px)] bg-slate-50 top-0 left-0 transition-all pb-12 z-50 duration-1000 ${
          !isCollapsed
            ? "-translate-y-full"
            : "+translate-y-full shadow-2xl shadow-black"
        }`}
      >
        <div>
          <X
            onClick={() => setCollapsed(false)}
            className="absolute top-4 right-4"
          />

          <div className="flex flex-col items-start justify-center h-full mt-12 ml-12">
            {navigationItems.map(({ url, title }, index) => (
              <Link
                href={url}
                key={index}
                onClick={() => setCollapsed(false)}
                className="mb-8"
              >
                <div key={title}>{title}</div>
                <Separator />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const ListItem = React.memo(
  React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
    ({ className, title, children, ...props }, ref) => {
      return (
        <li>
          <NavigationMenuLink asChild>
            <a
              ref={ref}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className
              )}
              {...props}
            >
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            </a>
          </NavigationMenuLink>
        </li>
      );
    }
  )
);
ListItem.displayName = "ListItem";
