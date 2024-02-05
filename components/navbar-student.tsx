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
import { LogOut } from "lucide-react";

const masterComponents: { title: string; href: string; description: string }[] =
  [
    {
      title: "Student",
      href: "/students",
      description:
        "You can efficiently manage and organize student details using this platform, ensuring easy access and updates to vital information",
    },
    {
      title: "Courses",
      href: "/courses",
      description:
        "Efficiently manage and organize course details, ensuring easy access and updates.",
    },
    {
      title: "Batches",
      href: "/batches",
      description:
        "Efficiently manage and organize batch details on this platform, ensuring easy access and updates to vital information.",
    },
    {
      title: "Jobs",
      href: "/jobs",
      description:
        "Easily manage and view job postings, keeping track of openings, application deadlines, and job details.",
    },
    {
      title: "Exams",
      href: "/exams",
      description:
        "Efficiently manage and organize exam details on this platform, ensuring easy access and updates to vital information.",
    },
    {
      title: "Questions",
      href: "/questions",
      description:
        "Efficiently manage and review exam questions, keeping tabs on various topics, difficulty levels, and correct answers for streamlined exam preparation and assessment",
    },
  ];

const mappingComponents: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Student Mapping",
    href: "/student-mapping",
    description:
      "Streamline the process of assigning students to courses and batches, facilitating effective management and tracking of student enrollments.",
  },
  {
    title: "Sessions",
    href: "/sessions",
    description:
      "Efficiently manage and organize session details on this platform, ensuring easy access and updates to vital information.",
  },
];

const examComponents: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Exam Results",
    href: "/exam-results",
    description:
      "View and manage exam results for students. Allow sorting, filtering and exporting results for analysis and tracking of student performance.",
  },
  {
    title: "Final Submissions Results",
    href: "/final-exams-submissions-results",
    description:
      "View and manage final exam submission results for all courses and other details for each submission.",
  },
];

const paymentComponents: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Payments",
    href: "/payments",
    description:
      "Streamline the management and tracking of payments, ensuring seamless transactions and easy access to crucial financial information.",
  },
  {
    title: "Payment Report",
    href: "/payment-report",
    description:
      "Manage and organize session details efficiently, ensuring convenient access and timely updates to essential information.",
  },
];

export function NavigationStudent() {
  const { data: session }: any = useSession();

  return (
    <motion.div
      className="h-16 w-full flex items-center justify-center shadow-md px-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/*       {session && <AuthSessionValidator userId={session?.id!} />} */}

      <div className="flex items-center justify-between w-full">
        <div></div>
        <NavigationMenu>
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
