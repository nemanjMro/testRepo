//--------------------------------------------------------[GET YEAR]┐
document.getElementById("year").innerHTML = new Date().getFullYear();
//--------------------------------------------------------[GET YEAR]┘

//-------------------------------------------------------------[GET COUPONS]┐
var selectedPromos = {};
var boxPromosList = document.querySelectorAll('.BoxPromos');
var mainloginform = document.getElementById('ContLogRegForm');

boxPromosList.forEach(function (boxPromos, index) {
    var btnSelectCoupon = document.getElementById('BtnSelecCoupon_' + (index + 1));
    boxPromos.addEventListener('click', function () {
        boxPromos.classList.toggle('Selected');
        boxPromosList[index + 1 === 2 ? 0 : 1].classList.remove('Selected');
        delete selectedPromos['promo_' + (index + 1 === 2 ? 1 : 2)];
        document.getElementById('BtnSelecCoupon_' + (index + 1 === 2 ? 1 : 2)).textContent = boxPromosList[index + 1 === 2 ? 0 : 1].classList.contains('Selected') ? 'Deselect this Coupon' : 'Redeem this Coupon';
        if (boxPromos.classList.contains('Selected')) {
            selectedPromos['promo_' + (index + 1)] = {
                title: boxPromos.querySelector('.TitlePromo').textContent,
                rowCode: boxPromos.querySelector('.RowCode').textContent
            };
        } else {
            delete selectedPromos['promo_' + (index + 1)];
        }
        btnSelectCoupon.textContent = boxPromos.classList.contains('Selected') ? 'Deselect this Coupon' : 'Redeem this Coupon';
        renderCouponCodes(selectedPromos);
    });
});

 var _cio = _cio || [];
      (function() {
        var a,b,c;a=function(f){return function(){_cio.push([f].
        concat(Array.prototype.slice.call(arguments,0)))}};b=["load","identify",
        "sidentify","track","page"];for(c=0;c<b.length;c++){_cio[b[c]]=a(b[c])};
        var t = document.createElement('script'),
            s = document.getElementsByTagName('script')[0];
        t.async = true;
        t.id    = 'cio-tracker';

        t.setAttribute('data-site-id', '90d39c15684bb2d7c525');
        t.setAttribute('data-use-array-params', 'true');
        t.setAttribute('data-use-in-app', 'true');
        t.setAttribute('data-auto-track-page', 'false');

        t.src = 'https://assets.customer.io/assets/track.js';
        s.parentNode.insertBefore(t, s);
      })();

function openForm() {
    var couponCodes = Object.values(selectedPromos).map(function (promo) {
        return promo.rowCode;
    });
    
    mainloginform.classList.remove('Close');
    renderCouponCodes(selectedPromos);
}

var playNowButton = document.getElementById('CheckSelectionButton');
playNowButton.addEventListener('click', function () {
    openForm();
});
document.getElementById('BtnClose_LR_Form').addEventListener('click', function () {
    mainloginform.classList.add('Close');
    playNowButton.textContent = 'PLAY NOW!';
});



// ------------------[GET CCODES]┐
function renderCouponCodes(selectedPromos) {
    var rowCouponsContainer = document.getElementById('RowCoupons');
    rowCouponsContainer.innerHTML = '';
    if (Object.keys(selectedPromos).length === 0) {
        var messageElement = document.createElement('div');
        messageElement.className = 'NoCouponMessage';
        messageElement.textContent = 'You have not selected any coupon.';
        rowCouponsContainer.appendChild(messageElement);
    } else {
        for (var key in selectedPromos) {
            if (selectedPromos.hasOwnProperty(key)) {
                var promo = selectedPromos[key];
                var codeElement = document.createElement('div');
                codeElement.className = 'BoxSelCode';
                codeElement.textContent = promo.rowCode;
                codeElement.id = 'SelectedCCode_' + key.split('_')[1];
                rowCouponsContainer.appendChild(codeElement);
            }
        }
    }
}
// ------------------[GET CCODES]┘
//-------------------------------------------------------------[GET COUPONS]┘




//-------------------------------------------------------------[CONTROL LOGIN FORM]┐
var btnLogin = document.getElementById('BtnShow_Login');
var btnSignup = document.getElementById('BtnShow_Signup');
var loginBox = document.getElementById('LoginBox');
var registerBox = document.getElementById('RegisterBox');

btnLogin.addEventListener('click', function () {
    openLogin();
});

btnSignup.addEventListener('click', function () {
    openSingUp();
});

function openLogin() {
    openForm();
    loginBox.classList.add('Active');
    registerBox.classList.remove('Active');
    btnLogin.classList.add('Active');
    btnSignup.classList.remove('Active');
}

function openSingUp() {
    openForm();
    registerBox.classList.add('Active');
    loginBox.classList.remove('Active');
    btnSignup.classList.add('Active');
    btnLogin.classList.remove('Active');
}
//-------------------------------------------------------------[CONTROL LOGIN FORM]┘

//SINGUP FORM

var phoneNumber = document.getElementById('phoneNumber');

phoneNumber.addEventListener("keyup", (event) => {
    const { name, value } = event.target;
    console.log(name, value)
    var reg = new RegExp(/^\d+$/);
    if (reg.test(value) === false && name === "phoneNumber" && value !== "") {
      event.target.value = "";
      return;
    }
})

function getCookieValue(cookieName) {
    var affId = 0;
    var cookies = document.cookie.split(';');
                for (var c = 0, cc = cookies.length; c < cc; ++c) {
                    var cookie = cookies[c];
                    var parts = cookie.split('=');
                    if (decodeURIComponent(parts[0]).trim() === 'gAID') {
                        affId = parseInt(decodeURIComponent(parts[1]));
                        break;
                    }
                }
    return affId;
}

