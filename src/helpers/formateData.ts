export interface AlertMessageType {
  type: "success" | "danger" | "warning" | "info";
  title: string;
  message: string;
}

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


export const getAlertType = (
  priorityScore: number
): AlertMessageType["type"] => {
  if (priorityScore >= 90) {
    return "danger";
  }

  if (priorityScore >= 40) {
    return "warning";
  }

  return "info";
};

export const formatAlertMessage = (alert: any): AlertMessageType => {
  const reasons = alert.priorityReasons || [];

  const hasExpiry = reasons.includes("approaching_expiry");
  const hasHighVelocity = reasons.includes("high_velocity");

  const type = getAlertType(alert.priorityScore);

  if (hasExpiry) {
    return {
      type,
      title: "Expiration proche",
      message:
        `Le produit ${alert.SKU} au dépôt ${alert.warehouseName} ` +
        `arrive à expiration dans ${alert.nearestExpiryDate} jours. ` +
        `Stock actuel : ${alert.currentStock} unités. ` +
        `Réapprovisionnement recommandé : ${alert.suggestedRestockUnit} unités.`,
    };
  }

  if (hasHighVelocity) {
    return {
      type,
      title: "Vente rapide",
      message:
        `Le produit ${alert.SKU} au dépôt ${alert.warehouseName} ` +
        `présente une forte vitesse de vente. ` +
        `Stock actuel : ${alert.currentStock} unités. ` +
        `Réapprovisionnement recommandé : ${alert.suggestedRestockUnit} unités.`,
    };
  }

  if (alert.currentStock === 0) {
    return {
      type,
      title: "Stock épuisé",
      message:
        `Le produit ${alert.SKU} est épuisé au dépôt ${alert.warehouseName}. ` +
        `Un réapprovisionnement de ${alert.suggestedRestockUnit} unités est recommandé.`,
    };
  }

  return {
    type,
    title: "Alerte stock",
    message:
      `Le produit ${alert.SKU} au dépôt ${alert.warehouseName} ` +
      `nécessite une attention particulière. ` +
      `Stock actuel : ${alert.currentStock} unités.`,
  };
};