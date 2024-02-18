import Link from "next/link";
import type { FC } from "react";
import { Fragment } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { buttonVariants } from "~/components/ui/button";
import type { RouterOutputs } from "~/utils/api";

type DocumentGroup = RouterOutputs["document"]["getAllSortedByGroup"][0];
type Document = DocumentGroup["Document"][0];

const DocumentsAccordionItem: FC<{
  documents: Document[];
  extraText: DocumentGroup["extraText"];
  name: DocumentGroup["name"];
}> = ({ name, documents, extraText }) => {
  return (
    <AccordionItem value={name}>
      <AccordionTrigger className="uppercase">{name}</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-2">
          {documents.map(({ isPDF, title, url }, idx) => (
            <Fragment key={url}>
              <div className="flex flex-row items-center justify-between px-2">
                <p>{title}</p>
                <div className="flex flex-row items-center justify-center gap-2">
                  {isPDF && (
                    <>
                      <a
                        className={buttonVariants({
                          variant: "link",
                          size: "sm",
                          className: "text-xs font-light",
                        })}
                        href={url}
                        download
                      >
                        Ladda ner
                      </a>
                      <p> | </p>
                    </>
                  )}
                  <Link
                    className={buttonVariants({
                      variant: "link",
                      size: "sm",
                      className: "text-xs font-light",
                    })}
                    href={
                      isPDF ? `https://docs.google.com/viewer?url=${url}` : url
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Öppna
                  </Link>
                </div>
              </div>
              {!(idx === documents.length - 1 && !extraText) && (
                <div className="border-b border-black" />
              )}
            </Fragment>
          ))}
          {extraText && (
            <div className="mt-2 flex flex-row items-center justify-between px-2 text-xs">
              <p>{extraText}</p>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default DocumentsAccordionItem;
