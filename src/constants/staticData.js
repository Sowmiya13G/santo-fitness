import Img1 from "../assets/images/onboarding-image1.svg";
import Img2 from "../assets/images/onboarding-image2.svg";
import Img3 from "../assets/images/onboarding-image3.svg";
import Img4 from "../assets/images/onboarding-image4.svg";

export const onboardingContent = [
  {
    image: Img1,
    title: "Track Your Goal",
    content:
      "Don't worry if you have trouble determining your goals. We can help you determine and track them.",
  },
  {
    image: Img2,
    title: "Get Burn",
    content:
      "Let’s keep burning to achieve your goals. It hurts temporarily, but giving up hurts forever.",
  },
  {
    image: Img3,
    title: "Eat Well",
    content:
      "Start a healthy lifestyle with us. We help you plan your daily diet. Eating healthy is fun!",
  },
  {
    image: Img4,
    title: "Improve Sleep Quality",
    content:
      "Improve your sleep quality with us. Good sleep brings a great mood every morning.",
  },
];

export const basicFields = [
  { name: "clientName", label: "Name", placeholder: "Enter client name" },
  {
    name: "userId",
    label: "User ID",
    placeholder: "Enter user ID",
  },
  { name: "age", label: "Age", placeholder: "Enter age", type: "number" },
  {
    name: "height",
    label: "Height",
    placeholder: "Enter height",
    type: "number",
    text: "CM",
  },
  {
    name: "weight",
    label: "Weight",
    placeholder: "Enter weight",
    type: "number",
    text: "KG",
  },
  {
    name: "bodyAge",
    label: "Body Age",
    placeholder: "Enter body age",
    type: "number",
  },
  { name: "bmi", label: "BMI", placeholder: "Enter BMI", type: "number" },
];

export const fatFields = [
  { name: "fat", label: "Fat" },
  { name: "v.fat", label: "V.Fat" },
  { name: "s.fat", label: "S.Fat" },
  { name: "kcal", label: "Kcal" },
];

export const sectionedFields = [
  {
    title: "Full body",
    fields: [
      { name: "fullbody.s.fat", label: "S.Fat" },
      { name: "fullbody.muscle", label: "Muscle" },
    ],
  },
  {
    title: "Arms",
    fields: [
      { name: "arms.s.fat", label: "S.Fat" },
      { name: "arms.muscle", label: "Muscle" },
    ],
  },
  {
    title: "Trunck",
    fields: [
      { name: "trunck.s.fat", label: "S.Fat" },
      { name: "trunck.muscle", label: "Muscle" },
    ],
  },
  {
    title: "Legs",
    fields: [
      { name: "legs.s.fat", label: "S.Fat" },
      { name: "legs.muscle", label: "Muscle" },
    ],
  },
];
