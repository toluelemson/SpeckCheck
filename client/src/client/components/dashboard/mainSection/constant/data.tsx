import AdviseDataCard from "../../../screens/cards/AdviseDataCard";
import ClassRegistration from "../../../screens/cards/ClassRegistration";
import FeedbackDataCard from "../../../screens/cards/FeedbackForm";
import PersonalDataCard from "../../../screens/cards/PersonalDataCard";
import Group from "../../../svg/Group";
import TableCircle from "../../../svg/TableCircle";
import Tick from "../../../svg/Tick";
import pic from "../../assets/Avatar.png";
import personalFeedbackImg from '../../assets/personalCard.png';
import classRegisImg from '../../assets/classRegistration.png';
import AdviceCardImg from '../../assets/advicedata.png';
import FeedbackCardImg from '../../assets/feedback.png';

export const PROJECTS_DATA = [
  {
    id: "23212327",
    title: "Personal Feedback",
    text: "Create userflow for Hisphonic Application Design",
    percentage: 55,
    progressColor: "bg-blue-700",
    progressCount: "55%",
    bgImg: personalFeedbackImg,
    pic: pic,
    inbox: "2",
    tickCount: "8",
    totalTickCount: "15",
    card: (handleClick: () => void) => <PersonalDataCard handleClick={handleClick} />,
  },
  {
    id: "23199023",
    title: "Class Registration",
    text: "Homepage design for Diphub Application",
    percentage: 30,
    progressColor: "bg-pink-500",
    progressCount: "30%",
    bgImg: classRegisImg,
    pic: pic,
    inbox: "10",
    tickCount: "8",
    totalTickCount: "40",
    card: (handleClick: () => void) => <ClassRegistration handleClick={handleClick} />,
  },
  {
    id: "34209048",
    title: "Advise Data Card",
    text: "Hey friend i strongly need your advise on how ",
    percentage: 89,
    progressColor: "bg-yellow-500",
    progressCount: "89%",
    bgImg: AdviceCardImg,
    pic: pic,
    inbox: "2",
    tickCount: "40",
    totalTickCount: "55",
    card: (handleClick: () => void) => <AdviseDataCard handleClick={handleClick}/>,
  },
  {
    id: "76294009",
    title: "Feedback Form",
    text: "Want to start a new business with just N100K, how can i go how this process",
    percentage: 89,
    progressColor: "bg-yellow-500",
    progressCount: "89%",
    bgImg: FeedbackCardImg,
    pic: pic,
    inbox: "5",
    tickCount: "40",
    totalTickCount: "55",
    card: (handleClick: () => void) => <FeedbackDataCard handleClick={handleClick}/>,
  },
];

export const YAxis = ["100% ", "70%", "50%", "20%", "0%"];

export const XAxis = ["Sum", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const SUMMARY_DATA = [
  { icon: TableCircle, title: "Project", rating: "40", bgColor: "bg-blue-700" },
  { icon: Group, title: "Assigned", rating: "79", bgColor: "bg-blue-400" },
  { icon: Tick, title: "Closed", rating: "89", bgColor: "bg-gray-200" },
];

export const TASK_DATA = [
  {
    text: "Create userflow for Hisphonic Application Design",
    title: "Inbox: 2",
    pic: pic,
  },
  {
    text: "Homepage design for Diphub Application",
    title: "Inbox: 5",
    pic: pic,
  },
];

export const MESSAGE_DATA = [
  {
    image: pic,
    name: "Andreana Viola",
    text: "Hi, how're you doing today?",
    time: "8:15am",
    online: false,
  },
  {
    image: pic,
    name: "Francesco Long",
    text: "Hi @Angel, I hope you are doing well...",
    time: "7:30am",
    online: true,
  },
  {
    image: pic,
    name: "Alexandra Michu",
    text: "Hi, how're you doing today?",
    time: "23/11",
    online: false,
  },
];
