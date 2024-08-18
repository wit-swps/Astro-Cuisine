"use client"
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/9dh3NrFmY4n
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import 'dotenv/config'
import { error } from "console";

const fetchData = async () => {
  const res = await fetch(
    `https://rest.fnar.net/storage/wit.iwfa/df508ae96b989f70717935e0b7cff88d`,
    {
      mode: 'cors',
      headers: {
        Accept: "application/json",
        Authorization: `${process.env.TOKEN}`,
        cache: "no-store",
      },
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    return (<div>Refresh Page Should Fix this</div>)
  }

  return res.json();
};

export async function Product() {
  const data = await fetchData();
  //console.log(data);
  const materialIdsToFilter = [
    "9842ad8d9dfdf8e4c2e80117e7b5ebaf",
    "83dd61885cf6879ff49fe1419f068f10",
    "4fca6f5b5e6c3b8a1b887c6dc99db146",
  ];

  const filteredData = data.StorageItems.filter((item: any) =>
    materialIdsToFilter.includes(item.MaterialId)
  );

  //console.log(filteredData);

  let updatedStorageItems = filteredData.map((item: any) => {
    switch (item.MaterialTicker) {
      case "COF":
        item.MaterialValue = 329;
        item.MaterialName = "Caffeinated Infusion";
        item.MaterialDescription =
          "Brewed from stardust beans and dark matter. Energize your voyages and achieve “Warp Speed” with every sip!";
        item.bgcolor = "bg-lonestar-500";
        break;
      case "RAT":
        item.MaterialValue = 90;
        item.MaterialName = "Basic Rations";
        item.MaterialDescription =
          "Your go-to essentials for any mission. Packed with nutrients and cosmic flavor, perfect for everyday space travel.";
        item.bgcolor = "bg-well-read-500";
        break;
      case "DW":
        item.MaterialValue = 39;
        item.MaterialName = "Drinking Water";
        item.MaterialDescription =
          "Filtered through asteroid ice and starshine. Refresh yourself with a sip of the cosmos—may cause spontaneous stargazing.";
        item.bgcolor = "bg-well-read-500";
        break;
    }
    return {
      filteredData,
    };
  });

  return filteredData.map((item: any) => {
    return (
      <div
        key={item.MaterialId}
        className="bg-background rounded-lg shadow-lg overflow-hidden w-full max-w-sm"
      >
        <div className="relative">
          <div
            className={`box-border text-7xl w-full h-[300px] flex text-center items-center justify-center border-0 text-geraldine-500 font-bold ${item.bgcolor}`}
          >
            {item.MaterialTicker}
          </div>
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            {item.MaterialTicker}
          </div>
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold">{item.MaterialName}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="quantity" className="text-sm">
                Quantity:
              </Label>
              <div className="bg-muted rounded-md px-3 py-1 text-sm font-medium">
                {item.MaterialAmount}
              </div>
            </div>
            <div className="text-2xl font-bold">{item.MaterialValue} ICA</div>
          </div>
          <Button size="lg" className="w-full">
            <Link
              href="https://form.jotform.com/242283783241457"
              prefetch={true}
            >
              Place an order
            </Link>
          </Button>
        </div>
      </div>
    );
  });
}
