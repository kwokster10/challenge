export function isExpired(itemDate) {
  var now = new Date();
  var today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

  return today > new Date(itemDate);
}
