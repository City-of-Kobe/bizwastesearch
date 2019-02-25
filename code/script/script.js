$(function() {
  var url = location.href;
  url = url.match(".+/(.+?)([?#;].*)?$")[1];
  //idの確認:idがパラメータになかった場合は、新たに付番しリロード（割振ルール：16桁（現在日時+時刻+ランダム数値2桁））
  //        idがあっても、最終閲覧日時が取得できないor最終閲覧日時から30分以上経過していた場合は再度付番しリロード
  var id = myGetQuery("id");
  var lasttime = myGetQuery("lasttime"); //最終閲覧日時
  var thistime = getTime_str(); //現在日時
  var url_Key = myGetQuery("key");
  var no = myGetQuery("no");
  var suf = myGetQuery("suffix");
  var page = myGetQuery("page");
  var gyoshu = myGetQuery("gyoshu");
  if (id === null) {
    id = thistime + Math.floor(Math.random() * 100) + "00000000"; //Math.floorだけではid末尾が0になると省略される:想定される最大数8桁の'0'(10:00:00+'00')を加えたあと16字に戻す
    id = id.slice(0, 16);
    reload(url, id, thistime, url_Key, no, suf, page, gyoshu);
  } else if (lasttime === null) {
    id = thistime + Math.floor(Math.random() * 100) + "00000000"; //Math.floorだけではid末尾が0になると省略される:想定される最大数8桁の'0'(10:00:00+'00')を加えたあと16字に戻す
    id = id.slice(0, 16);
    reload(url, id, thistime, url_Key, no, suf, page, gyoshu);
  } else if (thistime - lasttime > 3000) {
    id = thistime + Math.floor(Math.random() * 100) + "00000000"; //Math.floorだけではid末尾が0になると省略される:想定される最大数8桁の'0'(10:00:00+'00')を加えたあと16字に戻す
    id = id.slice(0, 16);
    reload(url, id, thistime, url_Key, no, suf, page, gyoshu);
  }
  //localStorageチェック：現在のページに関わらずチェックする→取得できなければ現在のIDを書込み
  var ls = variable("ls");
  var user = localStorage.getItem(ls);
  if (user === null) {
    localStorage.setItem(ls, id);
  }
  var now = new Date();
  var m = now.getMonth() + 1;
  var d = now.getDate();
  var aug = aug_hantei(); //8月判定用
  //navbarデザイン
  //4/1〜4/7  桜
  if (m === 4 && d < 8) {
    $(".navbar-brand").addClass("navbarimg4");
  }
  //4/28〜5/5  端午の節句
  else if (m === 4 && d > 27) {
    $(".navbar-brand").addClass("navbarimg5");
  } else if (m === 5 && d < 6) {
    $(".navbar-brand").addClass("navbarimg5");
  }
  //6/10〜6/16  梅雨
  else if (m === 6 && d > 9 && d < 17) {
    $(".navbar-brand").addClass("navbarimg6");
  }
  //7/1〜7/7  七夕
  else if (m === 7 && d < 8) {
    $(".navbar-brand").addClass("navbarimg7");
  }
  //8月第一土曜日までの一週間  花火/夏祭り
  else if (aug === true) {
    $(".navbar-brand").addClass("navbarimg8");
  }
  //9/9～15  月見
  else if (m === 9 && d > 8 && d < 16) {
    $(".navbar-brand").addClass("navbarimg9");
  }
  //10/25～31  ハロウィン
  else if (m === 10 && d > 24) {
    $(".navbar-brand").addClass("navbarimg10");
  }
  //11/15～23  紅葉
  else if (m === 11 && d > 14 && d < 24) {
    $(".navbar-brand").addClass("navbarimg11");
  }
  //12/19～25  クリスマス
  else if (m === 12 && d > 18 && d < 26) {
    $(".navbar-brand").addClass("navbarimg12");
  }
  //1/1～7     正月
  else if (m === 1 && d < 8) {
    $(".navbar-brand").addClass("navbarimg1");
  }
  //1/28～2/3  節分
  else if (m === 1 && d > 27) {
    $(".navbar-brand").addClass("navbarimg2");
  } else if (m === 2 && d < 4) {
    $(".navbar-brand").addClass("navbarimg2");
  }
  //2/25～3/3  雛祭
  else if (m === 2 && d > 24) {
    $(".navbar-brand").addClass("navbarimg3");
  } else if (m === 3 && d < 4) {
    $(".navbar-brand").addClass("navbarimg3");
  }
  //上記以外の期間
  else {
    $(".navbar-brand").addClass("navbarimg");
  }
  //index.htmlデザイン
  if (url === "index.html") {
    //4/1〜4/7  桜
    if (m === 4 && d < 8) {
      $("#menubut1").append(
        '<a href="#"><img src="img/img-menubut1_4.png" alt="キーワードでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut2").append(
        '<a href="#"><img src="img/img-menubut2_4.png" alt="リストでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut3").append(
        '<a href="#"><img src="img/img-menubut3_4.png" alt="業種でさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut4").append(
        '<a href="#"><img src="img/img-menubut4_4.png" alt="キーワードでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut5").append(
        '<a href="#"><img src="img/img-menubut5_4.png" alt="リストでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut6").append(
        '<a href="#"><img src="img/img-menubut6_4.png" alt="業種でさがす" class="menuimg-side fadeIn animated"></a>'
      );
    }
    //4/28〜5/5  端午の節句
    else if (m === 4 && d > 27) {
      $("#menubut1").append(
        '<a href="#"><img src="img/img-menubut1_5.png" alt="キーワードでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut2").append(
        '<a href="#"><img src="img/img-menubut2_5.png" alt="リストでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut3").append(
        '<a href="#"><img src="img/img-menubut3_5.png" alt="業種でさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut4").append(
        '<a href="#"><img src="img/img-menubut4_5.png" alt="キーワードでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut5").append(
        '<a href="#"><img src="img/img-menubut5_5.png" alt="リストでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut6").append(
        '<a href="#"><img src="img/img-menubut6_5.png" alt="業種でさがす" class="menuimg-side fadeIn animated"></a>'
      );
    } else if (m === 5 && d < 6) {
      $("#menubut1").append(
        '<a href="#"><img src="img/img-menubut1_5.png" alt="キーワードでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut2").append(
        '<a href="#"><img src="img/img-menubut2_5.png" alt="リストでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut3").append(
        '<a href="#"><img src="img/img-menubut3_5.png" alt="業種でさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut4").append(
        '<a href="#"><img src="img/img-menubut4_5.png" alt="キーワードでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut5").append(
        '<a href="#"><img src="img/img-menubut5_5.png" alt="リストでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut6").append(
        '<a href="#"><img src="img/img-menubut6_5.png" alt="業種でさがす" class="menuimg-side fadeIn animated"></a>'
      );
    }
    //6/10〜6/16  梅雨
    else if (m === 6 && d > 9 && d < 17) {
      $("#menubut1").append(
        '<a href="#"><img src="img/img-menubut1_6.png" alt="キーワードでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut2").append(
        '<a href="#"><img src="img/img-menubut2_6.png" alt="リストでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut3").append(
        '<a href="#"><img src="img/img-menubut3_6.png" alt="業種でさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut4").append(
        '<a href="#"><img src="img/img-menubut4_6.png" alt="キーワードでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut5").append(
        '<a href="#"><img src="img/img-menubut5_6.png" alt="リストでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut6").append(
        '<a href="#"><img src="img/img-menubut6_6.png" alt="業種でさがす" class="menuimg-side fadeIn animated"></a>'
      );
    }
    //7/1〜7/7  七夕
    else if (m === 7 && d < 8) {
      $("#menubut1").append(
        '<a href="#"><img src="img/img-menubut1_7.png" alt="キーワードでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut2").append(
        '<a href="#"><img src="img/img-menubut2_7.png" alt="リストでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut3").append(
        '<a href="#"><img src="img/img-menubut3_7.png" alt="業種でさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut4").append(
        '<a href="#"><img src="img/img-menubut4_7.png" alt="キーワードでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut5").append(
        '<a href="#"><img src="img/img-menubut5_7.png" alt="リストでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut6").append(
        '<a href="#"><img src="img/img-menubut6_7.png" alt="業種でさがす" class="menuimg-side fadeIn animated"></a>'
      );
    }
    //8月第一土曜日までの一週間  花火/夏祭り
    else if (aug === true) {
      $("#menubut1").append(
        '<a href="#"><img src="img/img-menubut1_8.png" alt="キーワードでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut2").append(
        '<a href="#"><img src="img/img-menubut2_8.png" alt="リストでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut3").append(
        '<a href="#"><img src="img/img-menubut3_8.png" alt="業種でさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut4").append(
        '<a href="#"><img src="img/img-menubut4_8.png" alt="キーワードでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut5").append(
        '<a href="#"><img src="img/img-menubut5_8.png" alt="リストでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut6").append(
        '<a href="#"><img src="img/img-menubut6_8.png" alt="業種でさがす" class="menuimg-side fadeIn animated"></a>'
      );
    }
    //9/9～15  月見
    else if (m === 9 && d > 8 && d < 16) {
      $("#menubut1").append(
        '<a href="#"><img src="img/img-menubut1_9.png" alt="キーワードでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut2").append(
        '<a href="#"><img src="img/img-menubut2_9.png" alt="リストでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut3").append(
        '<a href="#"><img src="img/img-menubut3_9.png" alt="業種でさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut4").append(
        '<a href="#"><img src="img/img-menubut4_9.png" alt="キーワードでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut5").append(
        '<a href="#"><img src="img/img-menubut5_9.png" alt="リストでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut6").append(
        '<a href="#"><img src="img/img-menubut6_9.png" alt="業種でさがす" class="menuimg-side fadeIn animated"></a>'
      );
    }
    //10/25～31  ハロウィン
    else if (m === 10 && d > 24) {
      $("#menubut1").append(
        '<a href="#"><img src="img/img-menubut1_10.png" alt="キーワードでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut2").append(
        '<a href="#"><img src="img/img-menubut2_10.png" alt="リストでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut3").append(
        '<a href="#"><img src="img/img-menubut3_10.png" alt="業種でさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut4").append(
        '<a href="#"><img src="img/img-menubut4_10.png" alt="キーワードでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut5").append(
        '<a href="#"><img src="img/img-menubut5_10.png" alt="リストでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut6").append(
        '<a href="#"><img src="img/img-menubut6_10.png" alt="業種でさがす" class="menuimg-side fadeIn animated"></a>'
      );
    }
    //11/15～23  紅葉
    else if (m === 11 && d > 14 && d < 24) {
      $("#menubut1").append(
        '<a href="#"><img src="img/img-menubut1_11.png" alt="キーワードでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut2").append(
        '<a href="#"><img src="img/img-menubut2_11.png" alt="リストでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut3").append(
        '<a href="#"><img src="img/img-menubut3_11.png" alt="業種でさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut4").append(
        '<a href="#"><img src="img/img-menubut4_11.png" alt="キーワードでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut5").append(
        '<a href="#"><img src="img/img-menubut5_11.png" alt="リストでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut6").append(
        '<a href="#"><img src="img/img-menubut6_11.png" alt="業種でさがす" class="menuimg-side fadeIn animated"></a>'
      );
    }
    //12/19～25  クリスマス
    else if (m === 12 && d > 18 && d < 26) {
      $("#menubut1").append(
        '<a href="#"><img src="img/img-menubut1_12.png" alt="キーワードでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut2").append(
        '<a href="#"><img src="img/img-menubut2_12.png" alt="リストでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut3").append(
        '<a href="#"><img src="img/img-menubut3_12.png" alt="業種でさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut4").append(
        '<a href="#"><img src="img/img-menubut4_12.png" alt="キーワードでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut5").append(
        '<a href="#"><img src="img/img-menubut5_12.png" alt="リストでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut6").append(
        '<a href="#"><img src="img/img-menubut6_12.png" alt="業種でさがす" class="menuimg-side fadeIn animated"></a>'
      );
    }
    //1/1～7     正月
    else if (m === 1 && d < 8) {
      $("#menubut1").append(
        '<a href="#"><img src="img/img-menubut1_1.png" alt="キーワードでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut2").append(
        '<a href="#"><img src="img/img-menubut2_1.png" alt="リストでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut3").append(
        '<a href="#"><img src="img/img-menubut3_1.png" alt="業種でさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut4").append(
        '<a href="#"><img src="img/img-menubut4_1.png" alt="キーワードでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut5").append(
        '<a href="#"><img src="img/img-menubut5_1.png" alt="リストでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut6").append(
        '<a href="#"><img src="img/img-menubut6_1.png" alt="業種でさがす" class="menuimg-side fadeIn animated"></a>'
      );
    }
    //1/28～2/3  節分
    else if (m === 1 && d > 27) {
      $("#menubut1").append(
        '<a href="#"><img src="img/img-menubut1_2.png" alt="キーワードでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut2").append(
        '<a href="#"><img src="img/img-menubut2_2.png" alt="リストでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut3").append(
        '<a href="#"><img src="img/img-menubut3_2.png" alt="業種でさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut4").append(
        '<a href="#"><img src="img/img-menubut4_2.png" alt="キーワードでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut5").append(
        '<a href="#"><img src="img/img-menubut5_2.png" alt="リストでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut6").append(
        '<a href="#"><img src="img/img-menubut6_2.png" alt="業種でさがす" class="menuimg-side fadeIn animated"></a>'
      );
    } else if (m === 2 && d < 4) {
      $("#menubut1").append(
        '<a href="#"><img src="img/img-menubut1_2.png" alt="キーワードでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut2").append(
        '<a href="#"><img src="img/img-menubut2_2.png" alt="リストでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut3").append(
        '<a href="#"><img src="img/img-menubut3_2.png" alt="業種でさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut4").append(
        '<a href="#"><img src="img/img-menubut4_2.png" alt="キーワードでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut5").append(
        '<a href="#"><img src="img/img-menubut5_2.png" alt="リストでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut6").append(
        '<a href="#"><img src="img/img-menubut6_2.png" alt="業種でさがす" class="menuimg-side fadeIn animated"></a>'
      );
    }
    //2/25～3/3  雛祭
    else if (m === 2 && d > 24) {
      $("#menubut1").append(
        '<a href="#"><img src="img/img-menubut1_3.png" alt="キーワードでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut2").append(
        '<a href="#"><img src="img/img-menubut2_3.png" alt="リストでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut3").append(
        '<a href="#"><img src="img/img-menubut3_3.png" alt="業種でさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut4").append(
        '<a href="#"><img src="img/img-menubut4_3.png" alt="キーワードでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut5").append(
        '<a href="#"><img src="img/img-menubut5_3.png" alt="リストでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut6").append(
        '<a href="#"><img src="img/img-menubut6_3.png" alt="業種でさがす" class="menuimg-side fadeIn animated"></a>'
      );
    } else if (m === 3 && d < 4) {
      $("#menubut1").append(
        '<a href="#"><img src="img/img-menubut1_3.png" alt="キーワードでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut2").append(
        '<a href="#"><img src="img/img-menubut2_3.png" alt="リストでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut3").append(
        '<a href="#"><img src="img/img-menubut3_3.png" alt="業種でさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut4").append(
        '<a href="#"><img src="img/img-menubut4_3.png" alt="キーワードでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut5").append(
        '<a href="#"><img src="img/img-menubut5_3.png" alt="リストでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut6").append(
        '<a href="#"><img src="img/img-menubut6_3.png" alt="業種でさがす" class="menuimg-side fadeIn animated"></a>'
      );
    }
    //上記以外の期間
    else {
      $("#menubut1").append(
        '<a href="#"><img src="img/img-menubut1.png" alt="キーワードでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut2").append(
        '<a href="#"><img src="img/img-menubut2.png" alt="リストでさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut3").append(
        '<a href="#"><img src="img/img-menubut3.png" alt="業種でさがす" class="menuimg fadeIn animated"></a>'
      );
      $("#menubut4").append(
        '<a href="#"><img src="img/img-menubut4.png" alt="キーワードでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut5").append(
        '<a href="#"><img src="img/img-menubut5.png" alt="リストでさがす" class="menuimg-side fadeIn animated"></a>'
      );
      $("#menubut6").append(
        '<a href="#"><img src="img/img-menubut6.png" alt="業種でさがす" class="menuimg-side fadeIn animated"></a>'
      );
    }
  }
  //information.htmlかつnoがありsuffixがない場合はdbからsuffixを当て表示（suffixが2以上の場合はselect.htmlに遷移）
  if (url === "information.html") {
    if (suf === null && no) {
      suf = find_suf(no);
      if (suf === 1) {
        reload("information.html", id, thistime, url_Key, no, suf, page);
      } else {
        reload("select.html", id, thistime, url_Key, no, suf, page);
      }
    } else if (suf === null && no === null) {
      reload("index.html", id, thistime, url_Key, no, suf, page);
    }
  }
  //select.htmlで、直接アクセスされる等により、suffixが1しかない品目にアクセスされた場合の処理（もしパラメータにsuffix=2～があっても無視される）
  if (url === "select.html") {
    var max_suf = 0;
    var jsonUrl = getJsonUrl();
    $.ajaxSetup({
      async: false
    });
    $.getJSON(jsonUrl, function(data) {
      for (var m in data) {
        if (data[m].no == no) {
          max_suf++;
        }
      }
    });
    if (max_suf < 2) {
      reload("information.html", id, thistime, url_Key, no, 1, page);
    }
  }
  //loading
  var h = $(window).height();
  $("#main").css("display", "none");
  $("#loader-bg ,#loader")
    .height(h)
    .css("display", "block");
  $("#loader-bg")
    .delay(450)
    .fadeOut(400);
  $("#loader")
    .delay(300)
    .fadeOut(150);
  $("#main").css("display", "block");
  //index.html挙動設定
  if (url === "index.html") {
    //ブラウザバック対応：index.htmlの画像初期化
    $("[id^=menubut]").removeClass("bounce animated");
    //以下、iOS用の対応：ブラウザバックを検知しないため
    window.onpageshow = function(event) {
      if (event.persisted) {
        $("[id^=menubut]").removeClass("bounce animated");
      }
    };
    //menu-button設定
    $("#menubut1").click(function(e) {
      e.preventDefault; //クリック時の挙動停止
      $("#menubut1").addClass("rubberBand animated");
      setTimeout(function() {
        url = "search.html?id=" + id + "&lasttime=" + thistime;
        window.location.href = url;
      }, 1000);
    });
    $("#menubut2").click(function(e) {
      e.preventDefault; //クリック時の挙動停止
      $("#menubut2").addClass("rubberBand animated");
      setTimeout(function() {
        url = "list.html?id=" + id + "&lasttime=" + thistime;
        window.location.href = url;
      }, 1000);
    });
    $("#menubut3").click(function(e) {
      e.preventDefault; //クリック時の挙動停止
      $("#menubut3").addClass("rubberBand animated");
      setTimeout(function() {
        url = "gyoshubetsu.html?id=" + id;
        window.location.href = url;
      }, 1000);
    });
    $("#menubut4").click(function(e) {
      e.preventDefault; //クリック時の挙動停止
      $("#menubut4").addClass("rubberBand animated");
      setTimeout(function() {
        url = "search.html?id=" + id + "&lasttime=" + thistime;
        window.location.href = url;
      }, 1000);
    });
    $("#menubut5").click(function(e) {
      e.preventDefault; //クリック時の挙動停止
      $("#menubut5").addClass("rubberBand animated");
      setTimeout(function() {
        url = "list.html?id=" + id + "&lasttime=" + thistime;
        window.location.href = url;
      }, 1000);
    });
    $("#menubut6").click(function(e) {
      e.preventDefault; //クリック時の挙動停止
      $("#menubut6").addClass("rubberBand animated");
      setTimeout(function() {
        url = "gyoshubetsu.html?id=" + id;
        window.location.href = url;
      }, 1000);
    });
  }
  //input forcus時の処理,clear-button追加
  if (url === "search.html" || url === "result.html") {
    $("#new_search").addClear({ top: 5, right: 70 });
    // モバイルの場合は検索窓が画面上にくるようにする
    if (DeviceName() === "1") {
      $("#new_search").focus(function() {
        window.location.href = "#new_search";
      });
    }
  }
  //業種別ページボタンクリック時の処理
  if (url === "gyoshubetsu.html") {
    $(".gyoshubetsu_btn").click(function(e) {
      var gyoshu = $(this).attr("id");
      gyoshu = gyoshu.replace("gyo-", "");
      var opn_Url =
        "gyoshubetsu-select.html?id=" +
        id +
        "&lasttime=" +
        thistime +
        "&gyoshu=" +
        gyoshu;
      window.location.href = opn_Url;
    });
  }
  //以下、各ページ共通の処理
  $("#submitBtn").click(function(e) {
    if ($(':text[name="new_search"]').val() === "") {
      $("#modal-exclamation").modal("show");
      return e.preventDefault();
    } else if (
      $(':text[name="new_search"]')
        .val()
        .match(/^[ 　\r\n\t]*$/)
    ) {
      $("#modal-exclamation").modal("show");
      return e.preventDefault();
    } else {
      var wod_Key = $(':text[name="new_search"]').val();
      enc_Key = encodeURIComponent(wod_Key);
      var opn_Url =
        "result.html?id=" + id + "&lasttime=" + thistime + "&key=" + enc_Key;
      window.location.href = opn_Url;
      return e.preventDefault();
    }
  });
  $("#modeselect_Btn").click(function(e) {
    if (url === "search.html") {
      actionLog("event", "search_manual");
    } else if (url === "result.html") {
      actionLog("event", "result_manual");
    } else if (url === "list.html") {
      actionLog("event", "list_manual");
    }
    introJs().start();
  });
  $("#inquiry_mail").click(function(e) {
    var mailto_sub;
    var no = myGetQuery("no");
    no = Number(no);
    var key = myGetQuery("key");
    if (url === "list.html") {
      mailto_sub =
        "%e4%ba%8b%e6%a5%ad%e7%b3%bb%e3%81%94%e3%81%bf%e5%88%86%e5%88%a5%e6%a4%9c%e7%b4%a2%e3%82%b5%e3%82%a4%e3%83%88%e3%81%8b%e3%82%89%e3%81%ae%e8%b3%aa%e5%95%8f%e3%80%90ID%3a" +
        id +
        "%e3%80%91";
      actionLog("event", "list_mail");
    } else if (url === "result.html") {
      mailto_sub =
        "%e4%ba%8b%e6%a5%ad%e7%b3%bb%e3%81%94%e3%81%bf%e5%88%86%e5%88%a5%e6%a4%9c%e7%b4%a2%e3%82%b5%e3%82%a4%e3%83%88%e3%81%8b%e3%82%89%e3%81%ae%e8%b3%aa%e5%95%8f%e3%80%90ID%3a" +
        id +
        "KEY%3a" +
        key +
        "%e3%80%91";
      actionLog("event", "result_mail");
    } else if (url === "information.html") {
      mailto_sub =
        "%e4%ba%8b%e6%a5%ad%e7%b3%bb%e3%81%94%e3%81%bf%e5%88%86%e5%88%a5%e6%a4%9c%e7%b4%a2%e3%82%b5%e3%82%a4%e3%83%88%e3%81%8b%e3%82%89%e3%81%ae%e8%b3%aa%e5%95%8f%e3%80%90ID%3a" +
        id +
        "NO%3a" +
        no +
        "%e3%80%91";
      actionLog("event", "result_mail");
    }
    var mailto =
      "mailto:bizwaste-search@office.city.kobe.lg.jp?subject=" + mailto_sub;
    window.location.href = mailto;
  });
  $("#inquiry_tel").click(function(e) {
    var tel = "tel:0783226432";
    if (url === "list.html") {
      actionLog("event", "list_tel");
    } else if ("result.html") {
      actionLog("event", "result_tel");
    } else if ("information.html") {
      actionLog("event", "information_tel");
    }
    window.location.href = tel;
  });
  //トップへ戻るボタン
  var topBtn = $("#pageTop");
  topBtn.hide();
  //トップへ戻るボタンの表示設定
  $(window).scroll(function() {
    if ($(this).scrollTop() > 80) {
      //---- 画面を80pxスクロールしたら、ボタンを表示する
      topBtn.fadeIn();
    } else {
      //---- 画面が80pxより上なら、ボタンを表示しない
      topBtn.fadeOut();
    }
  });
  if (url === "list.html" || url == "result.html") {
    $('a[href^="#"]').click(function() {
      var speed = 500;
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? "html" : href);
      var position = target.offset().top;
      if (url === "list.html") {
        if (position != 0) {
          position = position - 70;
        }
      }
      $("html, body").animate({ scrollTop: position }, speed, "swing");
      return false;
    });
  }
});
$(window).on("resize", function() {
  var url = location.href;
  url = url.match(".+/(.+?)([?#;].*)?$")[1];
  var w = $(window).width();
  var h = $(window).height();
  if (url === "index.html") {
    if (w > h) {
      $("#menuarea").show();
      $("#menuarea-side").hide();
    } else if (w < h) {
      $("#menuarea").hide();
      $("#menuarea-side").show();
    }
  }
  if (url === "search.html") {
    suggest_sort();
  }
});
$(window).on("load", function() {
  var id = myGetQuery("id");
  var ls = variable("ls");
  var user = localStorage.getItem(ls);
  user = user.slice(0, 16);
  var url = location.href;
  url = url.match(".+/(.+?)([?#;].*)?$")[1];
  actionLog("load", "none");
  var lasttime = myGetQuery("lasttime"); //最終閲覧日時
  var thistime = getTime_str(); //現在日時
  var url_Key = myGetQuery("key");
  $(':text[name="new_search"]').val(url_Key); //検索窓にurl_Keyを挿入※検索窓がないページでもとりあえず実行
  var no = myGetQuery("no");
  var suf = myGetQuery("suffix");
  var page = myGetQuery("page");
  var gyoshu = myGetQuery("gyoshu");
  var w = $(window).width();
  var h = $(window).height();
  var jsonUrl = getJsonUrl();
  var doctit;
  jQuery("#loading").hide(); //loading
  if (
    url != "information.html" &&
    url != "select.html" &&
    url != "gyoshubetsu-select.html"
  ) {
    HeadAndShare(url, url_Key, no, suf, gyoshu); // headタグ内description,canonical,「このページを共有する」モーダル内を編集（information.html,select.htmlは別で処理する）
  }
  if (url === "index.html") {
    if (w > h) {
      $("#menuarea").show();
      $("#menuarea-side").hide();
    } else {
      $("#menuarea").hide();
      $("#menuarea-side").show();
    }
  } else if (url === "result.html") {
    var url_Key_check = url_Key;
    var redirect_url;
    if (url_Key_check === "") {
      redirect_url = url + "?id=" + id + "&lasttime=" + thistime;
      window.location.href = redirect_url;
    } else if (url_Key_check.match(/^[ 　\r\n\t]*$/)) {
      redirect_url = url + "?id=" + id + "&lasttime=" + thistime;
      window.location.href = redirect_url;
    } else {
      var par_Key = transliteration(url_Key);
      par_Key = par_Key.replace(/　/g, " ");
      par_Key = par_Key.replace(/-/g, ""); //toEisuHankakuで全角→半角に変換済なので半角のみを処理
      var sep_Key = par_Key.split(" ");
      var db_Wod;
      var countX;
      var countY = sep_Key.length;
      var countT = 0;
      var res;
      var res_val;
      $.ajaxSetup({
        async: false
      });
      $.getJSON(jsonUrl, function(data) {
        //先にdataを閲覧頻度順に並べ換えておく
        data.sort(function(val1, val2) {
          return val1.viewCount < val2.viewCount ? 1 : -1;
        });
        for (var m in data) {
          db_Wod = data[m].name + "・" + data[m].keyword;
          countX = 0;
          res_val = 0;
          for (var l = 0; l < sep_Key.length; l++) {
            if (db_Wod.indexOf(sep_Key[l]) != -1) {
              if (data[m].suffix === 1) {
                countX = countX + 1;
              }
            }
          }
          if (countX === countY) {
            $("#list").append(
              '<li class="list-wrap"><a href="javascript:void(0)"onclick="open_result(\'' +
                data[m].no +
                '\',\'search\');" class="list-link list-item list-arrow list-main"><p class="list-text">' +
                data[m].name +
                "</p></a></li>"
            );
            countT++;
          }
        }
        if (countT === 0) {
          $("#list").append(
            '<a class="list-link list-item list-main"id="noresults"><p class="list-text">該当する結果がありませんでした</p></a>'
          );
        }
        var g = "b";
        var gasurl = variable("gasurl");
        var postdata =
          "g=" +
          g +
          "&uId=" +
          id +
          "&uNo=" +
          user +
          "&sWd=" +
          encodeURIComponent(url_Key) +
          "&tWd=" +
          encodeURIComponent(par_Key) +
          "&sRs=" +
          countT;
        $.ajax({
          url: gasurl,
          type: "POST",
          data: postdata,
          dataType: "text"
        });
      });
      setAutoCompleate();
    }
  } else if (url === "information.html") {
    no = Number(no);
    var db_no;
    var name;
    var selectName;
    var genre;
    var bag;
    var limit;
    var limitComment;
    var industrial;
    var industrialComent;
    var resources;
    var exclusion;
    var recycling;
    var recyclingComent;
    var recyclingRelation;
    var comment1;
    var comment1Link;
    var comment1LinkText;
    var comment2;
    var comment2ink;
    var comment2LinkText;
    $.ajaxSetup({
      async: false
    });
    $.getJSON(jsonUrl, function(data) {
      for (var m in data) {
        if (data[m].no === no) {
          if (data[m].suffix == suf) {
            if (data[m].business) {
              name =
                "<b>" +
                data[m].name +
                "</b>（" +
                data[m].business +
                " が排出する場合）";
              //title・description変更
              doctit =
                "神戸市：事業系ごみの分別区分（" +
                data[m].name +
                "（" +
                data[m].business +
                " が排出する場合））";
              document.title = doctit;
              $("meta[name='description']").attr(
                "content",
                "神戸市内のお店や会社から「" +
                  data[m].name +
                  "（" +
                  data[m].business +
                  " が排出する場合）」を捨てる場合の分別区分をご案内します。"
              );
            } else {
              name = "<b>" + data[m].name + "</b>";
              //title・description変更
              doctit = "神戸市：事業系ごみの分別区分（" + data[m].name + "）";
              document.title = doctit;
              $("meta[name='description']").attr(
                "content",
                "神戸市内のお店や会社から「" +
                  data[m].name +
                  "」を捨てる場合の分別区分をご案内します。"
              );
            }
            HeadAndShare(url, url_Key, no, suf, gyoshu, doctit);
            selectName = data[m].name;
            genre = data[m].genre;
            bag = data[m].bag;
            limit = data[m].limit;
            limitComment = data[m].limitComment;
            industrial = data[m].industrial;
            industrialComent = data[m].industrialComent;
            resources = data[m].resources;
            exclusion = data[m].exclusion;
            recycling = data[m].recycling;
            recyclingComent = data[m].recyclingComent;
            recyclingRelationUrl = data[m].recyclingRelationUrl;
            recyclingRelation = data[m].recyclingRelation;
            comment1 = data[m].comment1;
            comment1Link = data[m].comment1Link;
            comment1LinkText = data[m].comment1LinkText;
            comment2 = data[m].comment2;
            comment2Link = data[m].comment2Link;
            comment2LinkText = data[m].comment2LinkText;
          }
        }
      }
    });
    $("#result-name").html(name);
    if (genre === 1) {
      $("#result").addClass("panel-danger");
      $("#result-genre").addClass("h1");
      $("#result-genre").prepend(
        '<b>可燃ごみ</b><span class="glyphicon glyphicon-fire"></span>'
      );
    } else if (genre === 2) {
      $("#result").addClass("panel-success");
      $("#result-genre").addClass("h1");
      $("#result-genre").prepend(
        '<b>資源ごみ</b><span class="glyphicon glyphicon-refresh"></span>'
      );
    } else if (genre === 3) {
      $("#result").addClass("panel-default");
      $("#result-genre").addClass("h2");
      $("#result-genre").prepend("<b>粗大(不燃)ごみ</b>");
    } else if (genre === 4) {
      $("#result").addClass("panel-danger");
      $("#result-genre").addClass("h2");
      $("#result-genre").prepend(
        '<b>搬入不可</b><span class="glyphicon glyphicon-remove"></span>'
      );
    }
    //重複して使用する文字列の変数化
    var fukurostr =
      "<div class='text-info h4'><span class='glyphicon glyphicon-info-sign' /> 指定袋に入れてください</div><div class='h5'>指定袋の販売価格・取扱店は、<a href='javascript:void(0)' onclick='turnPage(\"http://www.city.kobe.lg.jp/business/regulation/environment/enterprise/hanbai.html\",\"event\",\"information_info(No." +
      no +
      ",hanbai)\")'>こちら</a>をご覧ください</div>";
    var sanpaistr =
      '現在契約中の一般廃棄物収集運搬許可業者（<a href=\'javascript:void(0)\' onclick=\'turnPage("http://www.city.kobe.lg.jp/business/regulation/environment/enterprise/gyousy_l.html","event","information_info(No.' +
      no +
      ',kyokagyoshalist)")\'>一覧ページ</a>） または、兵庫県産業廃棄物協会（<a href=\'javascript:void(0)\' onclick=\'turnPage("tel:0783817464","event","information_info(No.' +
      no +
      ",sanpaikyokai)\")'>078-381-7464</a>）へご相談ください";
    var recyclingstr =
      '<div class="h5"><a href=\'javascript:void(0)\' onclick=\'turnPage("http://www.city.kobe.lg.jp/life/recycle/waketon/shiraberu/index_04.html","event","information_info(No.' +
      no +
      ",kaden)\")'>詳しくはこちらをご覧ください</a><br />※家庭ごみの案内ページですが、事業系ごみも同様の扱いとなります</div>";
    //指定袋
    if (bag) {
      if (genre === 3) {
        $("#info-list").append(
          "<li class='list-group-item' href='#'>" +
            fukurostr +
            "<div class='h5'>とがったものを入れる場合は、紙に包んでから入れ、「キケン」と表示してください</div></li>"
        );
      } else {
        $("#info-list").append(
          "<li class='list-group-item' href='#'>" + fukurostr + "</li>"
        );
      }
    } else {
      if (genre === 3) {
        $("#info-list").append(
          '<li class="list-group-item" href="#"><div class="text-info h4"><span class="glyphicon glyphicon-info-sign" /> 指定袋に入るものは、指定袋に入れて出してください</div><div class=\'h5\'>指定袋に入らない大きさの可燃物・不燃物については、取引のある一般廃棄物収集運搬許可業者にご相談ください</div><div class=\'h5\'><a href=\'javascript:void(0)\' onclick=\'turnPage("http://www.city.kobe.lg.jp/business/regulation/environment/enterprise/gyousy_l.html","event","information_info(No.' +
            no +
            ",kyokagyoshalist)\")'>一般廃棄物収集運搬許可業者一覧ページ</a></div></li>"
        );
      }
    }
    //搬入制限
    if (limit) {
      if (limit === 1) {
        $("#info-list").append(
          '<li class="list-group-item" href="#"><div class="text-danger h4"><span class="glyphicon glyphicon-exclamation-sign" /> 排出できる量に制限があります</div><div class="h5">排出できるのは、排出元一箇所・1日につき、総量が70Lの袋で3袋分までです。<br />それ以上を処分する場合、もしくは継続的に処分する場合は産業廃棄物として処分してください。<br />※指定袋に入らない場合は、排出元一箇所につき、5点まで排出できます。<br />産業廃棄物に関するお問い合わせは、' +
            sanpaistr +
            '</div><div class="h5"><a href="javascript:void(0)"onclick="modal_exception(' +
            no +
            ')">排出量を制限している理由</a></div></li>'
        );
      } else if (limit === 2) {
        $("#info-list").append(
          '<li class="list-group-item" href="#"><div class="text-danger h4"><span class="glyphicon glyphicon-exclamation-sign" /> 排出できる量に制限があります</div><div class="h5">排出できるのは、排出元一箇所・1日につき、総量が5点までです。<br />それ以上を処分する場合、もしくは継続的に処分する場合は産業廃棄物として処分してください。<br />※指定袋に入る場合は、排出元一箇所につき、3袋まで排出できます。<br />産業廃棄物に関するお問い合わせは、' +
            sanpaistr +
            '</div><div class="h5"><a href="javascript:void(0)"onclick="modal_exception(' +
            no +
            ')">排出量を制限している理由</a></div></li>'
        );
      }
    }
    //産業廃棄物
    if (industrial) {
      if (industrial === 1) {
        $("#info-list").append(
          '<li class="list-group-item" href="#"><div class="text-danger h4"><span class="glyphicon glyphicon-exclamation-sign" /> 産業廃棄物として処分してください</div><div class="h5">詳しくは、' +
            sanpaistr +
            "</div></li>"
        );
      } else if (industrial === 2) {
        $("#info-list").append(
          '<li class="list-group-item" href="#"><div class="text-danger h4"><span class="glyphicon glyphicon-exclamation-sign" /> 新築、改築、増築、除去等の工事に使用されたものは産業廃棄物として処分してください</div><div class="h5">詳しくは、' +
            sanpaistr +
            "</div></li>"
        );
      } else if (industrial === 3) {
        $("#info-list").append(
          '<li class="list-group-item" href="#"><div class="text-danger h4"><span class="glyphicon glyphicon-exclamation-sign" /> 指定袋に入らないものは産業廃棄物として処分してください。</div><div class="h5">詳しくは、' +
            sanpaistr +
            "</div></li>"
        );
      } else if (industrial === 4) {
        if (industrialComent) {
          $("#info-list").append(
            '<li class="list-group-item" href="#"><div class="text-danger h4"><span class="glyphicon glyphicon-exclamation-sign" />' +
              industrialComent +
              '</div><div class="h5">詳しくは、' +
              sanpaistr +
              "</div></li>"
          );
        } else {
          $("#info-list").append(
            '<li class="list-group-item" href="#"><div class="text-danger h4"><span class="glyphicon glyphicon-exclamation-sign" /> 産業廃棄物として処分してください</div><div class="h5">詳しくは、' +
              sanpaistr +
              "</div></li>"
          );
        }
      }
    }
    //家電リサイクル法
    if (recycling) {
      if (recyclingRelation) {
        if (recycling === 1) {
          if (recyclingComent) {
            $("#info-list").append(
              '<li class="list-group-item" href="#"><div class="text-danger h4"><span class="glyphicon glyphicon-exclamation-sign" />「家電リサイクル法」に基づき処分してください。</div><div class="h5">' +
                recyclingComent +
                "</div>" +
                recyclingstr +
                "<div class=\"h5\"><a href='javascript:void(0)' onclick='turnPage(\"" +
                recyclingRelationUrl +
                '","event","information_info(No.' +
                no +
                ',recycling","information")\'>' +
                recyclingRelation +
                "</a></div></li>"
            );
          } else {
            $("#info-list").append(
              '<li class="list-group-item" href="#"><div class="text-danger h4"><span class="glyphicon glyphicon-exclamation-sign" />「家電リサイクル法」に基づき処分してください。</div>' +
                recyclingstr +
                "<div class=\"h5\"><a href='javascript:void(0)' onclick='turnPage(\"" +
                recyclingRelationUrl +
                '","event","information_info(No.' +
                no +
                ',recycling","information")\'>' +
                recyclingRelation +
                "</a></div></li>"
            );
          }
        }
        if (recycling === 2) {
          $("#info-list").append(
            '<li class="list-group-item" href="#"><div class="text-danger h4"><span class="glyphicon glyphicon-exclamation-sign" />家庭用機器の場合は、「家電リサイクル法」に基づき処分してください。</div>' +
              recyclingstr +
              "<div class=\"h5\"><a href='javascript:void(0)' onclick='turnPage(\"" +
              recyclingRelationUrl +
              '","event","information_info(No.' +
              no +
              ',recycling","information")\'>' +
              recyclingRelation +
              "</a></div></li>"
          );
        }
      } else {
        if (recycling === 1) {
          if (recyclingComent) {
            $("#info-list").append(
              '<li class="list-group-item" href="#"><div class="text-danger h4"><span class="glyphicon glyphicon-exclamation-sign" />「家電リサイクル法」に基づき処分してください。</div><div class="h5">' +
                recyclingComent +
                "</div>" +
                recyclingstr +
                "</li>"
            );
          } else {
            $("#info-list").append(
              '<li class="list-group-item" href="#"><div class="text-danger h4"><span class="glyphicon glyphicon-exclamation-sign" />「家電リサイクル法」に基づき処分してください。</div>' +
                recyclingstr +
                "</li>"
            );
          }
        }
        if (recycling === 2) {
          $("#info-list").append(
            '<li class="list-group-item" href="#"><div class="text-danger h4"><span class="glyphicon glyphicon-exclamation-sign" />家庭用の機器であれば、「家電リサイクル法」に基づき処分してください。</div>' +
              recyclingstr +
              "</li>"
          );
        }
      }
    }
    //資源化
    if (resources) {
      if (resources === 1) {
        $("#info-list").append(
          '<li class="list-group-item" href="#"><div class="text-info h4"><span class="glyphicon glyphicon-info-sign" /> 紙のリサイクルにご協力ください</div><div class="h5">可燃ごみに含まれる紙の多くが資源化できる紙です。<br />これらの紙は、種類ごと（新聞紙・ダンボール・雑がみ）に分別することでリサイクル（売却）することができます。<br />リサイクルすることにより可燃ごみの量も減りますので、排出にかかる費用も削減できます。<br />※「雑がみ」とは、新聞、段ボール以外の、大小さまざまなリサイクルできる紙のことをいいます。<br />※ 民間のリサイクル業者では、文書の機密性を保持し、リサイクル処理を行える施設もあります。<br />※ 汚れたもの、濡れたものはリサイクルできません。また、表面をコーティング加工した紙や、感熱紙、写真といった紙もリサイクルできません。</div><div class="h5">紙ごみの回収品目や費用等は、<br />現在契約している一般廃棄物収集運搬許可業者（<a href=\'javascript:void(0)\' onclick=\'turnPage("http://www.city.kobe.lg.jp/business/regulation/environment/enterprise/gyousy_l.html","event","information_info(No.' +
            no +
            ', recycle-kami-kyokagyoshalist)")\'>一覧ページ</a>） または、<br />神戸市環境共栄事業協同組合（「共栄会」Tel: <a href=\'javascript:void(0)\' onclick=\'turnPage("tel:0783313470","event","information_info(No.' +
            no +
            ', recycle-kami-kyoeikaitel)")\'>078-265-6860</a>）、<br />兵庫県製紙原料直納協同組合（神戸古紙リサイクルの会内 Tel: <a href=\'javascript:void(0)\' onclick=\'turnPage("tel: 0782656860","event","information_info(No.' +
            no +
            ', recycle-kami-kyoeikaitel)")\'>078-265-6860</a>）にご相談ください。</div><div class="h5">【関連リンク】</div><div class="h5"><a href=\'javascript:void(0)\' onclick=\'turnPage("http://www.city.kobe.lg.jp/business/regulation/environment/enterprise/bug02.html","event","information_info(No.' +
            no +
            ', recycle-kami-link-recyclepage)")\'>事業系ごみの減量・リサイクル</a></div><div class="h5"><a href=\'javascript:void(0)\' onclick=\'turnPage("http://www.city.kobe.lg.jp/business/regulation/environment/enterprise/bizwastemail/article/201704-01.html","event","information_info(No.' +
            no +
            ", recycle-kami-link-mailmagazine)\")'>紙のリサイクル特集（メールマガジン「神戸市事業ごみメール」より）</a></div></li>"
        );
      }
      if (resources === 2) {
        $("#info-list").append(
          '<li class="list-group-item" href="#"><div class="text-info h4"><span class="glyphicon glyphicon-info-sign" /> 食品ロスの減量・リサイクルにご協力ください</div><div class="h5">日本では1人あたり茶碗1杯のごはんを毎日捨てるのと同じ量の食品廃棄物が発生しています。このうち、事業者は約339万トン排出しており、その多くが焼却処分されます。当然、その処分には多くの経費がかかっています。</div><div class="h5">この無駄を減らすため、</div><div class="h5">① 減量：たとえば飲食店なら、食べ残し・仕込みすぎが発生しないよう工夫することで、食品廃棄物を減らすことができます。</div><div class="h5"><a href=\'javascript:void(0)\' onclick=\'turnPage("http://www.city.kobe.lg.jp/business/regulation/environment/enterprise/bizwastemail/article/201708-01.html","event","information_info(No.' +
            no +
            ', recycle-kami-link-mailmagazine)")\'>食品ロスの減量特集（メールマガジン「神戸市事業ごみメール」より）</a></div><div class="h5">② リサイクル：やむをえず発生してしまった食品廃棄物はなるべくリサイクルしましょう。</div><div class="h5"><a href=\'javascript:void(0)\' onclick=\'turnPage("http://www.city.kobe.lg.jp/business/regulation/environment/enterprise/shokuri.html","event","information_info(No.' +
            no +
            ', recycle-kami-link-mailmagazine)")\'>事業系一般廃棄物の食品リサイクル</a></div><div class="h5"><a href=\'javascript:void(0)\' onclick=\'turnPage("http://www.city.kobe.lg.jp/business/regulation/environment/enterprise/bizwastemail/article/201702-01.html","event","information_info(No.' +
            no +
            ", recycle-kami-link-mailmagazine)\")'>食品リサイクル特集（メールマガジン「神戸市事業ごみメール」より）</a></div></li>"
        );
      }
      if (resources === 3) {
        $("#info-list").append(
          '<li class="list-group-item" href="#"><div class="text-info h4"><span class="glyphicon glyphicon-info-sign" /> 木くずのリサイクルにご協力ください</div><div class="h5">詳しくは、<a href=\'javascript:void(0)\' onclick=\'turnPage("http://www.city.kobe.lg.jp/business/regulation/environment/enterprise/bug02.html#midashi84933","event","information_info(No.' +
            no +
            ', recycle-kami-link-mailmagazine)")\'>こちら</a>をご覧ください</div><div class="h5">※資源化する場合はサイズの制限がありません</div></li>'
        );
      }
    }
    //指定袋収納義務除外申請
    if (exclusion) {
      $("#info-list").append(
        '<li class="list-group-item" href="#"><div class="text-info h4"><span class="glyphicon glyphicon-info-sign" /> 事前申請により、指定袋に入れずに市の処分施設に持ち込むことができます</div><div class="h5">詳しくは、<a href=\'javascript:void(0)\' onclick=\'turnPage("http://www.city.kobe.lg.jp/business/regulation/environment/enterprise/fukurogai.html","event","information_info(No.' +
          no +
          ",fukurogai)\")'>こちら</a>をご覧ください</div></li>"
      );
    }
    //コメント1
    if (comment1) {
      if (comment1Link) {
        if (comment1Link.slice(0, 17) === "information.html?") {
          $("#info-list").append(
            '<li class="list-group-item" href="#"><div class="h4"><span class="glyphicon glyphicon-info-sign" /> ' +
              comment1 +
              "</div><div class=\"h5\"><a href='javascript:void(0)' onclick='turnPage(\"" +
              comment1Link +
              '","event","information_info(No.' +
              no +
              ",comment1)\",\"information\")' target='_blank'>" +
              comment1LinkText +
              "</a></div></li>"
          );
        } else if (comment1Link === "link:sanpai") {
          $("#info-list").append(
            '<li class="list-group-item" href="#"><div class="h4"><span class="glyphicon glyphicon-info-sign" /> ' +
              comment1 +
              '</div><div class="h5">産業廃棄物に関するお問い合わせは、' +
              sanpaistr +
              "</div></li>"
          );
        } else {
          $("#info-list").append(
            '<li class="list-group-item" href="#"><div class="h4"><span class="glyphicon glyphicon-info-sign" /> ' +
              comment1 +
              "</div><div class=\"h5\"><a href='javascript:void(0)' onclick='turnPage(\"" +
              comment1Link +
              '","event","information_info(No.' +
              no +
              ",comment1)\")' target='_blank'>" +
              comment1LinkText +
              "</a></div></li>"
          );
        }
      } else if (comment1LinkText) {
        $("#info-list").append(
          '<li class="list-group-item" href="#"><div class="h4"><span class="glyphicon glyphicon-info-sign" /> ' +
            comment1 +
            '</div><div class="h5">' +
            comment1LinkText +
            "</div></li>"
        );
      } else {
        $("#info-list").append(
          '<li class="list-group-item" href="#"><div class="h4"><span class="glyphicon glyphicon-info-sign" /> ' +
            comment1 +
            "</div></li>"
        );
      }
    }
    //コメント2
    if (comment2) {
      if (comment2Link) {
        if (comment2Link.slice(0, 17) === "information.html?") {
          $("#info-list").append(
            '<li class="list-group-item" href="#"><div class="h4"><span class="glyphicon glyphicon-info-sign" /> ' +
              comment2 +
              "</div><div class=\"h5\"><a href='javascript:void(0)' onclick='turnPage(\"" +
              comment2Link +
              '","event","information_info(No.' +
              no +
              ",comment2)\",\"information\")' target='_blank'>" +
              comment2LinkText +
              "</a></div></li>"
          );
        } else if (comment2Link === "link:sanpai") {
          $("#info-list").append(
            '<li class="list-group-item" href="#"><div class="h4"><span class="glyphicon glyphicon-info-sign" /> ' +
              comment2 +
              '</div><div class="h5">産業廃棄物に関するお問い合わせは、' +
              sanpaistr +
              "</div></li>"
          );
        } else {
          $("#info-list").append(
            '<li class="list-group-item" href="#"><div class="h4"><span class="glyphicon glyphicon-info-sign" /> ' +
              comment2 +
              "</div><div class=\"h5\"><a href='javascript:void(0)' onclick='turnPage(\"" +
              comment2Link +
              '","event","information_info(No.' +
              no +
              ",comment1)\")' target='_blank'>" +
              comment2LinkText +
              "</a></div></li>"
          );
        }
      } else if (comment2LinkText) {
        $("#info-list").append(
          '<li class="list-group-item" href="#"><div class="h4"><span class="glyphicon glyphicon-info-sign" /> ' +
            comment2 +
            '</div><div class="h5">' +
            comment2LinkText +
            "</div></li>"
        );
      } else {
        $("#info-list").append(
          '<li class="list-group-item" href="#"><div class="h4"><span class="glyphicon glyphicon-info-sign" /> ' +
            comment2 +
            "</div></li>"
        );
      }
    }
    //Button
    if (page === "search") {
      $("#before-but").after(
        '<button type="button" class="btn-green600_rsd btn-lg btn-block back-list" onclick="javascript:window.history.back(-1);return false;">検索結果にもどる</button>'
      );
    } else if (page === "list") {
      $(':text[name="new_search"]').val("");
      $("#before-but").after(
        '<button type="button" class="btn-green600_rsd btn-lg btn-block back-list" onclick="javascript:window.history.back(-1);return false;">一覧にもどる</button>'
      );
    } else if (page === "select") {
      $("#before-but").after(
        '<button type="button" class="btn-green600_rsd btn-lg btn-block back-list" onclick="javascript:window.history.back(-1);return false;">業種選択画面にもどる</button>'
      );
    } else if (page === "suggest") {
      $("#before-but").after(
        '<button type="button" class="btn-green600_rsd btn-lg btn-block back-list" onclick="javascript:window.history.back(-1);return false;">検索画面にもどる</button>'
      );
    } else if (page === "information") {
      $("#before-but").after(
        '<button type="button" class="btn-green600_rsd btn-lg btn-block back-list" onclick="javascript:window.history.back(-1);return false;">前のページにもどる</button>'
      );
    } else if (page === "gyoshubetsu-select") {
      $("#before-but").after(
        '<button type="button" class="btn-green600_rsd btn-lg btn-block back-list" onclick="javascript:window.history.back(-1);return false;">業種別案内にもどる</button>'
      );
    } else {
      $("#before-but").after(
        '<button type="button" class="btn-green600_rsd btn-lg btn-block back-list" onclick="reload(\'index.html\',' +
          id +
          "," +
          thistime +
          "," +
          url_Key +
          "," +
          no +
          "," +
          suf +
          "," +
          page +
          ');">トップにもどる</button>'
      );
    }
    var g = "c";
    var gasurl = variable("gasurl");
    var postdata =
      "g=" +
      g +
      "&uId=" +
      id +
      "&uNo=" +
      user +
      "&sNo=" +
      no +
      "&sNa=" +
      encodeURIComponent(selectName) +
      "&sSf=" +
      suf +
      "&sMn=" +
      page;
    $.ajax({
      url: gasurl,
      type: "POST",
      data: postdata,
      dataType: "text"
    });
  } else if (url === "list.html") {
    var sortJson; //ソート用の配列
    $.getJSON(jsonUrl, function(data) {
      var n = data.length; //JSONデータ数
      var sortAry = new Array(n);
      var ii = 0;
      for (i = 0; i < n; i++) {
        if (data[i].suffix === 1) {
          sortAry[ii] = [data[i].keyword, data[i]]; //ソート用のキー配列（sortAry="keywordのみ",オブジェクト全体 となっている)
          ii++;
        }
      }
      n = ii;
      sortAry = $.grep(sortAry, function(e) {
        return e;
      });
      sortAry.sort(); //ソート
      // ソート結果の必要部分だけを、再度配列へ格納（オブジェクトのみを残す）
      for (ii = 0; ii < n; ii++) {
        sortAry[ii] = sortAry[ii][1];
      }
      var t_Left;
      var LinkWod;
      for (ii = 0; ii < n; ii++) {
        t_Left = sortAry[ii].keyword.slice(0, 1);
        if (t_Left === "あ") {
          LinkWod = "A";
        } else if (t_Left === "い") {
          LinkWod = "A";
        } else if (t_Left === "う") {
          LinkWod = "A";
        } else if (t_Left === "え") {
          LinkWod = "A";
        } else if (t_Left === "お") {
          LinkWod = "A";
        } else if (t_Left === "か") {
          LinkWod = "K";
        } else if (t_Left === "き") {
          LinkWod = "K";
        } else if (t_Left === "く") {
          LinkWod = "K";
        } else if (t_Left === "け") {
          LinkWod = "K";
        } else if (t_Left === "こ") {
          LinkWod = "K";
        } else if (t_Left === "が") {
          LinkWod = "K";
        } else if (t_Left === "ぎ") {
          LinkWod = "K";
        } else if (t_Left === "ぐ") {
          LinkWod = "K";
        } else if (t_Left === "げ") {
          LinkWod = "K";
        } else if (t_Left === "ご") {
          LinkWod = "K";
        } else if (t_Left === "さ") {
          LinkWod = "S";
        } else if (t_Left === "し") {
          LinkWod = "S";
        } else if (t_Left === "す") {
          LinkWod = "S";
        } else if (t_Left === "せ") {
          LinkWod = "S";
        } else if (t_Left === "そ") {
          LinkWod = "S";
        } else if (t_Left === "ざ") {
          LinkWod = "S";
        } else if (t_Left === "じ") {
          LinkWod = "S";
        } else if (t_Left === "ず") {
          LinkWod = "S";
        } else if (t_Left === "ぜ") {
          LinkWod = "S";
        } else if (t_Left === "ぞ") {
          LinkWod = "S";
        } else if (t_Left === "た") {
          LinkWod = "T";
        } else if (t_Left === "ち") {
          LinkWod = "T";
        } else if (t_Left === "つ") {
          LinkWod = "T";
        } else if (t_Left === "て") {
          LinkWod = "T";
        } else if (t_Left === "と") {
          LinkWod = "T";
        } else if (t_Left === "だ") {
          LinkWod = "T";
        } else if (t_Left === "ぢ") {
          LinkWod = "T";
        } else if (t_Left === "づ") {
          LinkWod = "T";
        } else if (t_Left === "で") {
          LinkWod = "T";
        } else if (t_Left === "ど") {
          LinkWod = "T";
        } else if (t_Left === "な") {
          LinkWod = "N";
        } else if (t_Left === "に") {
          LinkWod = "N";
        } else if (t_Left === "ぬ") {
          LinkWod = "N";
        } else if (t_Left === "ね") {
          LinkWod = "N";
        } else if (t_Left === "の") {
          LinkWod = "N";
        } else if (t_Left === "は") {
          LinkWod = "H";
        } else if (t_Left === "ひ") {
          LinkWod = "H";
        } else if (t_Left === "ふ") {
          LinkWod = "H";
        } else if (t_Left === "へ") {
          LinkWod = "H";
        } else if (t_Left === "ほ") {
          LinkWod = "H";
        } else if (t_Left === "ば") {
          LinkWod = "H";
        } else if (t_Left === "び") {
          LinkWod = "H";
        } else if (t_Left === "ぶ") {
          LinkWod = "H";
        } else if (t_Left === "べ") {
          LinkWod = "H";
        } else if (t_Left === "ぼ") {
          LinkWod = "H";
        } else if (t_Left === "ま") {
          LinkWod = "M";
        } else if (t_Left === "み") {
          LinkWod = "M";
        } else if (t_Left === "む") {
          LinkWod = "M";
        } else if (t_Left === "め") {
          LinkWod = "M";
        } else if (t_Left === "も") {
          LinkWod = "M";
        } else if (t_Left === "や") {
          LinkWod = "Y";
        } else if (t_Left === "ゆ") {
          LinkWod = "Y";
        } else if (t_Left === "よ") {
          LinkWod = "Y";
        } else if (t_Left === "ら") {
          LinkWod = "R";
        } else if (t_Left === "り") {
          LinkWod = "R";
        } else if (t_Left === "る") {
          LinkWod = "R";
        } else if (t_Left === "れ") {
          LinkWod = "R";
        } else if (t_Left === "ろ") {
          LinkWod = "R";
        } else if (t_Left === "わ") {
          LinkWod = "W";
        } else if (t_Left === "を") {
          LinkWod = "W";
        } else if (t_Left === "ん") {
          LinkWod = "W";
        }
        $("#list-contents-" + LinkWod).append(
          '<li class="list-wrap"><a href="javascript:void(0)"onclick="open_result(\'' +
            sortAry[ii].no +
            '\',\'list\');" class="list-link list-item list-arrow list-main"><p class="list-text">' +
            sortAry[ii].name +
            "</p></a></li>"
        );
      }
    });
  } else if (url === "select.html") {
    var suf;
    var jsonUrl = getJsonUrl();
    $.ajaxSetup({
      async: false
    });
    $.getJSON(jsonUrl, function(data) {
      var n = data.length;
      var biz = 0;
      for (i = 0; i < n; i++) {
        if (data[i].no == no) {
          //title・description変更
          doctit = "神戸市：事業系ごみの分別区分（" + data[i].name + "）";
          document.title = doctit;
          $("meta[name='description']").attr(
            "content",
            "神戸市内のお店や会社から「" +
              data[i].name +
              "」を捨てる場合の分別区分をご案内します。"
          );
          if (biz === 0) {
            $("#business").append(
              "<b>「" +
                data[i].name +
                "」は、業種によって分別区分が異なります<b>"
            );
            HeadAndShare(url, url_Key, no, suf, gyoshu, doctit);
            biz++;
          }
          suf = data[i].suffix;
          $("#list").append(
            '<li class="list-wrap"><a href="information.html?id=' +
              id +
              "&key=" +
              url_Key +
              "&no=" +
              no +
              "&suffix=" +
              suf +
              '&page=select" class="list-link list-item list-arrow list-main"><p class="list-text">' +
              data[i].business +
              "</p></a></li>"
          );
        }
      }
    });
    if (page === "search") {
      $("#share").after(
        '<button type="button" class="btn-green600_rsd btn-lg btn-block back-list" onclick="javascript:window.history.back(-1);return false;">検索結果にもどる</button>'
      );
    } else if (page === "list") {
      $(':text[name="new_search"]').val("");
      $("#share").after(
        '<button type="button" class="btn-green600_rsd btn-lg btn-block back-list" onclick="javascript:window.history.back(-1);return false;">一覧にもどる</button>'
      );
    } else {
      $("#share").after(
        '<button type="button" class="btn-green600_rsd btn-lg btn-block back-list" onclick="reload(\'index.html\',' +
          id +
          "," +
          thistime +
          "," +
          url_Key +
          "," +
          no +
          "," +
          suf +
          "," +
          page +
          ');">トップにもどる</button>'
      );
    }
  } else if (url === "search.html") {
    var jsonUrl = getJsonUrl();
    $.ajaxSetup({
      async: false
    });
    $.getJSON(jsonUrl, function(data) {
      //Suggest
      data.sort(function(val1, val2) {
        return val1.viewCount < val2.viewCount ? 1 : -1;
      });
      var ii = 0;
      for (i = 0; ii < 5; i++) {
        if (data[i].name.length < 18) {
          if (data[i].suffix === 1) {
            $("#suggest_btn_area").append(
              '<button class="btn btn-green600_rsd suggest_btn " id="suggest_btn' +
                (ii + 1) +
                '" role="button" onclick="open_result(\'' +
                data[i].no +
                "','suggest');\"><span class=\"suggest_btn_text\">" +
                data[i].name +
                "</span></button>"
            );
            ii++;
          }
        }
      }
    });
    suggest_sort();
    setAutoCompleate();
  } else if (url === "gyoshubetsu-select.html") {
    var jsonUrl = getJsonUrl_g();
    var gyoshu = myGetQuery("gyoshu");
    $.ajaxSetup({
      async: false
    });
    $.getJSON(jsonUrl, function(data) {
      var n = data.length;
      var c = 0;
      var o = 0;
      var str;
      var stralt;
      for (i = 0; i < n; i++) {
        if (o < 5) {
          if (data[i].gyoshu == gyoshu) {
            if (c == 0) {
              $("#business").append(
                "<b>「" + data[i].gyoshumei + "」でよく出るごみ<b>"
              );
              //title・description変更
              doctit =
                "神戸市：「" +
                data[i].gyoshumei +
                "」からよく出る事業系ごみ（事業系ごみ分別検索サイト）";
              document.title = doctit;
              $("meta[name='description']").attr(
                "content",
                "神戸市内の「" +
                  data[i].gyoshumei +
                  "」からよく出る事業系ごみ（お店や会社から出すごみ）をまとめました。職場のみなさんでご覧ください。"
              );
              HeadAndShare(url, url_Key, no, suf, gyoshu, doctit);
              if (gyoshu == 1) {
                str =
                  "オフィスでは事務処理に伴うコピー用紙や、従業員の飲食に伴う缶・ビン・ペットボトル、弁当がらなどが多く排出されています。<br />また、販促活動で使用したチラシや、封筒、ダンボールといったコピー用紙以外の紙ごみも見受けられます。<br />これらの紙ごみはリサイクルできる場合が多く、リサイクルすることで可燃ごみの減量に繋がります。";
                stralt = "業種別イメージ（オフィス）";
              } else if (gyoshu == 2) {
                str =
                  "飲食業からは、残飯やコーヒー・茶がらといった生ごみが多く排出されています。<br />また、店内に置かれていた新聞・雑誌類が多いことも特徴的です。<br />生ごみは水気をよく切ることで減量に繋がります。また、新聞・雑誌類はリサイクルできる場合が多く、リサイクルすることで可燃ごみの減量に繋がります。";
                stralt = "業種別イメージ（飲食業）";
              } else if (gyoshu == 3) {
                str =
                  "医療機関・薬局・製薬業では、薬品等を梱包するために使用した空箱（紙箱・ダンボール）や包装紙が多く排出されます。また、事務処理に伴うコピー用紙、来院患者に提供した飲料水の缶・ペットボトルや紙コップ、待合スペースの新聞・雑誌類が多いことも特徴的です。<br />空箱や包装紙、コピー用紙は、新聞・雑誌はリサイクルできる場合が多く、リサイクルすることで可燃ごみの減量に繋がります。<br />なお、感染性廃棄物や、プラスチックごみ等は産業廃棄物として処分してください。";
                stralt = "業種別イメージ（医療機関・薬局・製薬業）";
              } else if (gyoshu == 4) {
                str =
                  "福祉事業・教育機関からは、利用者の飲食に伴う生ごみや缶・ビン・ペットボトル、弁当がらなどが多く排出されています。また、事務処理に伴うコピー用紙や、利用者の使用済おむつなどが多いことも特徴的です。<br />生ごみは水気をよく切ることで減量に繋がります。また、使用済みおむつは汚物を取り除いて出す必要があります。";
                stralt = "業種別イメージ（福祉事業・教育機関）";
              } else if (gyoshu == 5) {
                str =
                  "理容店・美容院からは、カットに伴い発生する髪の毛が多く排出されています。<br />また、カラー剤・パーマ液・スタイリング剤等の入っていた容器（プラスチック製・スプレー缶など）や、店内に置かれていた新聞・雑誌類が多いことも特徴的です。<br />特にスプレー缶は、中身が入った状態では捨てられません。中のガスを抜いたうえで、粗大(不燃)ごみとして処分してください。";
                stralt = "業種別イメージ（理容店・美容院）";
              } else if (gyoshu == 6) {
                str =
                  "販売業・運送業では、梱包用のダンボール・発泡スチロール、事務処理に伴うコピー用紙や、販促活動で使用したカタログやチラシ、封筒・伝票等といった紙ごみが多く排出されています。<br />また、取扱う商品などによって排出されるごみも幅広いことが特徴的でした。<br />多種多様なごみが出る場合、その中でも割合の大きいもの（販売業の場合、ダンボールやコピー用紙といった紙ごみ）をリサイクルなどへ回すことで、排出するごみ量を比較的容易に減らすことができます。";
                stralt = "業種別イメージ（販売業・運送業）";
              } else if (gyoshu == 7) {
                str =
                  "建設業・製造業からは、設計図等にかかるコピー用紙をはじめとした紙ごみが多く排出されています。また、従業員の飲食に伴う弁当がらや茶がらといった生ごみなども含まれています。<br />コピー用紙はリサイクルできる場合が多く、リサイクルすることで可燃ごみの減量に繋がります。<br />なお、工事や製造過程で発生するプラスチック・ゴムくず・繊維くず・がれき類などは産業廃棄物として処分してください。";
                stralt = "業種別イメージ（建設業・製造業）";
              } else if (gyoshu == 8) {
                str =
                  "自動車・オートバイ関連業からは、コピー用紙や伝票、販促活動で使用したカタログや伝票、ダンボールといった紙ごみが多く排出されています。<br />紙ごみやダンボールはリサイクルできる場合が多く、リサイクルすることで可燃ごみの減量に繋がります。<br />なお、タイヤやその他関連部品は産業廃棄物として処分してください。";
                stralt = "業種別イメージ（自動車・オートバイ関連業）";
              } else if (gyoshu == 9) {
                str =
                  "農林・園芸業からは、土などを入れていた空き袋、ビニールポットやプラスチックカップ、花がらや茎といったものが排出されています。また、コピー用紙やダンボールといった紙ごみも見受けられます。<br />紙ごみはリサイクルできる場合が多く、リサイクルすることで可燃ごみの減量に繋がります。";
                stralt = "業種別イメージ（農林・園芸業）";
              }
              $(".gyoshubetsu-select-icon").append(
                '<img src="img/img-gyoshu-info-0' +
                  gyoshu +
                  '.png" alt="' +
                  stralt +
                  '" class="gyoshubetsu-select-icon-img"></img>'
              );
              $("#description").append(str);
              c++;
            }
            $("#list").append(
              '<li class="list-wrap"><a href="javascript:void(0)"onclick="open_result(\'' +
                data[i].no +
                "','gyoshubetsu-select'," +
                data[i].suffix +
                ');" class="list-link list-item list-arrow list-main"><p class="list-lank">' +
                (o + 1) +
                '<p class="list-text">' +
                data[i].name +
                "</p></a></li>"
            );
            o++;
          }
        }
      }
      if (o < 5) {
        $("#gyoshu-list-next").remove();
      }
    });
  }
});
function turnPage(url, action, event, page) {
  var id = myGetQuery("id");
  var lasttime = getTime_str();
  var hs = url.lastIndexOf("?");
  //url内に?が含まれている場合はlasttimeの後に配置
  if (hs != -1) {
    url =
      url.slice(0, hs) +
      "?id=" +
      id +
      "&lasttime=" +
      lasttime +
      "&" +
      url.slice(hs + 1);
  } else {
    url = url + "?id=" + id + "&lasttime=" + lasttime;
  }
  if (page) {
    url = url + "&page=" + page;
  }
  //url内に#が含まれている場合は、直後の?or&までを文末に配置
  var sh = url.lastIndexOf("#");
  if (sh > 1) {
    var qu = url.lastIndexOf("?");
    var an = url.lastIndexOf("&");
    var cp;
    if (qu < an) {
      cp = qu;
    } else {
      cp = an;
    }
    if (sh < cp) {
      var sh_str = url.slice(sh, cp);
      url = url.replace(sh_str, "");
      url = url + sh_str;
    }
  }
  var ls = variable("ls");
  var user = localStorage.getItem(ls);
  user = user.slice(0, 16);
  actionLog(action, event);
  window.location.href = url;
}
function myGetQuery(myKeyWord) {
  myKeyWord = "&" + myKeyWord + "=";
  myValue = null;
  myStr = location.search;
  myLen = myStr.length;
  myStr = "&" + myStr.substring(1, myLen) + "&";
  myOfst = myStr.indexOf(myKeyWord);
  if (myOfst != -1) {
    myStart = myOfst + myKeyWord.length;
    myEnd = myStr.indexOf("&", myStart);
    myValue = myStr.substring(myStart, myEnd);
    myValue = decodeURIComponent(myValue);
  }
  return myValue;
}
function open_result(no, page, suffix) {
  var wod_Key = $(':text[name="new_search"]').val();
  var enc_Key = encodeURIComponent(wod_Key);
  var id = myGetQuery("id");
  var thistime = getTime_str();
  var suf;
  var res_Url;
  var jsonUrl = getJsonUrl();
  if (suffix) {
    res_Url =
      "information.html?id=" +
      id +
      "&lasttime=" +
      thistime +
      "&key=" +
      enc_Key +
      "&no=" +
      no +
      "&suffix=" +
      suffix +
      "&page=" +
      page;
  } else {
    $.ajaxSetup({
      async: false
    });
    $.getJSON(jsonUrl, function(data) {
      var n = data.length;
      for (i = 0; i < n; i++) {
        if (data[i].no == no) {
          suf = data[i].suffix;
        }
      }
    });
    if (suf === 1) {
      res_Url =
        "information.html?id=" +
        id +
        "&lasttime=" +
        thistime +
        "&key=" +
        enc_Key +
        "&no=" +
        no +
        "&suffix=" +
        suf +
        "&page=" +
        page;
    } else {
      res_Url =
        "select.html?id=" +
        id +
        "&lasttime=" +
        thistime +
        "&key=" +
        enc_Key +
        "&no=" +
        no +
        "&page=" +
        page;
    }
    if (page === "suggest") {
      actionLog("event", "suggest(no:" + no + ")"); //log
    }
  }
  window.location.href = res_Url;
}
function DeviceName() {
  var _ua = (function(u) {
    var mobile = {
      0:
        (u.indexOf("windows") != -1 && u.indexOf("phone") != -1) ||
        u.indexOf("iphone") != -1 ||
        u.indexOf("ipod") != -1 ||
        (u.indexOf("android") != -1 && u.indexOf("mobile") != -1) ||
        (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1) ||
        u.indexOf("blackberry") != -1,
      iPhone: u.indexOf("iphone") != -1,
      Android: u.indexOf("android") != -1 && u.indexOf("mobile") != -1
    };
    var tablet =
      (u.indexOf("windows") != -1 && u.indexOf("touch") != -1) ||
      u.indexOf("ipad") != -1 ||
      (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) ||
      (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) ||
      u.indexOf("kindle") != -1 ||
      u.indexOf("silk") != -1 ||
      u.indexOf("playbook") != -1;
    var pc = !mobile[0] && !tablet;
    return {
      Mobile: mobile,
      Tablet: tablet,
      PC: pc
    };
  })(window.navigator.userAgent.toLowerCase());
  var searchDevice = (function(ua) {
    if (ua.Mobile[0]) {
      return "1";
    } else if (ua.Tablet) {
      return "2";
    } else {
      return "3";
    }
  })(_ua);
  return searchDevice;
}
function find_suf(no) {
  var suf;
  var jsonUrl = getJsonUrl();
  $.ajaxSetup({
    async: false
  });
  $.getJSON(jsonUrl, function(data) {
    var n = data.length;
    for (i = 0; i < n; i++) {
      if (data[i].no == no) {
        suf = data[i].suffix;
      }
    }
  });
  return suf;
}
function reload(url, id, thistime, url_Key, no, suf, page, gyoshu) {
  var redirect_url;
  if (url === "index.html") {
    redirect_url = url + "?id=" + id + "&lasttime=" + thistime;
  } else if (url === "search.html") {
    redirect_url = url + "?id=" + id + "&lasttime=" + thistime;
  } else if (url === "result.html") {
    redirect_url =
      url + "?id=" + id + "&lasttime=" + thistime + "&key=" + url_Key;
  } else if (url === "list.html") {
    redirect_url = url + "?id=" + id + "&lasttime=" + thistime;
  } else if (url === "select.html") {
    redirect_url =
      url +
      "?id=" +
      id +
      "&lasttime=" +
      thistime +
      "&key=" +
      url_Key +
      "&no=" +
      no +
      "&page=" +
      page;
  } else if (url === "information.html") {
    redirect_url =
      url +
      "?id=" +
      id +
      "&lasttime=" +
      thistime +
      "&key=" +
      url_Key +
      "&no=" +
      no +
      "&suffix=" +
      suf +
      "&page=" +
      page;
  } else if (url === "gyoshubetsu.html") {
    redirect_url = url + "?id=" + id + "&lasttime=" + thistime;
  } else if (url === "gyoshubetsu-select.html") {
    redirect_url =
      url + "?id=" + id + "&lasttime=" + thistime + "&gyoshu=" + gyoshu;
  } else {
    redirect_url = "index.html?id=" + id + "&lasttime=" + thistime;
  }
  if (document.referrer) {
    var referrer = "&referrer=" + encodeURIComponent(document.referrer);
    redirect_url = redirect_url + referrer;
  }
  window.location.href = redirect_url;
}
function getTime_str() {
  var now = new Date();
  return (
    now.getFullYear() +
    ("0" + (now.getMonth() + 1)).slice(-2) +
    ("0" + now.getDate()).slice(-2) +
    ("0" + now.getHours()).slice(-2) +
    ("0" + now.getMinutes()).slice(-2) +
    ("0" + now.getSeconds()).slice(-2)
  );
}
function modal_inquirie() {
  var id = myGetQuery("id");
  var ls = variable("ls");
  var user = localStorage.getItem(ls);
  var url = location.href;
  url = url.match(".+/(.+?)([?#;].*)?$")[1];
  if (url === "result.html") {
    actionLog("event", "result_inquiry");
  } else if (url === "list.html") {
    actionLog("event", "list_inquiry");
  } else if (url === "information.html") {
    actionLog("event", "information_inquiry");
  }
  $("#modal-inquirie").modal();
}
function modal_exception(no) {
  var id = myGetQuery("id");
  var ls = variable("ls");
  var user = localStorage.getItem(ls);
  var url = location.href;
  actionLog("event", "information_info(No." + no + "limitComment)");
  $("#modal-exception").modal();
}
function modal_share() {
  var id = myGetQuery("id");
  var ls = variable("ls");
  var user = localStorage.getItem(ls);
  var url = location.href;
  url = url.match(".+/(.+?)([?#;].*)?$")[1];
  if (url === "index.html") {
    actionLog("event", "share_index");
  } else if (url === "information.html") {
    var no = myGetQuery("no");
    actionLog("event", "share_information(No." + no + ")");
  }
  $("#modal-share").modal();
}
function getDir(place, n) {
  return place.pathname.replace(
    new RegExp("(?:\\/+[^\\/]*){0," + ((n || 0) + 1) + "}$"),
    "/"
  );
}
function getJsonUrl() {
  var jsonLoc = window.location;
  var jsonOri = jsonLoc.origin;
  return jsonOri + getDir(jsonLoc) + "json/data.json";
}
function getJsonUrl_g() {
  var jsonLoc = window.location;
  var jsonOri = jsonLoc.origin;
  return jsonOri + getDir(jsonLoc) + "json/gyoshubetsu.json";
}
//検索文字列形式：全角かな＋半角英数 に変換
function transliteration(str) {
  str = toKanaZenkaku(str); //半角カナ→全角カナ_参考:https://gist.github.com/shinout/1413026#file-to_kana_zenkaku-js-L102
  str = KatakanaToHiragana(str); //カタカナ→ひらがな_参考:http://qiita.com/mimoe/items/855c112625d39b066c9a
  str = toEisuHankaku(str); //全角英数→半角英数_参考_https://jquery.nj-clucker.com/change-double-byte-to-half-width/
  str = str.toLowerCase(); //A→a_参考:http://qiita.com/jazzsasori/items/cc6ced482bb8f4d6a319
  str = str.replace(/-/g, ""); //半角長音消去
  str = str.replace(/ー/g, ""); //全角長音消去
  return str;
}
function toKanaZenkaku(str) {
  var ret = [];
  var m = {
    0xff61: 0x300c,
    0xff62: 0x300d,
    0xff63: 0x3002,
    0xff64: 0x3001,
    0xff65: 0x30fb, // 。「」、・
    0xff67: 0x30a1,
    0xff68: 0x30a3,
    0xff69: 0x30a5,
    0xff6a: 0x30a7,
    0xff6b: 0x30a9, // ァ
    0xff6c: 0x30e3,
    0xff6d: 0x30e5,
    0xff6e: 0x30e7,
    0xff6f: 0x30c3,
    0xff70: 0x30fc, // ャュョッー
    0xff71: 0x30a2,
    0xff72: 0x30a4,
    0xff73: 0x30a6,
    0xff74: 0x30a8,
    0xff75: 0x30aa, // ア
    0xff76: 0x30ab,
    0xff77: 0x30ad,
    0xff78: 0x30af,
    0xff79: 0x30b1,
    0xff7a: 0x30b3, // カ
    0xff7b: 0x30b5,
    0xff7c: 0x30b7,
    0xff7d: 0x30b9,
    0xff7e: 0x30bb,
    0xff7f: 0x30bd, // サ
    0xff80: 0x30bf,
    0xff81: 0x30c1,
    0xff82: 0x30c4,
    0xff83: 0x30c6,
    0xff84: 0x30c8, // タ
    0xff85: 0x30ca,
    0xff86: 0x30cb,
    0xff87: 0x30cc,
    0xff88: 0x30cd,
    0xff89: 0x30ce, // ナ
    0xff8a: 0x30cf,
    0xff8b: 0x30d2,
    0xff8c: 0x30d5,
    0xff8d: 0x30d8,
    0xff8e: 0x30db, // ハ
    0xff8f: 0x30de,
    0xff90: 0x30df,
    0xff91: 0x30e0,
    0xff92: 0x30e1,
    0xff93: 0x30e2, // マ
    0xff94: 0x30e4,
    0xff95: 0x30e6,
    0xff96: 0x30e8, // ヤ
    0xff97: 0x30e9,
    0xff98: 0x30ea,
    0xff99: 0x30eb,
    0xff9a: 0x30ec,
    0xff9b: 0x30ed, // ラ
    0xff9c: 0x30ef,
    0xff66: 0x30f2,
    0xff9d: 0x30f3, // ワヲン
    0xff70: 0x30fc, // ー
    0x0030: 0x3000, // スペース
    0xff9e: 0x309b,
    0xff9f: 0x309c // 濁点、半濁点
  };
  var DAKUTEN = 0xff9e;
  var HANDAKUTEN = 0xff9f;
  // 濁点を含む文字セット
  var d = {
    0xff76: 0x30ac,
    0xff77: 0x30ae,
    0xff78: 0x30b0,
    0xff79: 0x30b2,
    0xff7a: 0x30b4, // カ
    0xff7b: 0x30b6,
    0xff7c: 0x30b8,
    0xff7d: 0x30ba,
    0xff7e: 0x30bc,
    0xff7f: 0x30be, // サ
    0xff80: 0x30c0,
    0xff81: 0x30c2,
    0xff82: 0x30c5,
    0xff83: 0x30c7,
    0xff84: 0x30c9, // タ
    0xff8a: 0x30d0,
    0xff8b: 0x30d3,
    0xff8c: 0x30d6,
    0xff8d: 0x30d9,
    0xff8e: 0x30dc // ハ
  };
  // 半濁点を含む文字セット
  var h = {
    0xff8a: 0x30d1,
    0xff8b: 0x30d4,
    0xff8c: 0x30d7,
    0xff8d: 0x30da,
    0xff8e: 0x30dd // ハ
  };
  var waiting = false;
  var buff, c, preD;
  for (var i = 0, l = str.length; i < l; i++) {
    c = str.charCodeAt(i);
    preD = d[c];
    if (!waiting) {
      if (!preD) {
        ret.push(m[c] || c);
      } else {
        buff = c;
        waiting = true;
      }
    } else {
      if (preD) {
        ret.push(m[buff]);
        buff = c;
        waiting = true;
      } else {
        switch (c) {
          case DAKUTEN:
            ret.push(d[buff] || c[buff] || buff);
            break;
          case HANDAKUTEN:
            ret.push(h[buff] || c[buff] || buff);
            break;
          default:
            ret.push(m[buff]);
            ret.push(m[c] || c);
            break;
        }
        waiting = false;
      }
    }
  }
  return String.fromCharCode.apply(null, ret);
}
function toEisuHankaku(str) {
  var halfVal = str.replace(/[！-～]/g, function(tmpStr) {
    return String.fromCharCode(tmpStr.charCodeAt(0) - 0xfee0); // 文字コードをシフト
  });
  // 文字コードシフトで対応できない文字の変換
  halfVal
    .replace(/”/g, '"')
    .replace(/’/g, "'")
    .replace(/‘/g, "`")
    .replace(/￥/g, "\\")
    .replace(/　/g, " ")
    .replace(/〜/g, "~")
    .replace(/ー/g, "-");
  return halfVal;
}
function KatakanaToHiragana(str) {
  return str.replace(/[\u30a1-\u30f6]/g, function(match) {
    var chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}
function actionLog(action, event) {
  var gasurl = variable("gasurl");
  var g = "a";
  var id = myGetQuery("id");
  var ls = variable("ls");
  var user = localStorage.getItem(ls);
  var lHr = window.location.href;
  var lPa = lHr.match(".+/(.+?)([?#;].*)?$")[1];
  var lSe = window.location.search;
  lHr = encodeURIComponent(lHr); //post先で取り込む際に'&'があるとそこまでと判定されるため※post先で再変換
  lSe = encodeURIComponent(lSe); //post先で取り込む際に'&'があるとそこまでと判定されるため※post先で再変換
  var lHa = window.location.hash;
  var dTi = encodeURIComponent(window.document.title);
  var dRe = myGetQuery("referrer");
  if (dRe === null) {
    dRe = window.document.referrer;
  }
  var dev = DeviceName();
  var nAc = navigator.appCodeName;
  var nAn = navigator.appName;
  var nAv = navigator.appVersion;
  var nCe = navigator.cookieEnabled;
  var nPl = navigator.platform;
  var nUa = navigator.userAgent;
  var nCp = navigator.cpuClass;
  // 最優先の言語だけ取得
  var uLa =
    (window.navigator.languages && window.navigator.languages[0]) ||
    window.navigator.language ||
    window.navigator.userLanguage ||
    window.navigator.browserLanguage;
  // クライアント側で受け付けている言語リストを取得
  var cLa = window.navigator.languages || [
    window.navigator.language ||
      window.navigator.userLanguage ||
      window.navigator.browserLanguage
  ];
  var sWi = screen.width;
  var sHe = screen.height;
  var wAv = screen.availWidth;
  var sAl = screen.availHeight;
  var sCl = screen.colorDepth;
  var sPi = screen.pixelDepth;
  if (event === "none") {
    event = "";
  }
  var postdata =
    "g=" +
    g +
    "&uId=" +
    id +
    "&uNo=" +
    user +
    "&lHr=" +
    lHr +
    "&lPa=" +
    lPa +
    "&lSe=" +
    lSe +
    "&lHa=" +
    lHa +
    "&dTi=" +
    dTi +
    "&dRe=" +
    dRe +
    "&dev=" +
    dev +
    "&nAc=" +
    nAc +
    "&nAn=" +
    nAn +
    "&nAv=" +
    nAv +
    "&nCe=" +
    nCe +
    "&nPl=" +
    nPl +
    "&nUa=" +
    nUa +
    "&nCp=" +
    nCp +
    "&uLa=" +
    uLa +
    "&cLa=" +
    cLa +
    "&sWi=" +
    sWi +
    "&sHe=" +
    sHe +
    "&wAv=" +
    wAv +
    "&sAl=" +
    sAl +
    "&sCl=" +
    sCl +
    "&sPi=" +
    sPi +
    "&eve=" +
    event +
    "&action=" +
    action +
    "&event=" +
    event;
  $.ajax({
    url: gasurl,
    type: "POST",
    data: postdata,
    dataType: "text"
  });
}
function suggest_sort() {
  var w =
    310 +
    $("button#suggest_btn1.btn.btn-green600_rsd.suggest_btn").outerWidth(true) +
    $("button#suggest_btn2.btn.btn-green600_rsd.suggest_btn").outerWidth(true) +
    $("button#suggest_btn3.btn.btn-green600_rsd.suggest_btn").outerWidth(true) +
    $("button#suggest_btn4.btn.btn-green600_rsd.suggest_btn").outerWidth(true) +
    $("button#suggest_btn5.btn.btn-green600_rsd.suggest_btn").outerWidth(true);
  if (w > $(window).width()) {
    $("#suggest_title_wide").remove();
    $("#suggest_title_narrow").remove();
    $("#suggest_area").prepend(
      '<div class="suggest_title" id="suggest_title_narrow">よく閲覧されている品目</div>'
    );
  } else {
    $("#suggest_title_wide").remove();
    $("#suggest_title_narrow").remove();
    $("#suggest_btn_area").prepend(
      '<span class="suggest_title" id="suggest_title_wide">よく閲覧されている品目</span>'
    );
  }
}
//業種別リストページ「続きをみる」クリック時の処理
function gyoshu_list_next() {
  $("#gyoshu-list-next").remove();
  var jsonUrl = getJsonUrl_g();
  var gyoshu = myGetQuery("gyoshu");
  $.ajaxSetup({
    async: false
  });
  $.getJSON(jsonUrl, function(data) {
    var n = data.length;
    var o = 0;
    for (i = 0; i < n; i++) {
      if (data[i].gyoshu == gyoshu) {
        if (o > 4) {
          $("#list").append(
            '<li class="list-wrap"><a href="javascript:void(0)"onclick="open_result(\'' +
              data[i].no +
              '\',\'gyoshubetsu-select\');" class="list-link list-item list-arrow list-main"><p class="list-lank">' +
              (o + 1) +
              '<p class="list-text">' +
              data[i].name +
              "</p></a></li>"
          );
        }
        o++;
      }
    }
  });
  actionLog("event", "gyoshu_list_next");
}
//現在が8月第一土曜日までの一週間かどうかの判定
function aug_hantei() {
  //現在の年の8月第一土曜日を特定
  var aug_bl;
  var today = new Date();
  var y = today.getFullYear();
  var d_sta;
  var d_end;
  for (var d = 1; d < 8; d++) {
    d_end = new Date(y + "/8/" + d);
    if (d_end.getDay(d_end) === 6) {
      d_sta = new Date(y + "/8/" + d);
      d_sta.setDate(d_sta.getDate() - 6);
      break;
    }
  }
  if (today >= d_sta && today <= d_end) {
    aug_bl = true;
  } else {
    aug_bl = false;
  }
  return aug_bl;
}
//canonicalタグ・「このページを共有」モーダル内のセット
function HeadAndShare(url, url_Key, no, suf, gyoshu, doctit) {
  var sht; //share title
  var shu =
    "http://www.city.kobe.lg.jp/business/regulation/environment/enterprise/bizwastesearch/"; //share url
  if (url === "index.html") {
    sht = "神戸市：事業系ごみ分別検索サイト";
    shu = shu + url;
  } else if (url === "search.html") {
    sht = "神戸市：キーワードでさがす（事業系ごみ分別検索サイト）";
    shu = shu + url;
  } else if (url === "result.html") {
    sht = "神戸市：「" + url_Key + "」の検索結果（事業系ごみ分別検索サイト）";
    shu = shu + url + "?key=" + url_Key;
  } else if (url === "list.html") {
    sht = "神戸市：リストでさがす（事業系ごみ分別検索サイト）";
    shu = shu + url;
  } else if (url === "gyoshubetsu.html") {
    sht = "神戸市：業種でさがす（事業系ごみ分別検索サイト）";
    shu = shu + url;
  } else if (url === "information.html") {
    sht = doctit;
    shu = shu + url + "?no=" + no + "&suffix=" + suf;
  } else if (url === "select.html") {
    sht = doctit;
    shu = shu + url + "?no=" + no;
  } else if (url === "gyoshubetsu-select.html") {
    sht = doctit;
    shu = shu + url + "?gyoshu=" + gyoshu;
  }
  var can = '<link rel="canonical" href=' + shu + ">";
  $("head link:last").after(can);
  //modal
  $(".share_modal_url").append('<a href="' + shu + '">' + shu + "</a>");
  //urlエンコード
  shu = shu.replace("&", "%26");
  $("#share_ml").append(
    '<a href="mailto:?subject=' +
      sht +
      "&body=" +
      shu +
      '" title="メールで共有"><img src="img/icon_mail.png" class="snsIcon"></a>'
  );
  $("#share_tw").append(
    '<a href="http://twitter.com/share?url=' +
      shu +
      "&text=" +
      sht +
      '" target="_blank" title="Twitterで共有"><img src="img/icon_twitter.png" class="snsIcon"></a>'
  );
  $("#share_fb").append(
    '<a href="http://www.facebook.com/share.php?u=' +
      shu +
      '" target="_blank" title="Facebookで共有"><img src="img/icon_facebook.png" class="snsIcon"></a>'
  );
  $("#share_ln").append(
    '<a href="https://timeline.line.me/social-plugin/share?url=' +
      shu +
      '" target="_blank" title="LINEで共有"><img src="img/icon_line.png" class="snsIcon"></a>'
  );
}
function setAutoCompleate() {
  var jsonUrl = getJsonUrl();
  $.ajaxSetup({
    async: false
  });
  $.getJSON(jsonUrl, function(data) {
    var sortJson; //ソート用の配列
    var n = data.length; //JSONデータ数
    var sortAry = new Array(n);
    var ii = 0;
    for (i = 0; i < n; i++) {
      if (data[i].suffix === 1) {
        sortAry[ii] = [data[i].keyword, data[i]]; //ソート用のキー配列（sortAry="keywordのみ",オブジェクト全体 となっている)
        ii++;
      }
    }
    n = ii;
    sortAry = $.grep(sortAry, function(e) {
      return e;
    });
    sortAry.sort(); //ソート
    // ソート結果の必要部分だけを、再度配列へ格納（オブジェクトのみを残す）
    for (ii = 0; ii < n; ii++) {
      sortAry[ii] = sortAry[ii][1];
    }
    jQuery("#new_search").autocomplete({
      source: function(request, response) {
        var suggests = [];
        var par_Key = transliteration(request.term);
        par_Key = par_Key.replace(/　/g, " ");
        par_Key = par_Key.replace(/-/g, ""); //toEisuHankakuで全角→半角に変換済なので半角のみを処理
        var sep_Key = par_Key.split(" ");
        var regexp = new RegExp("(" + sep_Key + ")");
        var db_Wod;
        var sl;
        var stnam;
        var stkey;
        var maxi = 1;
        for (ii = 0; ii < n; ii++) {
          sl = par_Key.length;
          stnam = transliteration(sortAry[ii].name);
          stkey = transliteration(ackey(sortAry[ii].keyword));
          if (
            stnam.substr(0, sl) == sep_Key ||
            stkey.substr(0, sl) == sep_Key
          ) {
            suggests.push(sortAry[ii].name);
            maxi++;
            // モバイルの場合は表示候補数を変える
            if (DeviceName() === "1") {
              if (maxi > 5) {
                break;
              }
            }
            else{           
              if (maxi > 7) {
                break;
              }
            }
          }
        }
        response(suggests);
      },
      // autoFocus: true,
      delay: 50
    });
  });
}
function ackey(keyword) {
  var ind = keyword.indexOf("・");
  keyword = keyword.substr(0, ind);
  return keyword;
}
