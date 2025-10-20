export const CheckCompleted = (item) => {
  if (item.isCompleted) return { text: "Hoàn thành", color: "green" };
  if (new Date(item.dueDate) < new Date())
    return { text: "Quá hạn", color: "red" };
  return { text: "Đang thực hiện", color: "orange" };
};

export const getPriorityLabel = (priority) => {
  switch (priority) {
    case 1:
      return { label: "Thấp", color: "blue" };
    case 2:
      return { label: "Trung bình", color: "gold" };
    case 3:
      return { label: "Cao", color: "red" };
    default:
      return { label: "Không xác định", color: "default" };
  }
};
