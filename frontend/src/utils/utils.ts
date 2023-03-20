export function parseDate(iso?: string) {
  let date = new Date("2013-08-03T02:00:00Z");
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  let dt = date.getDate().toString();

  if (Number(dt) < 10) {
    dt = "0" + dt;
  }
  if (Number(month) < 10) {
    month = "0" + month;
  }

  return month + "-" + dt + "-" + year;
}
