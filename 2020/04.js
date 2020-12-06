const inputTest = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;
const input = require('./input/04');

const invalid = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`;

const validInput = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;


const CID = 'cid';

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', CID];

const parsed = input.split('\n\n').map((row) => {
  const clean = row
    .trim()
    .replace(/\n/g, ' ')
    .split(' ')
    .map((group) => group.split(':'))
    .reduce((prev, curr) => {
      const [key, value] = curr;

      return {
        ...prev,
        [key]: value,
      }
    }, {});
  return clean;
});

function between(min, max, value) {
  const v = Number(value);
  return v >= min && v <= max;
}


function hair(value) {
  if (value.length !== 7) {
    return false;
  }

  const regex = RegExp('#[0-9]*(abcdef)*');

  return regex.test(value);
}

function height(value) {
  if (value.includes('cm')) {
    const num = Number(value.replace('cm', ''));
    return between(150, 193, num);
  } else if (value.includes('in')) {
    const num = Number(value.replace('in', ''));
    return between(59, 76, num);
  }

  return false;
}

const numberRules = {
  'byr': (value) => between(1920, 2002, value),
  'iyr': (value) => between(2010, 2020, value),
  'eyr': (value) => between(2020, 2030, value),
  'hcl': (value) => hair(value),
  'hgt': (value) => height(value),
  'ecl': (value) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
  'pid': (value) => value.length === 9,
  [CID]: () => true,
}

function validateFields(passport) {
  const hasInvalid = Object.entries(passport).some(([key, value]) => {
    return numberRules[key](value) === false;
  })


  return hasInvalid;
}

let valid = [];
let numValid = [];
let allValid = 0;
parsed.forEach((passport) => {
  const all = Object.keys(passport);

  const missingFields = requiredFields.filter((key) => !all.includes(key))

  if (missingFields.length === 0 || (missingFields.length === 1 && missingFields[0] === CID)) {
    valid.push(passport);
    const hasInvalid = validateFields(passport);
    if (!hasInvalid) {
      allValid++;
    }
    numValid++;
  }
})

console.log('Num Valid', numValid); // => 237
console.log('all fields', allValid); // => 172