function getCookieValueLocalAffID(cookieName) {
     var localAffId = 0;
    var cookies = document.cookie.split(';');
                for (var c = 0, cc = cookies.length; c < cc; ++c) {
                    var cookie = cookies[c];
                    var parts = cookie.split('=');
                    if (decodeURIComponent(parts[0]).trim() === 'affid') {
                        localAffId = parseInt(decodeURIComponent(parts[1]));
                        break;
                    }
                }
    return localAffId;
}

function getCookieValueBannerID() {
    var bannerID = 0;
    var cookies = document.cookie.split(';');
                for (var c = 0, cc = cookies.length; c < cc; ++c) {
                    var cookie = cookies[c];
                    var parts = cookie.split('=');
                    if (decodeURIComponent(parts[0]).trim() === 'bannerID') {
                        bannerID = parseInt(decodeURIComponent(parts[1]));
                        break;
                    }
                }
    return bannerID;
}

function setTextBasedOnAffiliateID() {
    let affiliateID = getCookieValue('gAID');
	let BannerID = getCookieValueBannerID();
    let freeBonusHeader = "";
	let freeBonusCode = "";
	let freeBonusCodeForTerms = "";
	let depozitBonusHeader = "";
	let depozitBonusCode = "";
	let depozitBonusCodeForTerms = "";
	let freeBonusTerms = "";
	let depozitBonusTerms = "";
	let maxCashout = "";

    switch (affiliateID) {
			
case 134109:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "100GEMS";
                freeBonusCodeForTerms = "100GEMS";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "450GEMS";
                depozitBonusCodeForTerms = "450GEMS";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway..";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    else if (BannerID === 26488)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "PNDMRO";
                freeBonusCodeForTerms = "PNDMRO";
                depozitBonusHeader = "100% NO RULES";
                depozitBonusCode = "PND100";
                depozitBonusCodeForTerms = "PND100";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ":Value: 100% boost on first deposit; Wagering: 1x(Deposit + Bonus); Max cash out: None; Max bet per hand: None; Allowed games: All games; Minimum Deposit: $20; Max Bonus: $300.";
            }
    break;
case 134376:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "NEW100";
                freeBonusCodeForTerms = "NEW100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "NEW450";
                depozitBonusCodeForTerms = "NEW450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    else if (BannerID === 26531)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "NEW100";
                freeBonusCodeForTerms = "NEW100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "NEW450";
                depozitBonusCodeForTerms = "NEW450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    else if (BannerID === 26532)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "NEW100";
                freeBonusCodeForTerms = "NEW100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "NEW450";
                depozitBonusCodeForTerms = "NEW450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    break;
case 134051:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "BFNC100";
                freeBonusCodeForTerms = "BFNC100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "BFNC450";
                depozitBonusCodeForTerms = "BFNC450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    break;
case 133775:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    else if (BannerID === 26593)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
			
			//NOVO OD BOGIJA
			else if (BannerID === 26151)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
				maxCashout = "NO MAX CASH OUT";
            }
			else if (BannerID === 26152)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
				maxCashout = "NO MAX CASH OUT";
            }
			else if (BannerID === 26153)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
				maxCashout = "NO MAX CASH OUT";
            }
			else if (BannerID === 26154)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
				maxCashout = "NO MAX CASH OUT";
            }
			else if (BannerID === 26155)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
				maxCashout = "NO MAX CASH OUT";
            }
			else if (BannerID === 26156)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
				maxCashout = "NO MAX CASH OUT";
            }
			else if (BannerID === 26157)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
				maxCashout = "NO MAX CASH OUT";
            }
			else if (BannerID === 26158)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
				maxCashout = "NO MAX CASH OUT";
            }
			else if (BannerID === 26159)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
				maxCashout = "NO MAX CASH OUT";
            }
			else if (BannerID === 26160)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
				maxCashout = "NO MAX CASH OUT";
            }
			else if (BannerID === 26161)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
				maxCashout = "NO MAX CASH OUT";
            }
			else if (BannerID === 26162)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
				maxCashout = "NO MAX CASH OUT";
            }
			else if (BannerID === 26163)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
				maxCashout = "NO MAX CASH OUT";
            }
			else if (BannerID === 26164)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
				maxCashout = "NO MAX CASH OUT";
            }
			else if (BannerID === 26165)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
				maxCashout = "NO MAX CASH OUT";
            }
			else if (BannerID === 26166)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
				maxCashout = "NO MAX CASH OUT";
            }
			else if (BannerID === 26593)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "CHIPY100";
                freeBonusCodeForTerms = "CHIPY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CHIPY450";
                depozitBonusCodeForTerms = "CHIPY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    break;
case 134470:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "EXTRA100";
                freeBonusCodeForTerms = "EXTRA100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "EXTRA450";
                depozitBonusCodeForTerms = "EXTRA450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    break;
case 134046:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "MCP100";
                freeBonusCodeForTerms = "MCP100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "MCP450";
                depozitBonusCodeForTerms = "MCP450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    break;
case 133875:

            if (BannerID === 26473)
            {
                freeBonusHeader = "125 FREE SPINS";
                freeBonusCode = "NABBLE125";
                freeBonusCodeForTerms = "NABBLE125";
                depozitBonusHeader = "100% NO RULES";
                depozitBonusCode = "NABBLE100";
                depozitBonusCodeForTerms = "NABBLE100";
                freeBonusTerms = ": Value: 125 Free Spins on Masks Of Atlantis; Wagering: x40; Max cash out: $100; Max bet per hand: $10; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ":Value: 100% boost on first deposit; Wagering: 1x(Deposit + Bonus); Max cash out: None; Max bet per hand: None; Allowed games: All games; Minimum Deposit: $20; Max Bonus: $300.";
            }
    break;
