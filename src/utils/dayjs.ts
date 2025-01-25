import dayjs from "dayjs";
import "dayjs/locale/sv";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.locale("sv");
dayjs.extend(relativeTime);
dayjs.extend(utc);

export { dayjs };
