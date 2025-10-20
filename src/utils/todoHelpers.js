export const CheckCompleted = (item) => {
  if (!item) return { text: "Đang tải...", color: "#9e9e9e" };
  if (item.isCompleted) return { text: "Hoàn thành", color: "#4caf50" };
  if (new Date(item.dueDate) < new Date())
    return { text: "Quá hạn", color: "#f44336" };
  return { text: "Đang thực hiện", color: "#ff9800" };
};

export const getPriorityLabel = (priority) => {
  switch (priority) {
    case 1:
      return { label: "Thấp", color: "#90caf9" };
    case 2:
      return { label: "Trung bình", color: "#fdd835" };
    case 3:
      return { label: "Cao", color: "#f44336" };
    default:
      return { label: "Không xác định", color: "#9e9e9e" };
  }
};
