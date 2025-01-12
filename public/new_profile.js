document.addEventListener("DOMContentLoaded", fetchData);
function updateUserprofile(userList) {
  userList.forEach((row) => {
    const level = parseFloat(row.level); //레벨
    const name = row.name; //이름
    const points = parseFloat(row.points); //포인트
    const profile = row.profile; //프로필 한줄 소개

    const temp_points = document.getElementById("points");
    const temp_name = document.getElementById("name");
    const temp_level = document.getElementById("level");
    const temp_profile = document.getElementById("profile");
    const progressBar = document.getElementById("progress-bar");
    console.log(progressBar);

    if (temp_points) temp_points.textContent = `${points}p`;
    if (temp_name) temp_name.textContent = name;
    if (temp_level) temp_level.textContent = `Lv.${level}`;
    if (temp_profile) temp_profile.textContent = profile;
    if (progressBar) {
      const progressPercentage = Math.min((points / 1000) * 100, 100); // 1000p 기준 계산
      progressBar.style.width = `${progressPercentage}%`;
    } else {
      console.error("progressBar element not found!");
    }

    console.log(`Updated: ${name}, ${level}, ${points}, ${profile}`);
  });
}