case 133907:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "NDB100";
                freeBonusCodeForTerms = "NDB100";
                depozitBonusHeader = "444% BOOST";
                depozitBonusCode = "THE444";
                depozitBonusCodeForTerms = "THE444";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 444% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    else if (BannerID === 26610)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "NDB100";
                freeBonusCodeForTerms = "NDB100";
                depozitBonusHeader = "444% BOOST";
                depozitBonusCode = "THE444";
                depozitBonusCodeForTerms = "THE444";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 444% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    else if (BannerID === 26650)
            {
                freeBonusHeader = "250 FREE SPINS";
                freeBonusCode = "WINWELCOME250";
                freeBonusCodeForTerms = "WINWELCOME250";
                depozitBonusHeader = "$270 BONUS";
                depozitBonusCode = "EXTRA300";
                depozitBonusCodeForTerms = "EXTRA300";
                freeBonusTerms = "Value: 250 Free Spins Ronin: Quest of Honor; Wagering: x40; Max cash out: $100; Max bet per hand: $10; Allowed games: NP Slots Only; Availability: New Players ; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway; Duration: 01.02.-25.02.2025";
                depozitBonusTerms = ":Value:$ 270 Boost; Wagering: 30x(deposit + bonus); Max cash out: $1500; Max bet per hand: $5; Allowed games: Non-progresive slots Only; Minimum Deposit: $30; Max Bonus: $270;Available: On first deposit. Duration: 01.02.-25.02.2025.";
            }
    else if (BannerID === 26730)
            {
                freeBonusHeader = "$120 FREE CHIP";
                freeBonusCode = "120NDB";
                freeBonusCodeForTerms = "120NDB";
                depozitBonusHeader = "111% NO RULES";
                depozitBonusCode = "NDB111";
                depozitBonusCodeForTerms = "NDB111";
                freeBonusTerms = ": Value: $120; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ":Value: 111% boost on first deposit; Wagering: 1x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games: Non-progressive slots; Minimum Deposit: $20; Max Bonus: $200.";
            }
    else if (BannerID === 26751)
            {
                freeBonusHeader = "50 FREE SPINS";
                freeBonusCode = "LITTLE50";
                freeBonusCodeForTerms = "LITTLE50";
                depozitBonusHeader = "75% BOOST+ 75FS";
                depozitBonusCode = "LITTLE75";
                depozitBonusCodeForTerms = "LITTLE75";
                freeBonusTerms = ": Value: 50 Free Spins on Little Griffins; Wagering: x40; Max cash out: $50; Max bet per hand: $10; Allowed games: Non-progresive slots only ; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ":Bonus: 75% + 75FS on Little Griffins; Wagering:30x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games: Non-progressive slots; Minimum Deposit: $20; Max Bonus: $200.";
            }
    break;
case 136282:

            if (BannerID === 26472)
            {
                freeBonusHeader = "50 FREE SPINS";
                freeBonusCode = "ACHILLES50";
                freeBonusCodeForTerms = "ACHILLES50";
                depozitBonusHeader = "100% NO RULES";
                depozitBonusCode = "TOP100";
                depozitBonusCodeForTerms = "TOP100";
                freeBonusTerms = ": Value: 50 Free Spins on Achilles Deluxe; Wagering: x40; Max cash out: $100; Max bet per hand: $10; Allowed games: Non-progresive slots only ; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ":Value: 100% no rules boost; Wagering: 1x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games: Non-progresive slots; Minimum Deposit: $20; Max Bonus: $200.";
            }
    else if (BannerID === 26651)
            {
                freeBonusHeader = "100 FREE SPINS";
                freeBonusCode = "100MONSTER";
                freeBonusCodeForTerms = "100MONSTER";
                depozitBonusHeader = "160% NO RULES";
                depozitBonusCode = "MONSTER160";
                depozitBonusCodeForTerms = "MONSTER160";
                freeBonusTerms = ": Value: 100 Free Spins on Mega Monster; Wagering: x40; Max cash out: $50; Max bet per hand: $10; Allowed games: Non-Progresive Slots only ; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway; Duration: 19,11.-30.112024.";
                depozitBonusTerms = ":Value: 160% no rules; Wagering: 1x(deposit + bonus); Max cash out: None; Max bet per hand: $10; Allowed games: Non-progresive slots; Minimum Deposit: $20; Max Bonus: $200; Duration: 19.11-30.11.2024.";
				maxCashout = "NO MAX CASH OUT";
            }
    else if (BannerID === 26825)
            {
                freeBonusHeader = "150 FREE SPINS";
                freeBonusCode = "150NY";
                freeBonusCodeForTerms = "150NY";
                depozitBonusHeader = "222% NO MAX CASHOUT";
                depozitBonusCode = "NY200";
                depozitBonusCodeForTerms = "NY200";
                freeBonusTerms = ": 150 Free Spins on Sweet Shop Collect; Wagering: x40; Max cash out: $50; Max bet per hand: $10; Allowed games: Non-progressive slots only; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway; Eligibility: All Players; Duration: 15.12-31.12.2024.";
                depozitBonusTerms = ": 222% Boost; Wagering: 45x (Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games: Non-progressive slots; Minimum deposit: $20; Max bonus: $200; Available: 1x per player; Duration: 15.12-31.12.2024.";
            }
    else if (BannerID === 26889)
            {
                freeBonusHeader = "80 FREE SPINS";
                freeBonusCode = "ESC80";
                freeBonusCodeForTerms = "ESC80";
                depozitBonusHeader = "99% BOOST+99 FS";
                depozitBonusCode = "ESC99";
                depozitBonusCodeForTerms = "ESC99";
                freeBonusTerms = ": Value: 80 Free Spins on Escape The North; Wagering: x40; Max cash out: $50; Max bet per hand: $10; Allowed games: Non-Progresive Slots only ; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway; Duration: 16.01.-10.02.2025...";
                depozitBonusTerms = ":Value: 99% boost+99FS on Escape The North; Wagering: 30x(deposit + bonus); Max cash out: None; Max bet per hand: $10; Allowed games: Non-progresive slots; Minimum Deposit: $20; Max Bonus: $200; Duration: 16.01.-10.02.2025.";
            }
    break;
