export default function COMMENTS() {
  const date = new Date().toLocaleString();

  const array = [
    {
      id: "45k6-j54k-4jth",
      text: "LoremLoremLoremLoremLoremLorem",
      date: date,
      own: true,
    },
    {
      id: "4116-jfk5-43rh",
      text: "RandomRandomRandomRandomRandomRandomRandomRandomRandomRandomRandomRandom",
      date: date,
      own: false,
    },
  ];

  return array;
}
