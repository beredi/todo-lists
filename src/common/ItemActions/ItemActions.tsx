interface ItemActionsProps {
  desc: boolean;
  handleAddNew: () => void;
  handleOrder: () => void;
}
export const ItemActions = ({
  desc,
  handleAddNew,
  handleOrder,
}: ItemActionsProps) => {
  const orderButton = () => {
    return (
      <span className="flex flex-row items-center">
        {desc ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        )}
        {desc ? "oldest" : "newest"}
      </span>
    );
  };
  return (
    <div className="flex flex-row items-center my-3">
      <button
        className="btn btn-xs btn-outline btn-success mx-1"
        onClick={handleAddNew}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add new
      </button>
      <button
        className="btn btn-xs btn-outline btn-primary mx-1"
        onClick={handleOrder}
      >
        {orderButton()}
      </button>
    </div>
  );
};