case 134259:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$200 FREE CHIP";
                freeBonusCode = "NDK200";
                freeBonusCodeForTerms = "NDK200";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "450NDK";
                depozitBonusCodeForTerms = "450NDK";
                freeBonusTerms = "Code: NDK200; Value: $200; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: Non-progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway.";
                depozitBonusTerms = "Code: 450NDK; Value: 450% first deposit boost; Wagering: x35 (Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games: Non-progressive slots; Minimum Deposit: $10; Max Bonus: $1000.";
            }
    else if (BannerID === 26472)
            {
                freeBonusHeader = "50 FREE SPINS";
                freeBonusCode = "SWEET50";
                freeBonusCodeForTerms = "SWEET50";
                depozitBonusHeader = "100% NO RULES";
                depozitBonusCode = "HUGE100";
                depozitBonusCodeForTerms = "HUGE100";
                freeBonusTerms = ": Value: 50 Free Spins on Sweet Shop Collect; Wagering: x40; Max cash out: $100; Max bet per hand: $10; Allowed games: Non-progresive slots only ; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ":Value: 100% no rules boost; Wagering: 1x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games: Non-progresive slots; Minimum Deposit: $20; Max Bonus: $200.";
            }
    break;
case 133758:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "ROYAL100";
                freeBonusCodeForTerms = "ROYAL100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "ROYAL450";
                depozitBonusCodeForTerms = "ROYAL450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    break;
case 133975:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "SPICY100";
                freeBonusCodeForTerms = "SPICY100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "SPICY450";
                depozitBonusCodeForTerms = "SPICY450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    break;
case 134316:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "SF100";
                freeBonusCodeForTerms = "SF100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "SF450";
                depozitBonusCodeForTerms = "SF450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    break;
case 133940:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "100NOW";
                freeBonusCodeForTerms = "100NOW";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "GRAND450";
                depozitBonusCodeForTerms = "GRAND450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    break;
case 134797:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "GURU100";
                freeBonusCodeForTerms = "GURU100";
                depozitBonusHeader = "100% NO RULES";
                depozitBonusCode = "100GURU";
                depozitBonusCodeForTerms = "100GURU";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ":Value: 100% boost on first deposit; Wagering: 1x(Deposit + Bonus); Max cash out: None; Max bet per hand: None; Allowed games: All games; Minimum Deposit: $20; Max Bonus: $300.";
            }
    else if (BannerID === 26976)
            {
                freeBonusHeader = "66 FREE SPINS";
                freeBonusCode = "GEMKEY66";
                freeBonusCodeForTerms = "GEMKEY66";
                depozitBonusHeader = "66% BOOST";
                depozitBonusCode = "66UNLOCK";
                depozitBonusCodeForTerms = "66UNLOCK";
                freeBonusTerms = ": Value:66 Free spins on Gemstone Keys: The Arcane Unlocked; Wagering: x40; Max cash out: $50; Max bet per hand: $5; Allowed games: NP Slots Only.. Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 66% boost; Wagering:20x(Deposit + Bonus); Max cash out: None ; Max bet per hand: $5; Allowed games:  Non-progressive slots; Minimum Deposit: $20; Max Bonus: $250.";
                maxCashout = "NO MAX CASH OUT";
            }
    break;
case 135619:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "DIGITAL100";
                freeBonusCodeForTerms = "DIGITAL100";
                depozitBonusHeader = "100% NO RULES";
                depozitBonusCode = "100DIGITAL";
                depozitBonusCodeForTerms = "100DIGITAL";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ":Value: 100% boost on first deposit; Wagering: 1x(Deposit + Bonus); Max cash out: None; Max bet per hand: None; Allowed games: All games; Minimum Deposit: $20; Max Bonus: $300.";
            }
    break;
case 135642:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "FSG100";
                freeBonusCodeForTerms = "FSG100";
                depozitBonusHeader = "100% NO RULES";
                depozitBonusCode = "100FSG";
                depozitBonusCodeForTerms = "100FSG";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ":Value: 100% boost on first deposit; Wagering: 1x(Deposit + Bonus); Max cash out: None; Max bet per hand: None; Allowed games: All games; Minimum Deposit: $20; Max Bonus: $300.";
            }
    else if (BannerID === 26946)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "FSG100";
                freeBonusCodeForTerms = "FSG100";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "450FSG";
                depozitBonusCodeForTerms = "450FSG";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    break;
case 136042:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "FREE100";
                freeBonusCodeForTerms = "FREE100";
                depozitBonusHeader = "111% NO RULES";
                depozitBonusCode = "FIRST111";
                depozitBonusCodeForTerms = "FIRST111";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: Non-progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ":Value: 111% boost on first deposit; Wagering: 1x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games: Non-progressive slots; Minimum Deposit: $20; Max Bonus: $200.";
            }
    break;
case 136272:

            if (BannerID === 26473) {

                    freeBonusHeader = "Testtest";
                    freeBonusCode = "A123SD";
                    freeBonusCodeForTerms = "A123SD";
                    depozitBonusHeader = "Testtest";
                    depozitBonusCode = "A123SD";
                    depozitBonusCodeForTerms = "A123SD";
                    freeBonusTerms = ": Value: 0; Wagering: x30; Max cash out: 0; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                    depozitBonusTerms = ": Value: 0; Wagering: x30; Max cash out: 0; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                    maxCashout = "NO MAX CASHOUT";
                
}
    break;
