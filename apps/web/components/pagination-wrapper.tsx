

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const PaginationWrapper = ({
  page,
  setPage,
  totalItems,
  limit,
}: any) => (
  <div className="flex justify-center mt-6">
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
            aria-disabled={page === 1}
            onClick={() => setPage(page - 1)}
          />
        </PaginationItem>
        {Array.from({ length: Math.ceil(totalItems / limit) }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              isActive={page === index + 1}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            className={
              page === Math.ceil(totalItems / limit)
                ? "pointer-events-none opacity-50"
                : ""
            }
            aria-disabled={page === Math.ceil(totalItems / limit)}
            onClick={() => setPage(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
);