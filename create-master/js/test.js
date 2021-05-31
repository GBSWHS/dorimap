// 메뉴 이동
function setMenu(_menu) {
  var filterButtons = document.querySelectorAll("nav li");
  filterButtons.forEach(function (filterButton) {
    filterButton.classList.remove("on");
  });
  document.querySelector("nav li." + _menu).classList.add("on");
  document.querySelector("main").className = _menu;
}

// 사진들 새로 보여주기
function showPhotos () {

  // 현재 화면의 사진들 삭제
  var existingNodes 
    = document.querySelectorAll("#gallery article:not(.hidden)");
  existingNodes.forEach(function (existingNode) {
    existingNode.remove();
  });

  // 갤러리 div 선택
  var gallery = document.querySelector("#gallery");

  photos.forEach(function (photo) {
    var photoNode = document.querySelector("article.hidden").cloneNode(true);
    photoNode.classList.remove("hidden");
    photoNode.querySelector(".author").innerHTML = photo.user_name;
    photoNode.querySelector(".desc").innerHTML = photo.description;
    photoNode.querySelector(".like").innerHTML = photo.likes;
    photoNode.querySelector(".like").addEventListener(
      "click", function () { toggleLike(photo.idx) }
    )
    photoNode.querySelector(".photo").style.backgroundImage 
      = "url('./img/photo/" + photo.file_name + "')";
    if (my_info.like.indexOf(photo.idx) > -1) {
      photoNode.querySelector(".like").classList.add("on");
    }
    gallery.append(photoNode);
  })
}

// 사진의 좋아요 토글
function toggleLike(idx) {
  if (my_info.like.indexOf(idx) === -1) {
    my_info.like.push(idx);
    for (var i = 0; i < photos.length; i++) {
      if (photos[i].idx === idx) {
        photos[i].likes++;
        break;
      }
    }
  } else {
    my_info.like = my_info.like.filter(
      function (it) { return it !== idx; }
    );
    for (var i = 0; i < photos.length; i++) {
      if (photos[i].idx === idx) {
        photos[i].likes--;
        break;
      }
    }
  }
  showPhotos();
}

// 사진올리기의 사진설명 길이 표시
function setDescLength () {
  document.querySelector(".descLength").innerHTML =
   document.querySelector("input.description").value.length + "/20";
}

function updateMyInfo () {
  my_info.introduction = document.querySelector("#ip-intro").value;
  my_info.as = document.querySelector("#myinfo input[type=radio]:checked").value;
  var interests = [];
  document.querySelectorAll("#myinfo input[type=checkbox]:checked").forEach(function (checked) {
    interests.push(checked.value);
  });
  my_info.interest = interests;
  setEditMyInfo(false);
  showMyInfo();
}

function showMyInfo () {
  document.querySelector("#myInfoId").innerHTML = my_info.id;
  document.querySelector("#myInfoUserName").innerHTML = my_info.user_name;
  document.querySelector("#sp-intro").innerHTML = my_info.introduction;
  document.querySelector("#ip-intro").value = my_info.introduction;
  document.querySelector("#myinfo input[type=radio][value=" + my_info.as + "]").checked = true;
  document.querySelectorAll("#myinfo input[type=checkbox]")
    .forEach(function(checkbox) {
    checkbox.checked = false;
  });
  my_info.interest.forEach(function (interest) {
    document.querySelector("#myinfo input[type=checkbox][value=" + interest + "]").checked = true;
  });
}

function setEditMyInfo (on) {
  document.querySelector("#myinfo > div").className = on ? "edit" : "non-edit"
  document.querySelectorAll("#myinfo input").forEach(function (input) {
    input.disabled = !on;
  })
  // 취소했을 때 원상복구하기 위해
  showMyInfo();
}

// 화면이 처음 로드되면 실행되는 함수
function init() {
  showPhotos();
  showMyInfo();
}