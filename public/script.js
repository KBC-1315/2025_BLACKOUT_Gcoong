// document.querySelectorAll(".scooter-card button").forEach((button) => {
//   button.addEventListener("click", () => {
//     window.location.href = "page2.html";
//   });
// });

var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.484528, 127.029714), // 지도의 중심좌표
    level: 4, // 지도의 확대 레벨
  };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
// 마커를 표시할 위치와 title 객체 배열입니다
if (navigator.geolocation) {
  // GeoLocation을 이용해서 접속 위치를 얻어옵니다
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude, // 위도
      lon = position.coords.longitude; // 경도

    var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
      message = '<div style="padding:5px;">현재 위치</div>'; // 인포윈도우에 표시될 내용입니다

    // 마커와 인포윈도우를 표시합니다
    displayMarker(locPosition, message);
  });
}
function displayMarker(locPosition, message) {
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    map: map,
    position: locPosition,
  });

  var iwContent = message, // 인포윈도우에 표시할 내용
    iwRemoveable = true;

  // 인포윈도우를 생성합니다
  var infowindow = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable,
  });

  // 인포윈도우를 마커위에 표시합니다
  infowindow.open(map, marker);

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
}

// const csvFile = "regionid_560_test_data.csv"; // CSV 파일 경로
const scooterSection = document.getElementById("scooter-section");
// 이미지 URL을 전역 변수로 설정
window.bicycleMarkerImage =
  "https://cdn-icons-png.flaticon.com/512/2223/2223053.png";
window.kickboardMarkerImage =
  "https://cdn-icons-png.flaticon.com/512/5330/5330079.png";
window.kickboardGrayMarkerImage =
  "https://cdn-icons-png.flaticon.com/512/5330/5330082.png"; // 흑백 이미지
window.bicycleGrayMarkerImage =
  "https://cdn-icons-png.flaticon.com/512/2223/2223016.png";

// 지도에 마커 추가
function addMarkers(dataList) {
  let grayScaleCount = 0;

  dataList.forEach((row) => {
    const lat = parseFloat(row.end_lat); // 위도
    const lng = parseFloat(row.end_lng); // 경도
    const modelType = row.model_type; // 모델 타입
    const bicycleId = row.bicycle_id; // 자전거 ID
    // const dataHour = parseInt(row.hour, 10); // 데이터의 hour 필드

    // 이미지 URL 전역 변수에서 가져오기

    let markerImage = null;
    const isGrayScale = Math.random() < 0.15 && grayScaleCount < 100; // 약 15% 확률로 흑백 (100개 제한)

    if (modelType === "bicycle") {
      markerImage = new kakao.maps.MarkerImage(
        isGrayScale
          ? window.bicycleGrayMarkerImage // 흑백 이미지
          : window.bicycleMarkerImage,
        new kakao.maps.Size(35, 35)
      );
    } else if (modelType === "kickboard") {
      markerImage = new kakao.maps.MarkerImage(
        isGrayScale
          ? window.kickboardGrayMarkerImage // 흑백 이미지
          : window.kickboardMarkerImage,
        new kakao.maps.Size(35, 35)
      );
    }
    if (isGrayScale) {
      grayScaleCount++;
    }

    // 마커 생성
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(lat, lng),
      image: markerImage,
    });

    // 마커 클릭 이벤트 등록
    kakao.maps.event.addListener(marker, "click", function () {
      scooterSection.classList.add("visible");
    });
  });
}

document.addEventListener("click", (event) => {
  const scooterSection = document.getElementById("scooter-section");

  // 마커 부분은 'event.target'이 지도 마커 요소인지 확인
  const isMarker = event.target.tagName === "IMG";

  // Scooter Section을 숨길 조건
  if (!scooterSection.contains(event.target) && !isMarker) {
    scooterSection.classList.remove("visible"); // 섹션 숨기기
  }
});

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const scooterSection = document.getElementById("scooter-section");
    const rescueContainer = document.getElementById("rescue-container");

    // `.scooter-section` 숨기기
    scooterSection.style.display = "none";

    // `.container` 보이기
    rescueContainer.style.display = "block";
  });
});

document.querySelector(".back-btn").addEventListener("click", () => {
  document.getElementById("rescue-container").style.display = "none";
  document.getElementById("scooter-section").style.display = "block";
});

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

function updateScooterPrices(dataArray) {
  // 현재 시간 가져오기 (24시간 형식)
  const currentHour = new Date().getHours();

  // `dataArray`에서 현재 시간과 일치하는 데이터를 찾음
  dataArray.forEach((data, index) => {
    // Object keys로부터 시간대만 추출 (예: "06:00", "07:00")
    const timeKey = Object.keys(data).find((key) => {
      const hour = parseInt(key.split(":")[0], 10); // 시간 추출
      return hour === currentHour; // 현재 시간과 비교
    });

    if (timeKey) {
      // 현재 시간에 해당하는 데이터를 가져옴
      const price = data[timeKey].price;

      // 해당 인덱스의 `scooter-card`를 업데이트
      const scooterCard = document.querySelectorAll(".scooter-card")[index];
      if (scooterCard) {
        const priceElement = scooterCard.querySelector("#point");
        if (priceElement) {
          priceElement.textContent = `${price.toFixed(0)} 원`; // 소수점 없는 가격 표시
        }
      }
    }
  });
}
