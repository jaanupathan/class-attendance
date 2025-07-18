const rollNumbers = [
  "23N31A0466", "23N31A0467", "23N31A0468", "23N31A0470", "23N31A0471", "23N31A0472",
  "23N31A0473", "23N31A0474", "23N31A0476", "23N31A0477", "23N31A0478", "23N31A0479",
  "23N31A0481", "23N31A0482", "23N31A0483", "23N31A0484", "23N31A0485", "23N31A0486",
  "23N31A0487", "23N31A0488", "23N31A0489", "23N31A0492", "23N31A0493", "23N31A0494",
  "23N31A0495", "23N31A0496", "23N31A0497", "23N31A0498", "23N31A0499", "23N31A04A1",
  "23N31A04A2", "23N31A04A3", "23N31A04A4", "23N31A04A5", "23N31A04A6", "23N31A04A7",
  "23N31A04A8", "23N31A04A9", "23N31A04B0", "23N31A04B1", "23N31A04B2", "23N31A04B3",
  "23N31A04B4", "23N31A04B5", "23N31A04B7", "23N31A04B8", "23N31A04B9", "23N31A04C0",
  "23N31A04C1", "23N31A04C2", "23N31A04C3", "23N31A04C4", "23N31A04C6", "23N31A04C7",
  "24N35A0401", "24N35A0402", "24N35A0403", "24N35A0404", "24N35A0405", "24N35A0406",
  "24N35A0407", "24N35A0408", "24N35A0409", "24N35A0411", "24N35A0412", "24N35A0413"
];

const girlSuffixes = [
  "472", "478", "479", "481", "493", "494", "495", "496", "498",
  "4A6", "4A7", "4B1", "4B2", "4B3", "4B8", "4B9",
  "4C4", "4C6", "406", "408", "412", "413"
];

const normalizedGirlSuffixes = girlSuffixes.map(s => s.toUpperCase());
const totalStudents = rollNumbers.length;

const container = document.getElementById("attendance-container");

rollNumbers.forEach((roll, index) => {
  const suffix = roll.slice(-3).toUpperCase();
  const isGirl = normalizedGirlSuffixes.includes(suffix);
  const gender = isGirl ? "girl" : "boy";

  const div = document.createElement("div");
  div.classList.add("student", gender);

  div.innerHTML = `
    <strong>${roll.toUpperCase()}</strong><br>
    <label><input type="checkbox" class="present" data-gender="${gender}" onchange="updateCount()"> Present</label>
  `;

  container.appendChild(div);
});

function updateCount() {
  const checkboxes = document.querySelectorAll(".present");

  let total = 0;
  let boys = 0;
  let girls = 0;
  let absentRolls = [];

  checkboxes.forEach((cb, index) => {
    if (cb.checked) {
      total++;
      const gender = cb.dataset.gender;
      if (gender === "boy") boys++;
      if (gender === "girl") girls++;
    } else {
      absentRolls.push(rollNumbers[index].toUpperCase());
    }
  });

  document.getElementById("totalPresent").innerText = total;
  document.getElementById("boysPresent").innerText = boys;
  document.getElementById("girlsPresent").innerText = girls;
  document.getElementById("absentCount").innerText = totalStudents - total;

  const absentUl = document.getElementById("absentRolls");
  absentUl.innerHTML = "";
  absentRolls.forEach(roll => {
    const li = document.createElement("li");
    li.textContent = roll;
    absentUl.appendChild(li);
  });
}

function exportToText() {
  const absentRolls = Array.from(document.querySelectorAll("#absentRolls li")).map(li => li.textContent);

  let lines = [];
  lines.push("Attendance Summary:");
  lines.push("-------------------");
  lines.push(`Total Present: ${document.getElementById("totalPresent").innerText}`);
  lines.push(`Boys Present: ${document.getElementById("boysPresent").innerText}`);
  lines.push(`Girls Present: ${document.getElementById("girlsPresent").innerText}`);
  lines.push(`Absent: ${document.getElementById("absentCount").innerText}`);
  lines.push("\nAbsent Roll Numbers:");
  absentRolls.forEach(roll => lines.push(roll));

  const text = lines.join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "attendance-summary.txt";
  a.click();
}
