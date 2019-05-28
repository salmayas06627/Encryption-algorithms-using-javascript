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
        console.log(outkey.join(''));
        //=========================================================
        //To replace any j with i:
        for (var i = 0; i < outkey.length; i++) {
            if (outkey[i] == 'j') {
                outkey[i] = 'i';
            }
        }
        console.log(outkey.join(''));
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
         console.log(onedimenstionarray);
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
        console.log(matrix);
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
                    // getmodifiedintext += intext.charAt(t+1);
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
                                console.log(subhelp);
                                getmodifiedintext = getmodifiedintext.slice(0, t) + subhelp;
                                console.log(getmodifiedintext);
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
        console.log( getmodifiedintextarray);
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
