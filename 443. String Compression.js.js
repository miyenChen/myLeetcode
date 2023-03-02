/*
對一個參數名為 chars 的字符 Array 進行壓縮：
chars = ["a","a","b","c","d", "c","c"];
1. 相同的字為一組，進行疊加`,"aa", "b", "ccc", and "d"
2. 當組的字長度大於 1 時，保留一個，並在後方新增數量  "a2bc3d"
3. 將字符轉換為字符 array ["a","2","b","c","3", "d"]
注意：數字為10進位，如果數量有進位，將拆分成單個字符 "51" => "5", "1"
*/
/**
 * @param {character[]} chars
 * @return {number}
 */
/*
// 想不出來先參考
// 但這方法只對連續的重複值有效
// https://www.youtube.com/watch?v=HR5wG6hBowA
var compress = function (chars) {
    chars.push('end');
    // 將目標設為 array 第一個值
    let times = 0;
    let current = chars[0];
    while (current !== 'end') {
        if (chars[0] === current) {
            //頭幾個值，目標相同時持續計數，並將計過數的值移除
            //若只有一個接下來不同也會計到一次再移除
            times++;
            chars.shift();
            // console.log(chars, times);
        } else {
            // 接下來的值和前一個不同時，把前一個目標放到 arrary 最後
            // 當計數大於一，才將計數轉換成 string 放到數列
            chars.push(current);
            times > 1 && chars.push(...(times + '')); 
            // 把目標重設為接下來不同的值(數列第一位)，計數也歸 0
            times = 0;
            current = chars[0];
            // console.log(chars);
        }
    }
    chars.shift(); //移除'end'停止迴圈
    console.log(chars.length, chars);
    return chars.length;
};
compress(['a', 'a', 'a', 'b', 'b', 'c', 'c', 'b', 'a', 'c']); //9 ['a', '3', 'b', '2', 'c', '2', 'b', 'a', 'c']
compress(['a', 'a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b']); //5 [ 'a', '2', 'b', '1', '1' ]
*/
// //rest parameter
// let arr = [];
// let times = 54;
// arr.push(...(times + '')); //[ '5', '4' ]
// arr.push(times + ''); //[ '54' ]
// console.log(arr);

// 我的改良版
var compress = function (chars) {
    let arr = [];
    let times = 0;
    let current = chars[0];
    while (chars.length > 0) {
        let last = chars.length;
        for (let i = 0; i < last; i++) {
            if (chars[i] === current) {
                times++;
            }
        }
        chars = chars.filter(function (value, index, arr) {
            return value !== current;
        });
        arr.push(current);
        times > 1 && arr.push(...(times + ''));
        times = 0;
        current = chars[0];
    }
    chars = arr;
    console.log(chars, chars.length);
    return chars.length;
};

// compress(['a', 'a', 'a', 'b', 'b', 'c', 'c', 'b', 'a', 'c']);
// compress(['a', 'a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b']);
compress(['a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b']);
compress(['a', 'a', 'b', 'b', 'c', 'c', 'c']);
