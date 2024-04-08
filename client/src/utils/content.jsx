import { FaMoneyBills } from "react-icons/fa6";
import {
  MdContactSupport,
  MdElectricMeter,
  MdHistoryToggleOff,
} from "react-icons/md";

export const links = [
  {
    path: "home",
    text: "home",
  },
  {
    path: "meter-management",
    text: "Meter Management",
  },
  {
    path: "billing",
    text: "billing",
    child: [
      {
        path: "billing/generate-bill",
        text: "generate bill",
      },
      {
        path: "billing/bill-pay",
        text: "Bill Pay",
      },
      {
        path: "billing/bill-history",
        text: "View Billing History",
      },
    ],
  },
  {
    path: "support",
    text: "help & support",
  },
];

export const pointers = [
  {
    icon: <MdElectricMeter className="me-5 fs-4" />,
    title: "Meter Management",
    text: "Register a new meter or update your existing meter information.",
  },
  {
    icon: <FaMoneyBills className="me-5 fs-4" />,
    title: "Bill View & Pay",
    text: "View your current bill and pay conveniently through our secure online system.",
  },
  {
    icon: <MdHistoryToggleOff className="me-5 fs-4" />,
    title: "Track History",
    text: "Access and track your past bill payments and consumption history.",
  },
  {
    icon: <MdContactSupport className="me-5 fs-4" />,
    title: "Contact Us",
    text: "Our customer support team is available 24/7 to assist you with any questions.",
  },
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const trivia = [
  { question: "What is the largest living organism on Earth?", answer: "The honey fungus" },
  { question: "What is the capital of Australia?", answer: "Canberra" },
  { question: "What is the chemical symbol for gold?", answer: "Au" },
  { question: "How many hearts does an octopus have?", answer: "Three" },
  { question: "What is the name of the world's driest desert?", answer: "The Atacama Desert" },
  { question: "What is the tallest mountain in the world?", answer: "Mount Everest" },
  { question: "Which planet in our solar system is known as the Red Planet?", answer: "Mars" },
  { question: "What is the largest ocean on Earth?", answer: "The Pacific Ocean" },
  { question: "In which year did World War II begin?", answer: "1939" },
  { question: "What is the currency of Japan?", answer: "Japanese Yen" },
  { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is the largest bone in the human body?", answer: "The femur" },
  { question: "What is the chemical formula for water?", answer: "H2O" },
  { question: "What is the national animal of India?", answer: "The Royal Bengal Tiger" },
  { question: "Which country hosted the 2020 Summer Olympics?", answer: "Japan" },
  { question: "What is the largest freshwater lake by volume?", answer: "Lake Baikal" },
  { question: "What is the name of the world's longest river?", answer: "The Nile River" },
  { question: "What is the capital of Germany?", answer: "Berlin" },
  { question: "What is the smallest country in the world?", answer: "Vatican City" },
  { question: "How many legs does a spider have?", answer: "Eight" },
  { question: "What is the hottest planet in our solar system?", answer: "Venus" },
  { question: "What is the name of the largest moon of Saturn?", answer: "Titan" },
  { question: "What is the main component of the atmosphere on Earth?", answer: "Nitrogen" },
];


export default links;
