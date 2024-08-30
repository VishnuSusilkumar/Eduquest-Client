export const styles = {
  title: " text-black dark:text-white font-[500] font-Poppins text-center py-2",
  label: "text-[16px] font-Poppins text-black dark:text-white",
  input:
    "w-full text-black dark:text-white bg-transparent border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins ",
  button:
    "flex flex-row justify-center py-3 px-6 rounded cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold ",
};

export const subjects = [
  "Accounting",
  "Art",
  "Business",
  "Computer Science",
  "Economics",
  "Foreign Language",
  "Geography",
  "Graphic Design",
  "Health",
  "History",
  "Language Arts",
  "Mathematics",
  "Music",
  "Physical Education",
  "Programming",
  "Psychology",
  "Science",
  "Social Studies",
  "Sociology",
  "Web Development",
];

const currentYear = new Date().getFullYear();
const startYear = currentYear - 40;
const endYear = currentYear + 1;

export const years = Array.from(
  { length: endYear - startYear },
  (_, index) => startYear + index
);