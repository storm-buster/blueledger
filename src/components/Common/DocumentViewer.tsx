// simple document viewer used by multiple review pages

export default function DocumentViewer({ title, content, open, onClose }: { title: string; content: string; open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[85vh] overflow-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">×</button>
        </div>
        <div className="p-6">
          <pre className="whitespace-pre-wrap text-sm text-gray-800">{content}</pre>
        </div>
      </div>
    </div>
  );
}
