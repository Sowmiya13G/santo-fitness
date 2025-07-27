import Activity from "../assets/icons/activity-icon.svg";
import AddNew from "../assets/icons/addNew.svg";
import Profile from "../assets/icons/profile.svg";
import Report from "../assets/icons/report.svg";
import Notes from "../assets/icons/workout-notes.svg";
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

export const adminAccountItems = [
  {
    title: "Client Data",
    icon: Profile,
    toPath: "/profile/personal-data",
  },
  {
    title: "Add New Client",
    icon: AddNew,
    toPath: "/profile/add-new-person",
  },
  {
    title: "Client Reports",
    icon: Report,
    toPath: "/profile/testing-reports",
  },
  {
    title: "Activity History",
    icon: Activity,
    toPath: "/profile/activity-history",
  },
];

export const clientAccountItems = [
  {
    title: "Personal Data",
    icon: Profile,
    toPath: "/profile/personal-data",
  },
  {
    title: "Testing Reports",
    icon: Report,
    toPath: "/profile/testing-reports",
  },
  {
    title: "Activity History",
    icon: Activity,
    toPath: "/profile/activity-history",
  },
  {
    title: "Workout Notes",
    icon: Notes,
    toPath: "/profile/workout-notes",
  },
];

export const trainerAccountItems = [
  {
    title: "Client   Data",
    icon: Profile,
    toPath: "/profile/personal-data",
  },
  {
    title: "Testing Reports",
    icon: Report,
    toPath: "/profile/testing-reports-trainer",
  },
  {
    title: "Activity History",
    icon: Activity,
    toPath: "/profile/activity-history",
  },
  {
    title: "Workout Notes",
    icon: Notes,
    toPath: "/profile/workout-notes-trainer",
  },
];

export const basicFields = [
  { name: "name", label: "Name", placeholder: "Enter client name" },
  {
    name: "sfcId",
    label: "User ID",
    placeholder: "Enter user ID",
  },
  { name: "email", label: "Email", placeholder: "Enter email" },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter Phone Number",
    type: "number",
    maxLength: 10,
  },
  { name: "age", label: "Age", placeholder: "Enter age" },
  {
    name: "height",
    label: "Height",
    placeholder: "Enter height",
    text: "CM",
  },
  {
    name: "weight",
    label: "Weight",
    placeholder: "Enter weight",
    text: "KG",
  },
  { name: "goal", label: "Target Goal", placeholder: "Enter Goal" },
  {
    name: "targetCalories",
    label: "Target Calories",
    placeholder: "Enter Target Calories",
    text: "Kcal",
  },
  {
    name: "targetProtein",
    label: "Target Protein",
    placeholder: "Enter Target Protein",
    text: "gram",
  },
  {
    name: "targetCarbs",
    label: "Target Carbs",
    placeholder: "Enter Target Carbs",
    text: "gram",
  },
  {
    name: "targetFat",
    label: "Target Fat",
    placeholder: "Enter Target Fat",
    text: "gram",
  },
  { name: "bmi", label: "BMI", placeholder: "Enter BMI" },
  { name: "bmr", label: "BMR", placeholder: "Enter BMR" },
];

export const fatFields = [
  [
    { name: "fat", label: "Fat" },
    { name: "VFat", label: "V.Fat" },
  ],
  [
    { name: "SFat", label: "S.Fat" },
    { name: "kCal", label: "KCal" },
  ],
];

export const sectionedFields = [
  {
    title: "Full body",
    fields: [
      { name: "fullBodySFat", label: "S.Fat", value: 0 },
      { name: "fullBodyMuscle", label: "Muscle" },
    ],
  },
  {
    title: "Arms",
    fields: [
      { name: "armSFat", label: "S.Fat", value: 0 },
      { name: "armsMuscle", label: "Muscle" },
    ],
  },
  {
    title: "Trunck",
    fields: [
      { name: "trunkSFat", label: "S.Fat", value: 0 },
      { name: "trunkMuscle", label: "Muscle" },
    ],
  },
  {
    title: "Legs",
    fields: [
      { name: "legsSFat", label: "S.Fat", value: 0 },
      { name: "legsMuscle", label: "Muscle" },
    ],
  },
];

export const subscriptionPlanData = [
  { label: "3 Months", value: "3" },
  { label: "4 Months", value: "4" },
  { label: "6 Months", value: "6" },
  { label: "12 Months", value: "12" },
  { label: "15 Months", value: "15" },
];

export const workoutClassData = [
  { label: "Chest", value: "chest" },
  { label: "Shoulder", value: "shoulder" },
  { label: "Biceps", value: "biceps" },
  { label: "Triceps", value: "triceps" },
  { label: "Lats", value: "lats" },
  { label: "Leg", value: "leg" },
  { label: "Full Body", value: "full_body" },
  { label: "Cardio", value: "cardio" },
  { label: "CrossFit", value: "crossfit" },
  { label: "HIIT", value: "Hiit" },
];

export const mealsData = [{ type: "" }];
