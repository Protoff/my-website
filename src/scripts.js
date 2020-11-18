


document.addEventListener("DOMContentLoaded", () => {
  new SymbolsAnimate(".header .button");

  offsetElemsToShow('section.portfolio .item')

  document.addEventListener("click", (e) => {
    if (e.target.getAttribute("href") === "#modal") {
      e.preventDefault();
      modal.classList.add("modal-show-animation");
    }
    if (
      e.target.classList.contains("modal-close") ||
      e.target.classList.contains("modal-overlay")
    ) {
      modalClose();
    }
  });

  function modalClose() {
    if (
      modal.classList.contains("modal-close-animation") ||
      modal.classList.contains("modal-show-animation")
    ) {
      modal.classList.remove("modal-show-animation");
      modal.classList.add("modal-close-animation");
      setTimeout(() => {
        modal.classList.remove("modal-close-animation");
      }, 1000);
    }
  }

  modalForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputs = this.querySelectorAll(".input");
    const vals = [...inputs].map((input) => {
      if (input.value.trim() == 0) {
        this[input.name].style.border = "1px solid red";
        return false;
      } else {
        this[input.name].style.border = "1px solid #02de15";
        return true;
      }
    });

    if (!vals.includes(false)) {
      // создаю объект данных формы
      var elems = this.elements;
      var params = [];
      for (var i = 0; i < elems.length; i++) {
        elType = elems[i].type;
        elName = elems[i].name;
        if (elName) {
          params.push(elems[i].name + "=" + elems[i].value);
        }
      }
      // отправляю
      fetch("./post-server.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.join("&"),
      })
        .then((res) => {
          this.reset();
          if (res.status === 200) {
            modal.querySelector(".content").innerHTML = `
          <h4 class="h4-title">Сообщение успешно отправлено и я скоро с Вами свяжусь.<br>Спасибо!</h4>`;
          } else {
            modal.querySelector(".content").innerHTML = `
          <h4 class="h4-title">Что-то пошло не так!<br>Пожалуйста, попробуйте позже, или напишите мне иным способом - контакты внизу страницы.<br>Спасибо!</h4>`;
          }
          setTimeout(() => {
            modalClose();
          }, 10000);
        })
        .catch((error) => {
          console.error("Ошибка: ", error);
        });
    }
  });
});

class SymbolsAnimate {
  constructor(el) {
    this.el = el;
    this.animateStr();
  }
  animateStr() {
    //const el = document.querySelector('#footer .item[data-id=footerMail] .link')
    const el = document.querySelector(this.el);
    const elArr = el.textContent.split("");

    const newStr = elArr
      .map((item) => {
        return `<span>${item}</span>`;
      })
      .join("");

    el.innerHTML = newStr;

    this.animateSymbol();
  }

  animateSymbol() {
    setInterval(() => {
      this.addClassAnima();
    }, 300);
  }

  addClassAnima() {
    const els = document.querySelectorAll(this.el + " span");
    const randNum = this.randomInteger(0, els.length - 1);
    //const els = document.querySelectorAll('#footer .item[data-id=footerMail] .link span')
    if (els[randNum].classList.contains("symbols-animation")) {
      this.addClassAnima();
      return;
    }
    els[randNum].classList.add("symbols-animation");
    setTimeout(() => {
      els[randNum].classList.remove("symbols-animation");
    }, 2000);
  }

  randomInteger(min, max) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
}

function offsetElemsToShow(elems) {
  const elemsToShow = document.querySelectorAll(elems);
  const offsetBottom = 200;

  elemsToShow.forEach( (elem, index) => {
    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.clientHeight;
      const coords = elem.getBoundingClientRect();
      const topVisible = coords.top + offsetBottom > 0 && coords.top + offsetBottom < windowHeight;
      const bottomVisible = coords.bottom - offsetBottom < windowHeight && coords.bottom - offsetBottom > 0;

      const image = elem.querySelector('.elem-offset')

      if (topVisible || bottomVisible) {
        setTimeout(() => {
          image.classList.add('image-show');
        }, index * 200);
      } else {
        image.classList.remove('image-show');
      }
    });
  })
}
