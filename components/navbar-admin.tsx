"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { BellDot, LogOut, Menu, X } from "lucide-react";
import { fetchPendingApprovalPayments } from "@/server/actions/payments.actions";
import { Separator } from "./ui/separator";
import NavBarItemAdmin from "./common/navbar-admin-item";
import { set } from "react-hook-form";
import { Loader } from "@/lib/spinners";

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
    {
      title: "Badges",
      href: "/badges",
      description:
        "View and manage badges earned by students for completing courses and other achievement",
    },
    {
      title: "Expire badges",
      href: "/expire-badges",
      description:
        "View and expire badges that were previously earned by students for completing courses and other achievements",
    },
    {
      title: "Events",
      href: "/events",
      description:
        "Discover and participate in our latest events, workshops, and webinars tailored for professional growth and networking.",
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

export function NavigationAdmin() {
  const { data: session }: any = useSession();
  const [loading, setLoading] = React.useState(false);
  const [pendingApprovals, setPendingApprovals] = React.useState<number>(0);
  const [isCollapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    const getPendingApprovals = async () => {
      setLoading(true);
      const result = await fetchPendingApprovalPayments();
      setPendingApprovals(result ?? 0);
      setLoading(false);
    };
    getPendingApprovals();
  }, []);

  return (
    <motion.div
      className="h-16 w-full items-center justify-center shadow-md px-8 flex"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/*       {session && <AuthSessionValidator userId={session?.id!} />} */}

      <div className="items-center justify-between w-full hidden md:flex">
        <div></div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Masters</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {masterComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Mapping</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {mappingComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Payments</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {paymentComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Exams</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {examComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center justify-center space-x-2">
          {session && pendingApprovals > 0 && !loading && (
            <Button variant={"ghost"} className="rounded-full">
              <Link href="/payments">
                <BellDot color="#2563EB" />
              </Link>
            </Button>
          )}

          {loading && <Loader size={15} color="#2563EB" />}

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

          <div className="flex flex-col items-start justify-center h-full mt-12 ml-8">
            <NavBarItemAdmin
              title="Masters"
              itemList={masterComponents}
              callback={() => setCollapsed(!isCollapsed)}
            />

            <NavBarItemAdmin
              title="Mapping"
              itemList={mappingComponents}
              callback={() => setCollapsed(!isCollapsed)}
            />

            <NavBarItemAdmin
              title="Payments"
              itemList={paymentComponents}
              callback={() => setCollapsed(!isCollapsed)}
            />

            <NavBarItemAdmin
              title="Exams"
              itemList={examComponents}
              callback={() => setCollapsed(!isCollapsed)}
            />
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