case 136348:

            if (BannerID === 26615)
            {
                freeBonusHeader = "75 FREE SPINS";
                freeBonusCode = "CRUSH75";
                freeBonusCodeForTerms = "CRUSH75";
                depozitBonusHeader = "175% BOOST";
                depozitBonusCode = "175CRUSH";
                depozitBonusCodeForTerms = "175CRUSH";
                freeBonusTerms = ": Value: 75 FS on Desert Raider; Wagering: x45; Max cash out: $30; Max bet per hand: $10; Allowed games: Non-progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway.";
                depozitBonusTerms = ": Value: 175% boost; Wagering: 45x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games:  Non-progressive slots; Minimum Deposit: $20; Max Bonus: $200; Available: On first deposit";
				maxCashout = "NO MAX CASH OUT";
            }
    break;
case 136389:

            if (BannerID === 26615)
            {
                freeBonusHeader = "75 FREE SPINS";
                freeBonusCode = "NDB75";
                freeBonusCodeForTerms = "NDB75";
                depozitBonusHeader = "175% BOOST";
                depozitBonusCode = "175NDB";
                depozitBonusCodeForTerms = "175NDB";
                freeBonusTerms = ": Value: 75 FS on Buffalo Mania Deluxe; Wagering: x45; Max cash out: $30; Max bet per hand: $10; Allowed games: Non-progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 175% boost; Wagering: 45x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games:  Non-progressive slots; Minimum Deposit: $20; Max Bonus: $200; Available: On first deposit";
				maxCashout = "NO MAX CASH OUT";
            }
    else if (BannerID === 26654)
            {
                freeBonusHeader = "45 FREE SPINS";
                freeBonusCode = "45ROSEFS";
                freeBonusCodeForTerms = "45ROSEFS";
                depozitBonusHeader = "150% BOOST";
                depozitBonusCode = "ROSE150";
                depozitBonusCodeForTerms = "ROSE150";
                freeBonusTerms = ": Value:45 FS on Pulsar; Wagering: x45; Max cash out: $30; Max bet per hand: $10; Allowed games: Non-progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway; Duration: 01.10.-15.10.2024.";
                depozitBonusTerms = ": Value: 150% boost; Wagering: 45x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games:  Non-progressive slots; Minimum Deposit: $20; Max Bonus: $200; Available: 1x per player; Duration: 01.10.-15.10.2024.";
				maxCashout = "NO MAX CASH OUT";
            }
    break;
case 136500:

            if (BannerID === 26615)
            {
                freeBonusHeader = "75 FREE SPINS";
                freeBonusCode = "NDK75";
                freeBonusCodeForTerms = "NDK75";
                depozitBonusHeader = "175% BOOST";
                depozitBonusCode = "175NDK";
                depozitBonusCodeForTerms = "175NDK";
                freeBonusTerms = ": Value: 75 FS on Cash Bandits 3; Wagering: x45; Max cash out: $50; Max bet per hand: $10; Allowed games: Non-progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway.";
                depozitBonusTerms = ": Value: 175% boost; Wagering: 45x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games:  Non-progressive slots; Minimum Deposit: $20; Max Bonus: $200; Available: On first deposit";
				maxCashout = "NO MAX CASH OUT";
            }
    break;
case 136512:

            if (BannerID === 26615)
            {
                freeBonusHeader = "45 FREE SPINS";
                freeBonusCode = "FREE45";
                freeBonusCodeForTerms = "FREE45";
                depozitBonusHeader = "125% BOOST";
                depozitBonusCode = "125EXTRA";
                depozitBonusCodeForTerms = "125EXTRA";
                freeBonusTerms = ": Value: 45 FS on T-Rex Wild Attack; Wagering: x45; Max cash out: $30; Max bet per hand: $10; Allowed games: Non-progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 125% boost; Wagering: 45x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games:  Non-progressive slots; Minimum Deposit: $20; Max Bonus: $200; Available: 1x per player";
				maxCashout = "NO MAX CASH OUT";
            }
    else if (BannerID === 26655)
            {
                freeBonusHeader = "55 FREE SPINS";
                freeBonusCode = "55YELLOWFS";
                freeBonusCodeForTerms = "55YELLOWFS";
                depozitBonusHeader = "160% BOOST";
                depozitBonusCode = "YELLOW160";
                depozitBonusCodeForTerms = "YELLOW160";
                freeBonusTerms = ": Value: 55 FS on  Fruit Frenzy; Wagering: x45; Max cash out: $30; Max bet per hand: $10; Allowed games: Non-progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway; Duration: 16.10.-31.10.2024.";
                depozitBonusTerms = ": Value: 160% boost; Wagering: 45x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games:  Non-progressive slots; Minimum Deposit: $20; Max Bonus: $200; Available: 1x per player; Duration: 16.10.-31.10.2024.";
				maxCashout = "NO MAX CASH OUT";
            }
    break;
case 136480:

            if (BannerID === 26663)
            {
                freeBonusHeader = "85 FREE SPINS";
                freeBonusCode = "SLS95";
                freeBonusCodeForTerms = "SLS95";
                depozitBonusHeader = "UP TO 450% + 450 FS";
                depozitBonusCode = "BIGSLS";
                depozitBonusCodeForTerms = "BIGSLS";
                freeBonusTerms = ": Value: 85 FS on T-Rex Hyper Wins; Wagering: x45; Max cash out: $30; Max bet per hand: $10; Allowed games: Non-progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway;";
                depozitBonusTerms = ": Value: 450% boost + 450 FS; Wagering: 45x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games:  Non-progressive slots; Minimum Deposit: $20; Max Bonus: $200; Available: New Player Only;";
				maxCashout = "NO MAX CASH OUT";
            }
    break;
