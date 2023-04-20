export type FilterValue = "all" | "done" | "active";
interface TodoItemsFilterProps {
  activeFilter: FilterValue;
  onChange: (filterValue: FilterValue) => void;
  search: string;
  setSearch: (searchString: string) => void;
}

export const TodoItemsFilter = ({
  activeFilter,
  onChange,
  search,
  setSearch,
}: TodoItemsFilterProps) => {
  return (
    <div className="py-3">
      Filter:
      <button
        type="button"
        className="btn btn-xs btn-primary mx-1"
        disabled={activeFilter === "all"}
        onClick={() => onChange("all")}
      >
        All
      </button>
      <button
        type="button"
        className="btn btn-xs btn-error mx-1"
        disabled={activeFilter === "active"}
        onClick={() => onChange("active")}
      >
        Active
      </button>
      <button
        type="button"
        className="btn btn-xs btn-success mx-1"
        disabled={activeFilter === "done"}
        onClick={() => onChange("done")}
      >
        Done
      </button>
      <input
        type="text"
        placeholder="Search by name or content"
        className="input input-sm input-bordered w-full max-w-xs mx-1 text-black"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
};
