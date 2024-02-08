import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface NavBarItemAdminProps {
  title: string;
  itemList: {
    title: string;
    href: string;
    description: string;
  }[];
  callback: () => void;
}

const NavBarItemAdmin = ({
  title,
  itemList,
  callback,
}: NavBarItemAdminProps) => {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="no-underline">{title}</AccordionTrigger>
          <AccordionContent>
            {itemList.map(({ title, href, description }) => {
              return (
                <div key={href} onClick={callback} className="mb-4">
                  <Link href={href}>{title}</Link>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default NavBarItemAdmin;
