
$(document).ready(function () {
    let windowWidth = $(window).width();
    if (windowWidth <= 992) {
        // 📱 **모바일 이벤트 (클릭)**
        $(".btn-nav-remove").click(closeNav);
        $(".btn-nav-open").click(openNav);
    }
    else {
        // 💻 **PC 이벤트 (클릭)**

    }

    // 모바일 메뉴 열기
    function openNav() {
        $(".nav-wrap").fadeIn(200, function () {
            setTimeout(() => {
                $(".nav").animate({ left: "0px" }, 300);
            }, 100);
        });
    }

    // 모바일 메뉴 닫기
    function closeNav() {
        $(".nav").animate({ left: "-50%" }, 300, function () {
            $(".nav-wrap").fadeOut(200);
        });
        $(".nav-side").removeClass('show');
    }

    // 모바일 메뉴 사이드바 열기/닫기
    function toggleSideNav(section) {
        if (section) {
            $(".nav-side").addClass("show");
            $(".nav-content").removeClass("active").hide();
            $("#" + section).addClass("active").show();
            checkRecentActive();
        } else {
            closeSideNav();
        }
    }

    // 모바일
    function closeSideNav() {
        $(".nav-side").removeClass("show");
        $(".nav-content").removeClass("active").hide();

        // 내부 컨텐츠
        $(".btn-recent-edit").removeClass("show");
        $(".recent-edit").removeClass("show");
        $(".nav-side-top .check-group").removeClass("show");
        $(".history-list > li > .check-group").removeClass("show");
    }

    $(".btn-nav-open").click(openNav);
    $(".btn-nav-remove").click(closeNav);
    $(".btn-sidenav-remove").click(closeSideNav);

    $(".nav-item").click(function (e) {
        e.preventDefault();
        let section = $(this).data("target");
        toggleSideNav(section);
    });

    function checkRecentActive() {
        if ($('#recent').hasClass('active')) {
            $('.btn-recent-edit').show();
        } else {
            $('.btn-recent-edit').hide();
            $(".recent-edit").removeClass("show");
            $(".nav-side-top .check-group").removeClass("show");
            $(".history-list > li > .check-group").removeClass("show");
        }
    }

    $(".nav-content").on('classChange', function () {
        checkRecentActive();
    });

    $(".btn-recent-edit").click(function () {
        $(this).hide();
        $(".btn-sidenav-remove").hide();
        $(".recent-edit").addClass("show");
        $(".nav-side-top .check-group").addClass("show");
        $(".history-list > li > .check-group").addClass("show");
    });

    $(".btn-recent-complete").click(function () {
        $(".btn-sidenav-remove").addClass("show").show();
        $(".btn-recent-edit").addClass("show").show();
        $(".recent-edit").removeClass("show");
        $(".nav-side-top .check-group").removeClass("show");
        $(".history-list > li > .check-group").removeClass("show");
    });

    $("#checkAll").change(function () {
        let isChecked = $(this).prop("checked");
        $(".item-check").prop("checked", isChecked);
        updateSelectedCount();
    });

    $(".item-check").change(updateSelectedCount);

    function updateSelectedCount() {
        let count = $(".item-check:checked").length;
        $(".nav-side-top .check-group label span").text(count);
    }

    $(".btn-recent-delete").click(function () {
        $(".item-check:checked").closest("li").remove();
        updateSelectedCount();
    });

    $(".btn-nav-reduction").click(function () {
        $(".lnb").toggleClass("active");
    });

    function openOptionMenu(event) {
        event.stopPropagation(); // 이벤트 버블링 방지
        $(".item-option").removeClass("active"); // 다른 열린 옵션 닫기
        $(this).siblings(".item-option").addClass("active"); // 현재 클릭한 옵션 열기
    }

    function closeOptionMenu(event) {
        if (!$(event.target).closest(".history-item-option").length) {
            $(".item-option").removeClass("active"); // 영역 밖 클릭 시 닫기
        }
    }

    $(".btn-op-open").click(openOptionMenu);
    $(document).click(closeOptionMenu);

    function toggleMainMenu(e) {
        e.preventDefault();
        let parentLi = $(this).parent();

        if (parentLi.hasClass("active")) {
            parentLi.removeClass("active");
            parentLi.find(".nav-item-list").removeClass("active");
        } else {
            $(".navbar > li").removeClass("active").find(".nav-item-list").removeClass("active");
            parentLi.addClass("active");
            parentLi.find(".nav-item-list").addClass("active");
        }
    }

    function toggleSubMenu(e) {
        e.preventDefault();
        let parentLi = $(this).parent();
        let parentList = parentLi.closest(".nav-item-list");

        parentLi.siblings().removeClass("active");
        parentLi.addClass("active");
        parentList.addClass("active");
        parentLi.closest(".nav-sub-item").addClass("active");
    }

    // 키보드 접근성 (키보드 네비게이션 지원)
    function handleFocusMainMenu() {
        let parentLi = $(this).parent();

        // Check if click event already activated this item (prevents double trigger)
        if (!parentLi.hasClass("active")) {
            $(".navbar > li").removeClass("active").find(".nav-item-list").removeClass("active");
            parentLi.addClass("active");
            parentLi.find(".nav-item-list").addClass("active");
        }
    }

    // 키보드 접근성 (키보드 네비게이션 지원)
    function handleFocusSubMenu() {
        let parentLi = $(this).parent();
        let parentList = parentLi.closest(".nav-item-list");

        if (!parentLi.hasClass("active")) {
            parentLi.siblings().removeClass("active");
            parentLi.addClass("active");
            parentList.addClass("active");
            parentLi.closest(".nav-sub-item").addClass("active");
        }
    }

    function handleBlur() {
        setTimeout(() => {
            if (!$(".navbar li a:focus, .nav-item-list li a:focus").length) {
                $(".navbar li").removeClass("active");
                $(".nav-item-list").removeClass("active");
            }
        }, 100);
    }

    $(".navbar li > a")
        .on("mousedown", toggleMainMenu)
        .on("focus", handleFocusMainMenu)
        .on("blur", handleBlur);

    $(".nav-item-list li a")
        .on("mousedown", toggleSubMenu)
        .on("focus", handleFocusSubMenu)
        .on("blur", handleBlur);

    // 도움말
    function showHelp() {
        $(this).siblings(".help-msg").stop().fadeIn(200);
    }

    function hideHelp() {
        $(this).siblings(".help-msg").stop().fadeOut(200);
    }

    $(".help-group span")
        .hover(showHelp, hideHelp)
        .focus(showHelp)
        .blur(hideHelp);

    $(".accordion-header").click(function () {
        let parent = $(this).parent();

        if (parent.hasClass("active")) {
            parent.removeClass("active").find(".accordion-content").slideUp(300);
        } else {
            $(".accordion-item").removeClass("active").find(".accordion-content").slideUp(300);
            parent.addClass("active").find(".accordion-content").slideDown(300);
        }
    });

    $(".accordion-header").keydown(function (e) {
        if (e.key === "Enter" || e.key === " ") {
            $(this).click();
        }
    });

    $(".chat-reaction .btn").click(function () {
        $(this).toggleClass("active");
    });


    let lastFocusedButton; // 마지막으로 포커스된 버튼을 저장할 변수

    // 모달 열기 버튼 클릭 이벤트
    $(".open-modal").click(function () {
        var modalId = $(this).data("modal-id");
        var modalElement = $("#" + modalId);

        // 모달을 트리거한 버튼을 저장
        lastFocusedButton = $(this);

        // 새로운 모달 활성화
        modalElement.addClass("active");

        // 활성화된 모달의 개수에 따라 z-index 동적으로 설정
        var activeModals = $(".modal-wrap.active").length;
        modalElement.css("z-index", 1000 + activeModals); // z-index 조정

        // 모달 컨텐츠에 포커스 설정
        // modalElement.find(".modal-content").focus();
        // 모달 내용에 포커스 설정
        modalElement.find(".modal-content").attr("tabindex", "-1").focus();

        // 포커스 트래핑 활성화 (모달 내부에서만 탭 이동 가능하도록 설정)
        trapFocus(modalElement);

        // 모달 활성화 시 스크롤 방지
        window.addEventListener("wheel", removeDefaultEvent, { passive: false });

        console.log(lastFocusedButton);
    });

    // 모달 닫기 버튼 이벤트
    $(".btn-modal-close").click(function (e) {
        e.stopPropagation(); // 이벤트가 .modal-wrap으로 전파되지 않도록 방지

        // 클릭된 닫기 버튼의 부모 모달만 닫기
        var modalToClose = $(this).closest(".modal-wrap");
        modalToClose.removeClass("active");

        // 다른 활성화된 모달이 없으면 스크롤 방지 해제
        if ($(".modal-wrap.active").length === 0) {
            window.removeEventListener("wheel", removeDefaultEvent);
        }

        // 포커스를 원래 열었던 open-modal 버튼으로 되돌리기
        if (lastFocusedButton) {
            lastFocusedButton.focus();
        }
    });

    // 모달 영역 외부 클릭 시 모달 닫기
    $(".modal-wrap").click(function (e) {
        if ($(e.target).is(".modal-wrap")) {
            // 클릭된 특정 모달만 닫기
            $(this).removeClass("active");

            // 다른 활성화된 모달이 없으면 스크롤 방지 해제
            if ($(".modal-wrap.active").length === 0) {
                window.removeEventListener("wheel", removeDefaultEvent);
            }

            // 포커스를 원래 열었던 open-modal 버튼으로 되돌리기
            if (lastFocusedButton) {
                lastFocusedButton.focus();
            }
        }
    });

    // 모달 내용 내부를 클릭할 때 이벤트 전파 방지
    $(".modal").click(function (e) {
        e.stopPropagation();
    });

    // 모달 내용 내부를 클릭할 때 모달 닫기 방지
    $(".modal-content, .modal").click(function (e) {
        e.stopPropagation();
    });

    // 모달이 활성화된 동안 스크롤을 방지하는 함수
    function removeDefaultEvent(e) {
        e.preventDefault();
    }

    // 모달 내부에서 포커스를 제한하는 함수
    function trapFocus(modalElement) {
        // 문서에 keydown 이벤트 리스너 추가 (탭 키 포커스 이동 제어)
        $(document).on("keydown", function (event) {
            if (event.key === "Tab") {
                // 모달 내부에서 포커스 가능한 요소들 찾기
                var focusableElements = modalElement.find(
                    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
                ).filter(":visible"); // 보이는 요소만 선택

                var firstElement = focusableElements.first(); // 첫 번째 포커스 가능한 요소
                var lastElement = focusableElements.last(); // 마지막 포커스 가능한 요소

                if (event.shiftKey) {
                    // Shift + Tab: 뒤로 이동
                    if (document.activeElement === firstElement[0]) {
                        event.preventDefault();
                        lastElement.focus(); // 마지막 요소로 포커스 이동
                    }
                } else {
                    // Tab: 앞으로 이동
                    if (document.activeElement === lastElement[0]) {
                        event.preventDefault();
                        firstElement.focus(); // 첫 번째 요소로 포커스 이동
                    }
                }
            }
        });

        // 모달 외부로 포커스가 나가는 것을 방지
        $(document).on("focusin", function (event) {
            if (!modalElement[0].contains(event.target)) {
                // 포커스가 모달 내부에 없을 경우
                event.stopPropagation();
                modalElement.find(".modal-content").focus(); // 모달로 포커스 다시 이동
            }
        });
    }
});


