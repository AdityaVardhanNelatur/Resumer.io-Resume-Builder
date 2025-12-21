const ResumeCard = ({ resume, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="font-semibold">
        {resume.title || "Untitled Resume"}
      </h3>

      <p className="text-sm text-gray-500">
        {resume.name || "No name"}
      </p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={onEdit}
          className="text-indigo-600 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ResumeCard; // ✅ REQUIRED
