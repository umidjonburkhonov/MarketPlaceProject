export default function Pagination({ page, total, limit, onChange }) {
    const totalPages = Math.max(1, Math.ceil(total / limit))
    return (
        <div className="flex items-center justify-center gap-2 mt-4">
            <button disabled={page <= 1} onClick={() => onChange(page - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
            <span className="text-sm">Page {page} / {totalPages}</span>
            <button disabled={page >= totalPages} onClick={() => onChange(page + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
    )
}
