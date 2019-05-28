function CaesarCipherEncrypt() {
        var n = parseInt(key.value);
        var intext = plain.value;
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
