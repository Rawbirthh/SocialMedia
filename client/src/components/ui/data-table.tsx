import { useState, useMemo } from 'react';
import { Input } from './input';
import { Button } from './button';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  pageSize?: number;
  actions?: (item: T) => React.ReactNode;
}

export default function DataTable<T extends { id: number }>({
  data,
  columns,
  loading = false,
  searchPlaceholder = 'Search...',
  searchKeys = [],
  pageSize = 10,
  actions,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const query = search.toLowerCase();
    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        return value !== null && value !== undefined && String(value).toLowerCase().includes(query);
      })
    );
  }, [data, search, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8">
        <p className="text-center text-zinc-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50">
      {/* Search */}
      <div className="border-b border-zinc-800 p-3">
        <Input
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-800">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-medium text-zinc-400">
                  {col.header}
                </th>
              ))}
              {actions && <th className="px-4 py-3 font-medium text-zinc-400 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-4 py-8 text-center text-zinc-500"
                >
                  No results found.
                </td>
              </tr>
            ) : (
              paginated.map((item) => (
                <tr key={item.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-zinc-300">
                      {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 text-right">
                      {actions(item)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-3">
          <p className="text-xs text-zinc-500">
            Showing {((safeCurrentPage - 1) * pageSize) + 1}–{Math.min(safeCurrentPage * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="xs"
              disabled={safeCurrentPage <= 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Prev
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (totalPages <= 5) return true;
                if (page === 1 || page === totalPages) return true;
                if (Math.abs(page - safeCurrentPage) <= 1) return true;
                return false;
              })
              .reduce<(number | 'ellipsis')[]>((acc, page, idx, arr) => {
                if (idx > 0 && page - (arr[idx - 1] as number) > 1) {
                  acc.push('ellipsis');
                }
                acc.push(page);
                return acc;
              }, [])
              .map((item, idx) =>
                item === 'ellipsis' ? (
                  <span key={`e-${idx}`} className="px-2 py-1 text-xs text-zinc-500">...</span>
                ) : (
                  <Button
                    key={item}
                    variant={item === safeCurrentPage ? 'default' : 'outline'}
                    size="xs"
                    onClick={() => setCurrentPage(item)}
                    className={
                      item === safeCurrentPage
                        ? 'bg-white text-zinc-900'
                        : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                    }
                  >
                    {item}
                  </Button>
                )
              )}
            <Button
              variant="outline"
              size="xs"
              disabled={safeCurrentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
