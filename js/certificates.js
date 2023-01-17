$(document).ready(async () => {
  $("#certificates .slides").hiSlide();

  // <<--- Change Picture function --->>
  function pictChange(i) {
    let title = $("#certificates .contain .item-" + i).data("title");
    let year = $("#certificates .contain .item-" + i).data("year");

    $("#certificates .preview .card").css({
      "background-image": "url(img/certificates/" + i + ".png)",
    });

    $("#certificates .preview h3 ,#certificates .preview .year").toggleClass(
      "emerge"
    );
    setTimeout(() => {
      $("#certificates .preview h3, #certificates .preview .year").toggleClass(
        "wipe"
      );

      $("#certificates .preview h3").text(title);
      $("#certificates .preview .year").text(year);
    }, 500);

    setTimeout(() => {
      $("#certificates .preview h3, #certificates .preview .year").toggleClass(
        "emerge"
      );

      $("#certificates .preview h3, #certificates .preview .year").toggleClass(
        "wipe"
      );
    }, 700);
  }

  // <<--- Sertificate clicked handler --->>
  $("#certificates .contain .card").click((e) => {
    // console.log("ok ==>> ", e);
    $("#certificates .preview").toggleClass("view");

    let index = $("#certificates .contain").children();

    let i = e.target.attributes.index.value;

    $("#certificates .preview .prev").click(() => {
      if (i == 0) i = index.length;
      else i--;

      pictChange(i);
    });
    $("#certificates .preview .next").click(() => {
      if (i == index.length) i = 1;
      else i++;

      pictChange(i);
    });

    pictChange(i);
  });

  // <<--- close Picture handler --->>
  $("#certificates .close").click(() => {
    $("#certificates .preview").toggleClass("view");
  });
});
