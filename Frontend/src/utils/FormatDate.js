import dayjs from 'dayjs'
export default function formatDate(isoDateString) {
  return dayjs(isoDateString).format('HH:mm DD-MM-YYYY');
}