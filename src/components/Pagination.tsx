import Link from "next/link";
import { useMemo } from "react";

type PaginationProps<T> = {
  baseUrl: string;
  queryParams?: string;
  list: PaginatedListResponse<T>;
};

export default function Pagination({
  baseUrl,
  queryParams = "",
  list,
}: PaginationProps<any>) {
  const totalPages = Math.ceil(list.count / list.limit) || 0;
  const page = Math.floor(list.offset / list.limit) || 0;

  if (!totalPages) return null;

  const _getPageUrl = (page: number) => {
    const _page = page < 0 ? 0 : page > totalPages - 1 ? totalPages - 1 : page;
    return `${baseUrl}/?offset=${_page * list.limit}&limit=${
      list.limit
    }&${queryParams}`;
  };

  const pages = useMemo(() => {
    const _pages: Page[] = [];
    for (let i = 0; i <= totalPages - 1; i++) {
      _pages.push({
        label: (i + 1).toString(),
        href: _getPageUrl(i),
        disabled: i === page,
      });
    }
    return _pages;
  }, [totalPages, page]);

  const pageClasses =
    "w-10 h-10 flex items-center justify-center rounded-4 bg-gray-100 p-4";

  return (
    <div className="flex gap-2 my-4">
      <Link href={_getPageUrl(page - 1)}>
        <div className={`${pageClasses}`}>{"<"}</div>
      </Link>
      {pages.map((p, index) => (
        <Link href={p.href} key={index}>
          <div
            className={`${pageClasses} ${
              index === page ? "text-blue-500 font-bold" : ""
            }`}
          >
            {p.label}
          </div>
        </Link>
      ))}
      <Link href={_getPageUrl(page + 1)}>
        <div className={`${pageClasses}`}>{">"}</div>
      </Link>
    </div>
  );
}
