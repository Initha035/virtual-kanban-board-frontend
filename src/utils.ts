import moment from "moment";

export const parseDate = (s: string) => moment(s).fromNow();

export const types = [
  { text: "Task", icon: "/assets/task.svg", value: 0 },
  { text: "Bug", icon: "/assets/bug.svg", value: 1 },
  { text: "Review", icon: "/assets/review.svg", value: 2 },
];

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
