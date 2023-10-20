import { IMonthlyStats } from "../types";

type Stats = {
  month: string;
  nominal: number;
  year: number;
};

const parseStats = (data: Stats[]): IMonthlyStats => {
  let result: any = {};
  let months = data.map((d) => d.month);
  months = [...new Set(months)];

  months.forEach((month) => {
    const values = data.filter((d) => d.month === month);
    result[month] = values.map((val) => val.nominal);
    result[month] = result[month].reduce((a: number, b: number) => a + b);
  });

  const values = Object.values(result) as number[];

  return { months, values };
};

export default parseStats;
