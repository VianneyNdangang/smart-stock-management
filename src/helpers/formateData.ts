export const formatStatus = (
  status: string,
  t: (key: string) => string
) => {
  let text = "success";
  let color = "success";

  switch (status) {
    case "pending":
      text = t("sales.columns.status.pending");
      color = "warning";
      break;

    case "completed":
      text = t("sales.columns.status.completed");
      color = "success";
      break;

    case "cancelled":
      text = t("sales.columns.status.cancelled");
      color = "danger";
      break;
  }

  return { text, color };
};