case 136835:

            if (BannerID === 26615)
            {
                freeBonusHeader = "75 FREE SPINS";
                freeBonusCode = "BEST75";
                freeBonusCodeForTerms = "BEST75";
                depozitBonusHeader = "175% BOOST";
                depozitBonusCode = "175BEST";
                depozitBonusCodeForTerms = "175BEST";
                freeBonusTerms = ": Value: 75 FS on Doragon's Gems; Wagering: x45; Max cash out: $30; Max bet per hand: $10; Allowed games: Non-progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 175% boost; Wagering: 45x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games:  Non-progressive slots; Minimum Deposit: $20; Max Bonus: $200; Available: On first deposit";
				maxCashout = "NO MAX CASH OUT";
            }
    break;
case 136952:

            if (BannerID === 26734)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "100SLOTS";
                freeBonusCodeForTerms = "100SLOTS";
                depozitBonusHeader = "111% NO RULES";
                depozitBonusCode = "SLOTS111";
                depozitBonusCodeForTerms = "SLOTS111";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: Non-progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ":Value: 111% boost on first deposit; Wagering: 1x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games: Non-progressive slots; Minimum Deposit: $20; Max Bonus: $200.";
            }
    else if (BannerID === 26749)
            {
                freeBonusHeader = "111% NO RULES";
                freeBonusCode = "SLOTS111";
                freeBonusCodeForTerms = "SLOTS111";
                depozitBonusHeader = "111% NO RULES";
                depozitBonusCode = "SLOTS111";
                depozitBonusCodeForTerms = "SLOTS111";
                freeBonusTerms = ":Value: 111% boost on first deposit; Wagering: 1x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games: Non-progressive slots; Minimum Deposit: $20; Max Bonus: $200.";
                depozitBonusTerms = ":Value: 111% boost on first deposit; Wagering: 1x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games: Non-progressive slots; Minimum Deposit: $20; Max Bonus: $200.";
            }
    break;
case 136587: 
     if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "NDP100";
                freeBonusCodeForTerms = "NDP100";
                depozitBonusHeader = "100% NO RULES";
                depozitBonusCode = "100NDP";
                depozitBonusCodeForTerms = "100NDP";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: Non-progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ":Value: 100% boost on first deposit; Wagering: 1x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games: Non-progressive slots; Minimum Deposit: $20; Max Bonus: $300.";
				maxCashout = "NO MAX CASH OUT";
            }
    break;
case 136857:

            if (BannerID === 26473)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "NDG100";
                freeBonusCodeForTerms = "NDG100";
                depozitBonusHeader = "100% NO RULES";
                depozitBonusCode = "100NDG";
                depozitBonusCodeForTerms = "100NDG";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: Non-progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ":Value: 100% boost on first deposit; Wagering: 1x(Deposit + Bonus); Max cash out: None; Max bet per hand: $10; Allowed games: Non-progressive slots; Minimum Deposit: $20; Max Bonus: $300.";
            }
    break;
case 137412:

            if (BannerID === 26828)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "100NDO";
                freeBonusCodeForTerms = "100NDO";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "NDO450";
                depozitBonusCodeForTerms = "NDO450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    else if (BannerID === 26877)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "100CBN";
                freeBonusCodeForTerms = "100CBN";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CBN450";
                depozitBonusCodeForTerms = "CBN450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    else if (BannerID === 26878)
            {
                freeBonusHeader = "$100 FREE CHIP";
                freeBonusCode = "100CBC";
                freeBonusCodeForTerms = "100CBC";
                depozitBonusHeader = "450% BOOST";
                depozitBonusCode = "CBC450";
                depozitBonusCodeForTerms = "CBC450";
                freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, New Zealand, Italy, Germany, Sweden, Norway";
                depozitBonusTerms = ": Value: 450% first deposit boost; Wagering: 45x(Deposit + Bonus); Max cash out: 45x; Max bet per hand: $10; Allowed games:  Non-progressive slots, Keno, Video Poker, Blackjack; Minimum Deposit: $10; Max Bonus: $4500.";
            }
    break;
            case 134243:
                if (BannerID === 26341) {

                    freeBonusHeader = "dasd";
                    freeBonusCode = "ASD123";
                    freeBonusCodeForTerms = "ASD123";
                    depozitBonusHeader = "asd";
                    depozitBonusCode = "ASD123";
                    depozitBonusCodeForTerms = "ASD123";
                    freeBonusTerms = "1231DFASFD";
                    depozitBonusTerms = "1231ASDdas";
                    maxCashout = "No max cashout";
                
}
                break;
            case 134244:
                if (BannerID === 26344) {
                    
                    freeBonusHeader = "123";
                    freeBonusCode = "123";
                    freeBonusCodeForTerms = "123";
                    depozitBonusHeader = "123";
                    depozitBonusCode = "123";
                    depozitBonusCodeForTerms = "123";
                    freeBonusTerms = "123";
                    depozitBonusTerms = "123";
                    maxCashout = "123";
                
                }
                
                else if (BannerID === 26345) {

                    freeBonusHeader = "123455";
                    freeBonusCode = "12345";
                    freeBonusCodeForTerms = "12345";
                    depozitBonusHeader = "12345";
                    depozitBonusCode = "12345";
                    depozitBonusCodeForTerms = "12345";
                    freeBonusTerms = "1234";
                    depozitBonusTerms = "1234";
                    maxCashout = "12345";
                
}

                else if (BannerID === 26346) {
                    
                    freeBonusHeader = "123455";
                    freeBonusCode = "12345";
                    freeBonusCodeForTerms = "12345";
                    depozitBonusHeader = "12345";
                    depozitBonusCode = "12345";
                    depozitBonusCodeForTerms = "12345";
                    freeBonusTerms = "1234";
                    depozitBonusTerms = "1234";
                    maxCashout = "12345";
                
                }
