function getValue(letter) {
   // TODO: Determine why we have different characters. It comes from the dataset
   if(['а', 'a', 'я', 'о', 'o', 'у','и', 'о', 'е', 'ъ'].some((a)=>a === letter)) {
       return 0;
   } else if(letter === 'б' || letter === 'п') {
       return 1;
   } else if(letter === 'в' || letter === 'ф') {
       return 2;
   } else if(letter === 'д' || letter === 'т') {
       return 3;
   } else if(letter === 'м' || letter === 'н') {
       return 4;
   } else if(letter === 'г' || letter === 'к') {
       return 5;
   } else if(letter === 'з' || letter === 'с') {
       return 6;
   } else if(['л', 'р', 'х', 'ц', 'ч', 'щ', 'ш','ж'].some((a)=>a === letter)) {
        return 7;
   } else if(['ю', 'й', 'ь'].some((a)=>a === letter)) {
       return 8;
   } else {
       return -1;
   }
}

const fs = require('fs');
let rawdata = fs.readFileSync('./names.json');
// TODO: Clean dataset
let names = JSON.parse(rawdata).map((obj)=>obj["Мъжки Имена"].toLocaleLowerCase('bg'));

function removeGroups(word) {
    const visited = [];
    const replaceGroups = [];
    for(let i = 0; i < word.length; i++) {
        const currentLetter = word[i];
        let y = i + 1;
        let nextLetter = word[y];
        let hasNextDuplicate = false;
        while (currentLetter === nextLetter && !visited[y]) {
            visited[y] = true;
            hasNextDuplicate = true;
            y++;
            nextLetter = word[y];
        }
        if (hasNextDuplicate) {
            replaceGroups.push([i, y - 1]);
        }
    }
    if(replaceGroups.length > 0){
        let newWord = '';
        let start = 0;
        for(let z = 0; z < replaceGroups.length; z++) {
            const part1 = word.substring(start, replaceGroups[z][0]);
            const part2 = word[replaceGroups[z][0]];
            const part3 = replaceGroups[z+1] ? '' : word.substring(replaceGroups[z][1] + 1);
            newWord += (part1 + part2 + part3);
            start = replaceGroups[z][1] + 1;
        }
        return newWord;
    }
    return word;
}

function addTrailingZeroes(word) {
    if(word.length === 1) {
        word += '000';
    }
    if(word.length === 2) {
        word += '00';
    }
    if(word.length === 3) {
        word += '0';
    }
    return word;
}

function getLettersToWeight(name) {
    let weights = '';
    for(let x = 1; x < name.length; x++) {
        const value = getValue(name[x]);
        if(value !== -1) {
            weights += value;
        }
    }
    return weights;
}

const result = {};
for(let i = 0; i < names.length; i++) {
    let score = names[i][0] + getLettersToWeight(names[i]);
    // Remove zeroes
    score = score.replace(/0/g, '');
    // Remove group of numbers '776' to become '76'
    score = removeGroups(score);
    // 'ю7' to become 'ю700'
    score = addTrailingZeroes(score);
    if(score.length > 4) {
        score = score.substring(0, 4);
    }
    if(!result[score]) {
        result[score] = [];
    }
    result[score].push(names[i]);
}

Object.keys(result).forEach((key)=>{
   console.log(key, result[key]);
});
