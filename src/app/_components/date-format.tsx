import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return <time className="font-semibold" dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
};

const DateChart = (timestamp:string ) => {
  const date = new Date(timestamp);

  const arr:string[] = []
  const formattedDate = date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long', // 'numeric', '2-digit', 'short', 'long'
    year: 'numeric',
  });
  arr.push(formattedDate);
  return arr;
};

export { DateFormatter, DateChart };