break;
            case 134245:
                if (BannerID === 26341) {
                    
                    freeBonusHeader = "123455";
                    freeBonusCode = "12345";
                    freeBonusCodeForTerms = "12345";
                    depozitBonusHeader = "12345";
                    depozitBonusCode = "12345";
                    depozitBonusCodeForTerms = "12345";
                    freeBonusTerms = "1234";
                    depozitBonusTerms = "1234";
                    maxCashout = "12345";
                
                }
                break;
            case 137176:
                if (BannerID === 26917) {

                    freeBonusHeader = "Nova vrednost 1";
                    freeBonusCode = "Nova vrednost 1";
                    freeBonusCodeForTerms = "Nova vrednost 1";
                    depozitBonusHeader = "Nova vrednost 1";
                    depozitBonusCode = "Nova vrednost 1";
                    depozitBonusCodeForTerms = "Nova vrednost 1";
                    freeBonusTerms = "Nova vrednost 1";
                    depozitBonusTerms = "Nova vrednost 1";
                    maxCashout = "Nova vrednost 1";
                
}
                
                else if (BannerID === 26918) {

                    freeBonusHeader = "Nova vrednost 1";
                    freeBonusCode = "Nova vrednost 1";
                    freeBonusCodeForTerms = "Nova vrednost 1";
                    depozitBonusHeader = "Nova vrednost 1";
                    depozitBonusCode = "Nova vrednost 1";
                    depozitBonusCodeForTerms = "Nova vrednost 1";
                    freeBonusTerms = "Nova vrednost 1";
                    depozitBonusTerms = "Nova vrednost 1";
                    maxCashout = "Nova vrednost 1";
                
}

                else if (BannerID === 26919) {
freeBonusHeader = "Nova vrednost 2";
                    freeBonusCode = "Nova vrednost 2";
                    freeBonusCodeForTerms = "Nova vrednost 2";
                    depozitBonusHeader = "Nova vrednost 2";
                    depozitBonusCode = "Nova vrednost 2";
                    depozitBonusCodeForTerms = "Nova vrednost 2";
                    freeBonusTerms = "Nova vrednost 2";
                    depozitBonusTerms = "Nova vrednost 2";
                    maxCashout = "Nova vrednost 2";
}
break;
            case 137179:
                if (BannerID === 26911) {

                    freeBonusHeader = "Nova vrednost 3";
                    freeBonusCode = "Nova vrednost 3";
                    freeBonusCodeForTerms = "Nova vrednost 3";
                    depozitBonusHeader = "Nova vrednost 3";
                    depozitBonusCode = "Nova vrednost 3";
                    depozitBonusCodeForTerms = "Nova vrednost 3";
                    freeBonusTerms = "Nova vrednost 3";
                    depozitBonusTerms = "Nova vrednost 3";
                    maxCashout = "Nova vrednost 3";
                
}
                break;
            case 131122:
                if (BannerID === 26078) {

                    freeBonusHeader = "Test";
                    freeBonusCode = "Test";
                    freeBonusCodeForTerms = "Test";
                    depozitBonusHeader = "Test";
                    depozitBonusCode = "Test";
                    depozitBonusCodeForTerms = "Test";
                    freeBonusTerms = "Test";
                    depozitBonusTerms = "Test";
                    maxCashout = "Test";
                
}
                break;default:
				freeBonusHeader = "$100 FREE CHIP";
				freeBonusCode = "CODE";	
				freeBonusCodeForTerms = "CODE";
				depozitBonusHeader = "100% NO RULES";
				depozitBonusCode = "CODE";
				depozitBonusCodeForTerms = "CODE";
				freeBonusTerms = ": Value: $100; Wagering: x30; Max cash out: $100; Max bet per hand: None; Allowed games: All games except Bonus Restricted games & Progressive slots; Allowed countries: US, Canada, Australia, New Zealand, Italy, Germany, Sweden, Norway";
				depozitBonusTerms = ":Value: 100% boost on first deposit; Wagering: 1x(Deposit + Bonus); Max cash out: None; Max bet per hand: None; Allowed games: All games; Minimum Deposit: $20; Max Bonus: $300.";		
				maxCashout = "NO MAX CASH OUT";				
            break;
		
    }
	console.log(affiliateID);
    document.getElementById('freeBonusHeader').textContent = freeBonusHeader;
	document.getElementById('freeBonusCode').textContent = freeBonusCode;
	document.getElementById('freeBonusCodeForTerms').textContent = freeBonusCodeForTerms;
	document.getElementById('depozitBonusCodeForTerms').textContent = depozitBonusCodeForTerms;
	
	document.getElementById('depozitBonusHeader').textContent = depozitBonusHeader;
	document.getElementById('depozitBonusCode').textContent = depozitBonusCode;
	
	document.getElementById('maxCashout').textContent = maxCashout;
	
	//document.getElementById('freeBonusTerms').textContent = freeBonusTerms;
	//document.getElementById('depozitBonusTerms').textContent = depozitBonusTerms;
	
	// var pElementFreeBonusTerms = document.getElementById('freeBonusTerms');
	// pElementFreeBonusTerms.insertAdjacentHTML('beforeend', freeBonusTerms);
	
	
	var pElement = document.getElementById('freeBonusTerms');
	var currentContent = pElement.innerHTML;
	var newContent = freeBonusTerms;
	pElement.innerHTML = currentContent + newContent;
	
	var pElement2 = document.getElementById('depozitBonusTerms');
	var currentContent2 = pElement2.innerHTML;
	var newContent2 = depozitBonusTerms;
	pElement2.innerHTML = currentContent2 + newContent2;
	
}

