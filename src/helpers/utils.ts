const isValidDate = (dateString: unknown): dateString is string => {
  if (typeof dateString !== "string") return false;
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!regEx.test(dateString)) return false;
  const date = new Date(`${dateString}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return false;
  return date.toISOString().slice(0, 10) === dateString;
};

export const getSearch = (filters: any) => {
  const search: Record<string, string> = {};
  if (!filters) return search;
  const created = {
    start: null as string | null,
    end: null as string | null,
  };

  for (const prop in filters) {
    let value = filters[prop];
    if (value == null || value === "") {
      continue;
    }
    if (value?.__v_isRef) {
      value = value.value;
    }
    if (prop === "start_date" || prop === "end_date") {
      if (isValidDate(value)) {
        if (prop === "start_date") {
          created.start = value;
        }
        if (prop === "end_date") {
          created.end = value;
        }
      }
      continue;
    }
    if (
      typeof value === "object" &&
      value !== null &&
      "value" in value
    ) {
      value = value.value;
    }
    if (value == null || value === "") {
      continue;
    }
    if (typeof value === "object") {
      continue;
    }
    search[prop] = String(value);
  }
  if (created.start || created.end) {
    search.created = JSON.stringify(created);
  }
  return search;
};