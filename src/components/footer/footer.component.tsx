import Image from "next/image";
import { LIGHT_LOGO } from "../../../constant";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="py-12 max-w-2xl mx-auto border-t mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-[100px] h-[100px] relative mb-3">
            <Image
              src={LIGHT_LOGO}
              alt="dark_logo"
              className="object-contain"
              fill
            />
          </div>
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Prakash Raz, All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