let affiliateID = setTextBasedOnAffiliateID();

function singUp(event) {
    event.preventDefault();
    document.getElementById('singupLoader').style = null;
    document.getElementById('signupText').style.display = 'none';
    document.getElementById('BtnSignup').disabled = true;
	const affid = getCookieValueLocalAffID('affid');

    const data = {
        firstName: document.getElementById('firstName').value.trim()[0].toUpperCase() + document.getElementById('firstName').value.trim().slice(1),
        lastName: document.getElementById('lastName').value.trim()[0].toUpperCase() + document.getElementById('lastName').value.trim().slice(1),
        userName: document.getElementById('userName').value.trim(),
        password: document.getElementById('password-singUp').value.trim(),
        email: document.getElementById('email').value.trim(),
        phoneNumber: document.getElementById('phoneNumber').value.trim(),
        birthDate: document.getElementById('birth-year').value + "-" + document.getElementById('month').value + "-" + document.getElementById('day').value,
        countryId: document.getElementById('Se_Countries').value,
        affiliateId: affid,
        address: document.getElementById('address').value,
        zipCode: document.getElementById('zipCode').value,
        state: null,
        gender: document.getElementById('gender').value === "male" ? true : false,
        couponCode: selectedPromos?.promo_2?.rowCode ?? selectedPromos?.promo_1?.rowCode ?? null
    }

    $.ajax({
        type: 'POST',
        url: "https://api.mrocasino.com/Authorization/signup",
        contentType: 'application/json',
        data: JSON.stringify(data),
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            document.getElementById('modal').style.display='block';
            document.getElementById('singupLoader').style.display = 'none';
            document.getElementById('signupText').style = null;
            document.getElementById('BtnSignup').disabled = false;
            mainloginform.classList.add('Close');
            playNowButton.textContent = 'PLAY NOW!';
			
			_cio.identify({
				id: response?.email?.toLowerCase(),
				login: response?.username,
				Country: response?.country,
				name: response?.name,
				birthdate: new Date(new Date(response?.birthDate).setFullYear(1973)).toISOString().split('T')[0],
				last_login: new Date(response?.lastLogin).toISOString(),
				created_at: response?.created,
				created: new Date(response?.created).toISOString(),
				last_bet: response?.lastBet ? new Date(response?.lastBet).toISOString() : "-",
				last_deposit: response?.lastDeposit ? new Date(response?.lastDeposit).toISOString() : "-",
				player_class: response?.playerClass,
				gender: response?.gender,
				age: response?.age,
				total_deposits_count: response.totalDepositsCount,
				total_withdrawals_count: response?.totalWithdrawalsCount,
				total_deposit_amount: response?.totalDeposits,
				total_withdrawals_amount: response?.totalWithdrawals,
				yestrday_deposit: response?.yestrdayDeposit,  
				email: response?.email  
			  });
        },
        error: function (error) {
            document.getElementById('signupText').style = null;
            document.getElementById('singupLoader').style.display = 'none';
            document.getElementById('BtnSignup').disabled = false;

            document.getElementById('singUpError').style = null;
            document.getElementById('singUpError').innerHTML = error?.responseJSON?.message;
            setTimeout(() => {
                document.getElementById('singUpError').style.display = 'none';
                document.getElementById('singUpError').innerHTML = '';
            }, 5000);
        }
    });

    return false;
}

function logIn(event) {
    event.preventDefault();
    document.getElementById('loginLoader').style = null;
    document.getElementById('loginText').style.display = 'none';
    document.getElementById('BtnPopup_Login').disabled = true;


    const data = {
        userName: document.getElementById('username').value.trim(),
        password: document.getElementById('password').value.trim(),
				cf_token: "TarikToken",
        couponCode: selectedPromos?.promo_2?.rowCode ?? selectedPromos?.promo_1?.rowCode ?? null

    }

    $.ajax({
        type: 'POST',
        url: "https://api.mrocasino.com/Authorization/signin",
        contentType: 'application/json',
        data: JSON.stringify(data),
        xhrFields: {
            withCredentials: true
        },
        success: function (response) {
            var url = "https://mrocasino.com";
            if(selectedPromos?.promo_2?.rowCode || selectedPromos?.promo_1?.rowCode) url += `?coupon=${selectedPromos?.promo_2?.rowCode || selectedPromos?.promo_1?.rowCode}`;
            window.location.href = url;
            document.getElementById('loginLoader').style.display = 'none';
            document.getElementById('loginText').style = null;
            document.getElementById('BtnPopup_Login').disabled = false;
        },
        error: function (error) {
            document.getElementById('loginText').style = null;
            document.getElementById('loginLoader').style.display = 'none';
            document.getElementById('BtnPopup_Login').disabled = false;

            document.getElementById('loginError').style = null;
            document.getElementById('loginError').innerHTML = error?.responseJSON?.message;
            setTimeout(() => {
                document.getElementById('loginError').style.display = 'none';
                document.getElementById('loginError').innerHTML = '';
            }, 5000);
        }
    });

    return false;
}

function confirmRegistraion() {
    var url = "https://mrocasino.com";
    if(selectedPromos?.promo_2?.rowCode || selectedPromos?.promo_1?.rowCode) url += `?coupon=${selectedPromos?.promo_2?.rowCode || selectedPromos?.promo_1?.rowCode}`;
    window.location.href = url;
}
