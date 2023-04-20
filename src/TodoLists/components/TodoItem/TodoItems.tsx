import { TodoItem } from "../../../types/todoListTypes";
import { RemoveButton } from "../../../common/buttons/RemoveButton";

interface TodoItemsProps {
  todoItems: TodoItem[];
  onCheck: (itemId: number, checked: boolean) => void;
  removeItem: (itemId: number) => void;
}

export const TodoItems = ({
  todoItems,
  onCheck,
  removeItem,
}: TodoItemsProps) => {
  const generateDate = (dateString: string) => {
    return (
      new Date(dateString).toDateString() +
      " " +
      new Date(dateString).toLocaleTimeString()
    );
  };

  return todoItems.length > 0 ? (
    <table className="table w-full">
      <thead>
        <tr>
          <th>Done</th>
          <th>Name</th>
          <th>Deadline</th>
          <th>Content</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todoItems.map((item: TodoItem) => {
          return (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={item.done}
                  className="checkbox checkbox-primary"
                  onChange={(event) => onCheck(item.id, event.target.checked)}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.deadline && generateDate(item.deadline)}</td>
              <td>{item.content}</td>
              <td>
                <RemoveButton onRemove={() => removeItem(item.id)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <p>No items to display!</p>
  );
};
