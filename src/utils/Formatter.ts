import moment from "moment";

class Formatter {
  splitDate(date: Date | string) {
    let month: string = "";
    let day: number = 0;
    let year: number = 0;

    if (typeof date === "string") {
      date = new Date(date);
    }

    month = moment().locale("id").month(date.getMonth()).format("MMMM");
    day = date.getDate();
    year = date.getFullYear();

    return { day, month, year };
  }

  formatDate(date: Date): string {
    const formattedDate = new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
    }).format(date);

    return formattedDate;
  }
}

export default new Formatter();
