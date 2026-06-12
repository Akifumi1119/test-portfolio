export const recordTypeLabel = (recordType: string) => {
  const labels: Record<string, string> = {
    meal: "食事",
    walk: "散歩",
    weight: "体重",
    hospital: "病院",
    other: "その他",
  };

  return labels[recordType] ?? recordType;
};
