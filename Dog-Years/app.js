
//Pass human years to convert into dog years

function humanAgeInDogYears(age){
    let earlyYears = 2;
    earlyYears *= 10;
    let laterYears = age - 2;
    laterYears *= 4;

    return earlyYears + laterYears;
}