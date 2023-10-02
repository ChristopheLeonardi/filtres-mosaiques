/* Alter Select box to style them */
function customSelect() {
    var x, i, j, l, ll, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");

    l = x.length;

    const ajustement = { "top": 40, "width": 20 }

    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];

        ll = selElmnt.length;
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("button");
        a.setAttribute("class", "select-selected");
        a.setAttribute("value", selElmnt.options[selElmnt.selectedIndex].value);
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");



        for (j = 0; j < ll; j++) {
            /* For each option in the original select element,
            create a new DIV that will act as an option item: */
            c = document.createElement("button");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.setAttribute("value", selElmnt.options[j].value)
            c.addEventListener("click", function(e) {

                /* When an item is clicked, update the original select box,
                and the selected item: */
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;

                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        h.value = this.value
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */

            e.stopPropagation();
            closeAllSelect(this);

            // change target for another projects
            let selectName = $(this).parents()[0].childNodes[0].textContent.replace(/\s+:\s+|\s+/, "").replace(/[!^\W_]/gm, "")
            let value = this.value
            let selectBox = $(`select[name="${selectName}"]`)
            $(selectBox).val(value).change()

            var customOptions = this.nextSibling

            customOptions.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");

            // Récupération de la position du bouton
            var buttonLeftPosition = $(this).offset().left
            var buttonTopPosition = $(this).offset().top - $(window).scrollTop()


            // Positionnement de la custom select box
            $(customOptions).css('position', 'fixed')
            $(customOptions).css('left', buttonLeftPosition)
            $(customOptions).css('top', `${buttonTopPosition + ajustement.top}px`)
            $(customOptions).css('width', `${$(this).outerWidth() + ajustement.width}px`)

        });
        $(window).scroll(function(e) {

            Array.from($(".select-selected")).forEach(item => {
                $(item).next().css('top', `${$(item).offset().top - $(window).scrollTop() + ajustement.top}px`)
            })

        })
        $(window).resize(function(e) {

            Array.from($(".select-selected")).forEach(item => {

                $(item).next().css('left', `${$(item).offset().left}px`)
                $(item).next().css('top', `${$(item).offset().top - $(window).scrollTop() + ajustement.top}px`)
            })
        })
    }

    function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");

            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
}