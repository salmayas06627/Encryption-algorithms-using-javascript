window.onload = function () {
    //elements& style
    document.body.style.backgroundImage = "url('social-hacking.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "100% 120%";

    var sel = document.createElement("select");
    var option1 = document.createElement("option");
    option1.text = "caesar cipher";
    sel.add(option1);
    var option2 = document.createElement("option");
    option2.text = "Playfair cipher";
    sel.add(option2);
    var option3 = document.createElement("option");
    option3.text = "DES cipher";
    sel.add(option3);
    var option4 = document.createElement("option");
    option4.text = "RC4 cipher";
    sel.add(option4);
    var option5 = document.createElement("option");
    option5.text = "RSA cipher";
    sel.add(option5);

    sel.style.border = "5px solid #000000";
    sel.style.borderRadius = "10px";
    sel.style.margin = "5px 5px 5px 100px";
    sel.style.padding = "10px";

    var div = document.createElement("div");
    div.style.margin = "10% 40% 10% 40%";

    var plain = document.createElement("textarea");
    plain.placeholder = "Plaintext";
    plain.style.backgroundColor = "#000000";
    plain.style.color = "white";
    plain.style.fontSize = "40";
    plain.style.borderRadius = "5px";
    plain.style.borderColor = "#000000";
    plain.style.display = "block";
    plain.style.height = "100px";
    plain.style.width = "300px";
    plain.style.margin = "10px";

    var cipher = document.createElement("textarea");
    cipher.placeholder = "Ciphertext";
    cipher.style.fontSize = "40";
    cipher.style.backgroundColor = "#000000";
    cipher.style.color = "white";
    cipher.style.borderRadius = "5px";
    cipher.style.borderColor = "#000000";
    cipher.style.height = "100px";
    cipher.style.width = "300px";
    cipher.style.display = "block";
    cipher.style.margin = "10px";

    var key = document.createElement("input");
    key.type = "text";
    key.placeholder = "key";
    key.style.fontSize = "40";
    key.style.backgroundColor = "#000000";
    key.style.color = "white";
    key.style.borderRadius = "5px";
    key.style.margin = "5px 5px 5px 100px";
    key.style.borderColor = "#000000";

    var btn1 = document.createElement("input");
    btn1.type = "button";
    btn1.value = "Encrypt";
    btn1.style.marginLeft = "90px";
    btn1.className = "btn btn-primary";

    var btn2 = document.createElement("input");
    btn2.type = "button";
    btn2.value = "Decrypt";
    btn2.className = "btn btn-primary";
    btn2.style.marginLeft = "5px";
    div.append(plain, cipher, key, sel, btn1, btn2);
    document.body.append(div);

    //functions:
    //caeser programming:   
    function CaesarCipherEncrypt() {
        // console.log(key.value);
        var n = parseInt(key.value);
        //console.log(typeof(n));
        var intext = plain.value;
        // console.log(intext);
        var txt1 = "abcdefghijklmnopqrstuvwxyz";
        var txt2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var outtxt = new Array(intext.length);
        for (var i = 0; i < intext.length; i++) {
            for (var j = 0; j < 26; j++) {
                if (intext[i] == txt1[j]) {
                    outtxt[i] = txt1[(j + n) % 26];
                } else if (intext[i] == txt2[j]) {
                    outtxt[i] = txt2[(j + n) % 26];
                } else if (intext[i] == ' ') {
                    outtxt[i] = ' ';
                } else {
                    continue;
                }
            }
        }
        cipher.value = outtxt.join("");
    }
    function CaesarCipherDecrypt() {
        var n = parseInt(key.value);
        var intext = cipher.value;
        var txt1 = "abcdefghijklmnopqrstuvwxyz";
        var txt2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var outtxt = new Array(intext.length);
        for (var i = 0; i < intext.length; i++) {
            for (var j = 0; j < 26; j++) {
                if (intext[i] == txt1[j]) {
                    outtxt[i] = txt1[(j - n) % 26];
                    if ((j - n) < 0) {
                        outtxt[i] = txt1[(j - n) + 26];
                    }
                } else if (intext[i] == txt2[j]) {
                    outtxt[i] = txt2[(j - n) % 26];
                    if ((j - n) < 0) {
                        outtxt[i] = txt1[(j - n) + 26];
                    }
                } else if (intext[i] == ' ') {
                    outtxt[i] = ' ';
                } else {
                    continue;
                }
            }
        }
        plain.value = outtxt.join("");
    }
    //playfair programming:
    function playfairencrypt() {
        var n = key.value;
        //=================================================================       
        //for delete any repeating char in the key:
        var outkey = new Array();
        var count = 0;
        var length = n.length;
        for (var k = 0; k < n.length; k++) {
            // console.log(n.length);
            for (var j = k + 1; j <= n.length; j++) {
                if (n[j] != n[k]) {
                    count++;
                }
                else {
                    // for deleting the second repeating char from the input key:
                    n = n.slice(0, j) + n.slice(j + 1, n.length);
                    length = length - 1;
                    //for putting the first char of the repeating in the array:
                    outkey[k] = n[k];
                }
                if ((count == length - 1) || (k == n.length - 1)) {
                    outkey[k] = n[k];
                }
            }
            count = 0;
            length = length - 1;
        }
        //console.log(outkey.join(''));
        //=========================================================
        //To replace any j with i:
        for (var i = 0; i < outkey.length; i++) {
            if (outkey[i] == 'j') {
                outkey[i] = 'i';
            }
        }
        //console.log(outkey.join(''));
        //=========================================================
        // to put the modified key with the non repeating char from alphabet:
        var string = outkey.join('');
        var newalphabet = string + "abcdefghiklmnopqrstuvwxyz";
        var onedimenstionarray = new Array();
        var count1 = 0;
        var length1 = newalphabet.length;
        for (var k = 0; k < newalphabet.length; k++) {
            for (var j = k + 1; j <= newalphabet.length; j++) {
                if (newalphabet[j] != newalphabet[k]) {
                    count1++;
                }
                else {
                    // for deleting the second repeating char from the input key:
                    newalphabet = newalphabet.slice(0, j) + newalphabet.slice(j + 1, newalphabet.length);
                    length1 = length1 - 1;
                    //for putting the first char of the repeating in the array:
                    onedimenstionarray[k] = newalphabet[k];
                }
                if ((count1 == length1 - 1) || (k == newalphabet.length - 1)) {
                    onedimenstionarray[k] = newalphabet[k];
                }
            }
            count1 = 0;
            length1 = length1 - 1;
        }
        //console.log(onedimenstionarray);
        //=============================================================
        //making 5*5 matrix:
        var k = 0;
        var matrix = new Array(5);
        for (var i = 0; i < 5; i++) {
            matrix[i] = new Array(5);
        }
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                matrix[i][j] = onedimenstionarray[k];
                k++;
            }
        }
        // console.log(matrix);
        //==============================================================
        //format plaintext:
        var intext = plain.value;
        //for replacing any j in plaintext with i:
        for (var e = 0; e < intext.length; e++) {
            if (intext.charAt(e) == 'j') {
                intext.charAt(e) = 'i';
            }
        }
        //to get the index of the first one of the repeated chars:
        var getrepeatindex = new Array();
        var help1 = 1;
        var help2 = 0;
        for (var i = 0; i < intext.length; i++) {
            if (intext[help1] == intext[i]) {
                getrepeatindex[help2] = i;
                help2++;
                help1++;
            }
            else {
                help1++;
            }
        }
        var help3 = 0;
        var getmodifiedintext = "";
        if (intext.length % 2 != 0) {
            for (var t = 0; t < intext.length;) {
                if (t == getrepeatindex[help3]) {
                    getmodifiedintext += intext.charAt(t);

                    if (getmodifiedintext.length % 2 != 0) {
                        getmodifiedintext += 'x';
                        t++;
                    } else {
                        for (var e = 0; e < getmodifiedintext.length;) {
                            var subhelp = getmodifiedintext.substr(e, 2);
                            if (subhelp.charAt(0) != subhelp.charAt(1)) {
                                e += 2;
                            } else {
                                subhelp = subhelp.charAt(0) + 'x' + subhelp.charAt(1);
                                //console.log(subhelp);
                                getmodifiedintext = getmodifiedintext.slice(0, t) + subhelp;
                                //console.log(getmodifiedintext);
                                e += 2;
                            }
                        }
                        t++;
                    }
                    help3++;
                } else {
                    getmodifiedintext += intext.charAt(t);
                    t++;
                }
            }
        }
        var getmodifiedintextarray = new Array();
        var s = 0;
        for (var d = 0; d < getmodifiedintext.length / 2; d++) {
            getmodifiedintextarray[d] = getmodifiedintext.substr(s, 2);
            s += 2;
        }
        //console.log(getmodifiedintextarray);
        //=============================================================
        //get dimensions of every char in modified input:
        var part1;
        var part2;
        var part3;
        var part4;
        var encrypt = "";
        for (var b = 0; b < getmodifiedintextarray.length;) {
            var sub = getmodifiedintextarray[b];
            for (var l = 0; l < 5; l++) {
                for (var j = 0; j < 5; j++) {
                    // console.log(sub);
                    if (sub.charAt(0) == matrix[l][j]) {
                        part1 = l;
                        part2 = j;
                    } else if (sub.charAt(1) == matrix[l][j]) {
                        part3 = l;
                        part4 = j;
                    }
                    else {
                        continue;
                    }
                }
            }
            if (part1 == part3) {
                if (part2 == 4) {
                    part2 = 0;
                    part4 += 1;
                }
                else if (part4 == 4) {
                    part4 = 0;
                    part2 += 1;
                } else {
                    part2 += 1;
                    part4 += 1;
                }
            } else if (part2 == part4) {
                if (part1 == 4) {
                    part1 = 0;
                    part3 += 1;
                }
                else if (part3 == 4) {
                    part3 = 0;
                    part1 += 1;
                } else {
                    part1 += 1;
                    part3 += 1;
                }
            } else {
                var temp7 = part2;
                part2 = part4;
                part4 = temp7;
            }
            b++;
            encrypt += matrix[part1][part2] + matrix[part3][part4];
        }
        //=============================================================
        cipher.value = encrypt;
    }
    //DES programming:
    function DESencrypt() {
        //1- key generation steps:
        let keyword = key.value;
        //1-1- extend key :
        var Extendedkey = new Array(keyword.length);
        for (var i = 0; i < keyword.length; i++) {
            // adding zero to the start make key length=64 as ascii =7bits only!
            Extendedkey[i] = 0 + "" + keyword.charCodeAt(i).toString(2);
        }
        //console.log("Extendedkey" + Extendedkey.join(""));
        //console.log("Extendedkey" + Extendedkey.join("").length);
        var Permutechoice1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27,
            19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29,
            21, 13, 5, 28, 20, 12, 4];
        var Shortenkey = new Array(56);
        for (var i = 0; i < 56; i++) {
            Shortenkey[i] = Extendedkey.join("").charAt(Permutechoice1[i] - 1);
        }
        //console.log("shortenkey "+Shortenkey.join(""));
        //console.log("shortenkey "+Shortenkey.join("").length);
        //=====================================================

        var Numleftshifts = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
        var permutedchoice2 = [
            14, 17, 11, 24, 1, 5,
            3, 28, 15, 6, 21, 10,
            23, 19, 12, 4, 26, 8,
            16, 7, 27, 20, 13, 2,
            41, 52, 31, 37, 47, 55,
            30, 40, 51, 45, 33, 48,
            44, 49, 39, 56, 34, 53,
            46, 42, 50, 36, 29, 32
        ];
        var Dbox = [
            32, 1, 2, 3, 4, 5,
            4, 5, 6, 7, 8, 9,
            8, 9, 10, 11, 12, 13,
            12, 13, 14, 15, 16, 17,
            16, 17, 18, 19, 20, 21,
            20, 21, 22, 23, 24, 25,
            24, 25, 26, 27, 28, 29,
            28, 29, 31, 31, 32, 1];
        let sbox1 = [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
            0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
            4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
            15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13
        ];
        let sbox2 = [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10,
            3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
            0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15,
            13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9
        ];
        let sbox3 = [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8,
            13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1,
            13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7,
            1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12
        ];
        let sbox4 = [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15,
            13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
            10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4,
            3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14
        ];
        let sbox5 = [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9,
            14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
            4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14,
            11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3
        ];
        let sbox6 = [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11,
            10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
            9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6,
            4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13
        ];
        let sbox7 = [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1,
            13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
            1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2,
            6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12
        ];
        let sbox8 = [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7,
            1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
            7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8,
            2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11
        ];
        var finalfuncpermute = [16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32,
            27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25];
        //================================================================
        //to get every 64 bit separate :
        let inputplaindes = plain.value;
        let DESplain = new Array(inputplaindes.length / 8);
        let j = 0;
        for (let i = 0; i < inputplaindes.length; i += 8) {
            DESplain[j] = inputplaindes.slice(i, i + 8);
            j++;
        }
        //console.log(DESplain);
        //2- to split plaintxt into 2 parts:
        //2-1- to extend plain :
        let Extendedplain = new Array(DESplain.length);
        let indexh = 0;
        let midvar = "";
        for (let i = 0; i < Extendedplain.length; i++) {
            // appending zero to the start make plaintxt length=64 as ascii =7bits only!
            while (indexh < 8) {
                midvar += 0 + "" + DESplain[i].charCodeAt(indexh).toString(2);
                indexh++;
            }
            Extendedplain[i] = midvar;
            indexh = 0;
            midvar = "";
        }
        //console.log(" Extendedplain"+Extendedplain.join(""));
        //console.log(" Extendedplain"+Extendedplain.join("").length);
        //2-2- doing initial permutation:
        var initialpermute = [58, 50, 42, 34, 26, 18, 10,
            2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57
            , 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23,
            15, 7];
        var initialplain = new Array(64);
        var initialhelpplain = new Array(Extendedplain.length);
        for (let j = 0; j < Extendedplain.length; j++) {
            for (var i = 0; i < 64; i++) {
                initialplain[i] = Extendedplain[j].charAt(initialpermute[i] - 1);
            }
            initialhelpplain[j] = initialplain.join("");
        }
        //============================================
        //2-3- divide permuted plain into 2 parts:
        let Rightplain = new Array(initialhelpplain.length);
        let Leftplain = new Array(initialhelpplain.length);
        let rightvar = "";
        let leftvar = "";
        for (let i = 0; i < initialhelpplain.length; i++) {
            for (let j = 0; j < 32; j++) {
                leftvar += initialhelpplain[i].charAt(j);
            }
            // let index2 = 0;
            for (let j = 32; j < 64; j++) {
                rightvar += initialhelpplain[i].charAt(j);
                // index2++;
            }
            Rightplain[i] = rightvar;
            Leftplain[i] = leftvar;
            rightvar = "";
            leftvar = "";
        }
        var NewRightplain = new Array(32);
        var NewLeftplain = new Array(32);
        //=========================================
        for (let i = 0; i < Rightplain.length;) {
            // console.log("RT" + Rightplain[i]);
            //console.log("LT" + Leftplain[i]);
            //1-2- to divide key into 2 parts: 
            var Rightpart = new Array(28);
            var Leftpart = new Array(28);
            for (let p = 0; p < 28; p++) {
                Leftpart[p] = Shortenkey.join("").charAt(p);
            }
            var index = 0;
            for (let u = 28; u < 56; u++) {
                Rightpart[index] = Shortenkey.join("").charAt(u);
                index++;
            }
            //console.log("mainleft " + Leftpart.join(""));
            //console.log("left " + Leftpart.join("").length);
            //console.log("mainright" + Rightpart.join(""));
            // console.log("right" + Rightpart.join("").length);
            //===========================================         
            let Round = 0;
            let Allkeys = new Array(16);
            // loop for 16 rounds:
            do {
                // console.log("RTw" + Rightplain[i]);
                //console.log("LTw" + Leftplain[i]);
                let num = 0;
                while (num < Numleftshifts[Round]) {
                    for (let i = 0; i < 28; i++) {
                        var t1 = Leftpart[0];
                        var t2 = Rightpart[0];
                        Leftpart[i] = Leftpart[i + 1];
                        Rightpart[i] = Rightpart[i + 1];
                    }
                    Leftpart[27] = t1;
                    Rightpart[27] = t2;
                    num++;
                }
                // console.log("left" + Leftpart.join(""));
                //console.log("right" + Rightpart.join(""));
                let collect = Leftpart.join("") + Rightpart.join("");
                //console.log(collect);
                // console.log(collect.length);
                let Shortenkey2 = new Array(48);
                for (let i = 0; i < 48; i++) {
                    Shortenkey2[i] = collect.charAt(permutedchoice2[i] - 1);
                }
                Allkeys[Round] = Shortenkey2.join("");
                //console.log(Shortenkey2.join("").length);
                //console.log(Shortenkey2.join(""));
                //=======================================================================
                // making places for new  right & left plain:
                for (let j = 0; j < 32; j++) {
                    NewLeftplain[j] = Rightplain[i].charAt(j);
                }
                //console.log("newleft" + NewLeftplain.join(""));
                //==============================
                //mixer:
                //1-Dbox Permutation:
                var helpright = new Array(48);
                for (let j = 0; j < 48; j++) {
                    helpright[j] = Rightplain[i].charAt(Dbox[j] - 1);
                }
                //console.log(helpright.join(""));
                //===============================
                //2-Whitener XOR:
                var keyrightxor = new Array(48);
                for (let j = 0; j < 48; j++) {
                    //xor=(p.!q)+(!p.q)
                    keyrightxor[j] = (parseInt(helpright.join("").charAt(j)) && (Number(!(parseInt(Allkeys[Round].charAt(j))))) || (Number(!(parseInt(helpright.join("").charAt(j)))) && (parseInt(Allkeys[Round].charAt(j)))));
                }
                //console.log(keyrightxor.join(""));
                //================================
                //3-Sbox :
                //3-1- creating 3d array :
                var Sbox = new Array(8);
                for (let m = 0; m < 8; m++) {
                    Sbox[m] = new Array(4);
                    for (let j = 0; j < 4; j++) {
                        Sbox[m][j] = new Array(16);
                    }
                }
                //console.log(Sbox);          
                //3-2- fill the 3d array with sboxes values:
                for (let n = 0; n < 8; n++) {
                    var b = 0;
                    for (let j = 0; j < 4; j++) {
                        for (let k = 0; k < 16; k++) {
                            if (n == 0) {
                                Sbox[n][j][k] = sbox1[b];
                                b++;
                            } else if (n == 1) {
                                Sbox[n][j][k] = sbox2[b];
                                b++;
                            } else if (n == 2) {
                                Sbox[n][j][k] = sbox3[b];
                                b++;
                            } else if (n == 3) {
                                Sbox[n][j][k] = sbox4[b];
                                b++;
                            } else if (n == 4) {
                                Sbox[n][j][k] = sbox5[b];
                                b++;
                            } else if (n == 5) {
                                Sbox[n][j][k] = sbox6[b];
                                b++;
                            } else if (n == 6) {
                                Sbox[n][j][k] = sbox7[b];
                                b++;
                            } else if (n == 7) {
                                Sbox[n][j][k] = sbox8[b];
                                b++;
                            } else {
                                break;
                            }
                        }
                    }
                }
                //console.log(Sbox);
                //====================================
                //3-4 To reduce the 48bit right to 32 again:
                //3-4-1- divide the array into 8 places each one with 6 bits:
                let sub = new Array(8);
                let indexofsubarray = 0;
                for (let i = 0; i < 48; i += 6) {
                    sub[indexofsubarray] = keyrightxor.join("").slice(i, i + 6);
                    indexofsubarray++;
                }
                //console.log(sub);
                var out = new Array(8);
                for (let d = 0; d < 8; d++) {
                    //for converting binary to decimal for sbox:
                    let help1 = parseInt((sub[d].charAt(0) + sub[d].charAt(5)), 2);
                    let help2 = parseInt((sub[d].slice(1, 5)), 2);
                    for (let j = 0; j < 4;) {
                        for (let k = 0; k < 16; k++) {
                            if (help1 == j) {
                                if (help2 == k) {
                                    out[d] = Sbox[d][j][k];
                                } else {
                                    continue;
                                }
                            }
                        }
                        j++;
                    }
                    //console.log(help1);
                    // console.log(help2);
                }
                //console.log(out);
                //for convertion the decimal out of sbox to binary :
                var outbinary = new Array(8);
                for (let v = 0; v < 8; v++) {
                    outbinary[v] = out[v].toString(2);
                    //for representing each number in 4 bits:
                    while (outbinary[v].length < 4) {
                        outbinary[v] = 0 + "" + outbinary[v];
                    }
                }
                //console.log(outbinary.join(""));
                //console.log(outbinary.join("").length);
                //===================================
                //4-final function permutation:
                var finalfuncpermutearr = new Array(32);
                for (let f = 0; f < 32; f++) {
                    finalfuncpermutearr[f] = outbinary.join("").charAt(finalfuncpermute[f] - 1);
                }
                //console.log(finalfuncpermutearr.join(""));
                //====================================================================
                //xor with leftpart out of the function:
                for (let s = 0; s < 32; s++) {
                    //xor=(p.!q)+(!p.q)
                    NewRightplain[s] = (parseInt(finalfuncpermutearr.join("").charAt(s)) && (Number(!(parseInt(Leftplain.join("").charAt(s))))) || (Number(!(parseInt(finalfuncpermutearr.join("").charAt(s)))) && (parseInt(Leftplain.join("").charAt(s)))));
                }
                //console.log("newright" + NewRightplain.join(""));
                Round++;
                Rightplain[i] = NewRightplain.join("");
                Leftplain[i] = NewLeftplain.join("");
                //console.log(Rightplain[i]);
                //console.log(Leftplain[i]);
            } while (Round < 16);
            i++;
        }
        //after the 16 rounds we swap the two parts:
        // console.log(Rightplain[0].length);
        let temp = "";
        let finalrightleft = new Array(Rightplain.length);
        for (let i = 0; i < Rightplain.length; i++) {
            temp = Rightplain[i];
            Rightplain[i] = Leftplain[i];
            Leftplain[i] = temp;
            finalrightleft[i] = Leftplain[i] + Rightplain[i];
        }
        //final permutation:
        let finalarray = new Array(finalrightleft.length);
        let finalarrayhelp = "";
        let finalDESpermute = [40, 8, 48, 16, 56, 24, 64, 32,
            39, 7, 47, 15, 55, 23, 63, 31,
            38, 6, 46, 14, 54, 22, 62, 30,
            37, 5, 45, 13, 53, 21, 61, 29,
            36, 4, 44, 12, 52, 20, 60, 28,
            35, 3, 43, 11, 51, 19, 59, 27,
            34, 2, 42, 10, 50, 18, 58, 26,
            33, 1, 41, 9, 49, 17, 57, 25];
        for (let j = 0; j < finalrightleft.length; j++) {
            for (let i = 0; i < 64; i++) {
                finalarrayhelp += finalrightleft[j].charAt(finalDESpermute[i] - 1);
            }
            finalarray[j] = finalarrayhelp;
            finalarrayhelp = "";
        }
        //console.log(finalarray.length);
        //===================================
        //to convert binary to string:
        let splitfinalarray = new Array(8);
        let charsarray = new Array(8);
        let finalcharsarray = new Array();
        let h = 0;
        for (let j = 0; j < finalarray.length; j++) {
            for (let i = 0; i < 64; i += 8) {
                splitfinalarray[h] = finalarray[j].slice(i, i + 8);
                h++;
            }
            for (let i = 0; i < 8; i++) {
                charsarray[i] = String.fromCharCode(parseInt(splitfinalarray[i], 2));
            }
            h = 0;
            finalcharsarray[j] = charsarray.join("");
        }
        //console.log(finalcharsarray);
        cipher.value = finalcharsarray.join("");
    }
    //RC4 programming:
    function RC4() {
        var mainkeyval = key.value;
        //to covert  the input text into its corresponding number:
        var mainkey = new Array(mainkeyval.length);
        for (let i = 0; i < mainkey.length; i++) {
            mainkey[i] = parseInt(mainkeyval[i]);
        }
        //console.log(mainkey);
        //============
        //intialization 
        //step1:
        var S = new Array(256);
        var T = new Array(256);
        let help5 = 0;
        for (let i = 0; i < 256; i++) {
            S[i] = i;
            if (mainkey.length == S.length) {
                T[i] = mainkey[i] % 256;
            } else {
                if (help5 < mainkey.length) {
                    T[i] = mainkey[help5] % 256;
                    help5++;
                } else {
                    help5 = 0;
                    T[i] = mainkey[help5];
                    help5++;
                }
            }
        }
        //console.log(S);
        //console.log(T);
        //===================
        //step2:
        let j = 0;
        let temp8;
        for (let i = 0; i < 256; i++) {
            j = (j + S[i] + T[i]) % 256;
            temp8 = S[i];
            S[i] = S[j];
            S[j] = temp8;
        }
        //console.log(S);
        //====================================
        //key generation:
        let j1 = 0;
        let temp9;
        let keyarray = new Array(256);
        for (let i = 0; i < 256; i++) {
            j1 = (j1 + S[i]) % 256;
            temp9 = S[i];
            S[i] = S[j];
            S[j] = temp9;
            keyarray[i] = S[(S[i] + S[j]) % 256];
        }
        //console.log(keyarray);
        //================================
        //to convert every number into equivelant binary:
        let keyarraywithascii = new Array(256);
        let help6;
        for (let i = 0; i < 256; i++) {
            help6 = keyarray[i].toString(2);
            //console.log(help6);
            while (help6.length < 8) {
                //to represent every number in 8 bits:
                help6 = 0 + "" + help6;
            }
            keyarraywithascii[i] = help6;
        }
        //console.log(keyarraywithascii);
        //console.log(keyarraywithascii.length);
        //==================================
        //to get the input from plainarea :
        var inputtxt = plain.value;
        /*to divide every char in the input into a separate place 
        in an array and converts it into binary:*/
        var inputarr = new Array(256);
        for (let i = 0; i < 256; i++) {
            inputarr[i] = 0 + "" + inputtxt.charCodeAt(i).toString(2);
        }
        //console.log(inputarr);
        //===================================
        // XOR for every byte in key (every place in array of keys)with every byte in plain:
        var xorarr = new Array(256);
        var midarr = new Array(8);
        for (let i = 0; i < 256; i++) {
            for (let j = 0; j < 8; j++) {
                //xor=(p.!q)+(!p.q)
                midarr[j] = (parseInt(inputarr[i].charAt(j)) && (Number(!(parseInt(keyarraywithascii[i].charAt(j))))) || (Number(!(parseInt(inputarr[i].charAt(j)))) && (parseInt(keyarraywithascii[i].charAt(j)))));
            }
            xorarr[i] = midarr.join("");
        }
        //console.log( xorarr);
        //=================================
        //to convert the every binary byte into its corresponding char:
        var finalarrayout = new Array(256);
        for (let i = 0; i < 256; i++) {
            finalarrayout[i] = String.fromCharCode(parseInt(xorarr[i], 2));
        }
        //console.log( finalarrayout);
        cipher.value = finalarrayout.join("");
    }
    //RSA programming:
    function RSAencrypt() {
       //1-key generation:
        /*let p=17 ,q=13
          then   n=221
          and   phi(n)=16*12=192
          let   e=7
               d.e= 1 mod 192
               then d=55
               public key ={7,192} , private key={55,192}
        */
        //2- get the input :
        let inputRSA = plain.value;
        const outasciiarray = new Array(inputRSA.length);
        for (let i = 0; i < outasciiarray.length; i++) {
            console.log(Math.pow(inputRSA.charCodeAt(i),5) % 21);
            outasciiarray[i] = String.fromCharCode(Math.pow(inputRSA.charCodeAt(i),5) % 21);
        }
        //console.log(outasciiarray);
        cipher.value = outasciiarray.join("");
    }
    function RSAdecrypt() {
       //1-key generation:
        /*let p=17 ,q=13
          then   n=221
          and   phi(n)=16*12=192
          let   e=7
               d.e= 1 mod 192
               then d=55
               public key ={7,192} , private key={55,192}
        */
        //2- get the input :
        let inputRSAdec = cipher.value;
        const outasciiarraydec = new Array(inputRSAdec.length);
        for (let i = 0; i < outasciiarraydec.length; i++) {
            console.log(Math.pow(inputRSAdec.charCodeAt(i),5) % 21);
            outasciiarraydec[i] = String.fromCharCode(Math.pow(inputRSAdec.charCodeAt(i),5) % 21);
        }
        console.log(outasciiarraydec);
        plain.value = outasciiarraydec.join("");
    }
    //event listener:
    btn1.addEventListener("click", function (event) {
        switch (sel.options[sel.selectedIndex].text) {
            case "caesar cipher":
                CaesarCipherEncrypt();
                break;
            case "Playfair cipher":
                playfairencrypt();
                break;
            case "DES cipher":
                DESencrypt();
                break;
            case "RC4 cipher":
                RC4();
                break;
            case "RSA cipher":
                RSAencrypt();
                break;
            default:
                alert("you must choose the cipher algorithm ")
        }
    });
    btn2.addEventListener("click", function (event) {
        switch (sel.options[sel.selectedIndex].text) {
            case "caesar cipher": CaesarCipherDecrypt();
                break;
            case "RSA cipher":
                RSAdecrypt();
                break;
            default:
                alert("you must choose the cipher algorithm ")
        }
    });
}