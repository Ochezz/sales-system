const cityList = [
  {
    city: "서울",
    dpName: "서울",
    count: 0,
  },
  {
    city: "부산",
    dpName: "부산",
    count: 0,
  },
  {
    city: "대구",
    dpName: "대구",
    count: 0,
  },
  {
    city: "인천",
    dpName: "인천",
    count: 0,
  },
  {
    city: "광주",
    dpName: "광주",
    count: 0,
  },
  {
    city: "대전",
    dpName: "대전",
    count: 0,
  },
  {
    city: "울산",
    dpName: "울산",
    count: 0,
  },
  {
    city: "세종",
    dpName: "세종",
    count: 0,
  },
  {
    city: "경기도",
    dpName: "경기",
    count: 0,
  },
  {
    city: "강원도",
    dpName: "강원",
    count: 0,
  },
  {
    city: "충청북도",
    dpName: "충북",
    count: 0,
  },
  {
    city: "충청남도",
    dpName: "충남",
    count: 0,
  },
  {
    city: "전라북도",
    dpName: "전북",
    count: 0,
  },
  {
    city: "전라남도",
    dpName: "전남",
    count: 0,
  },
  {
    city: "경상북도",
    dpName: "경북",
    count: 0,
  },
  {
    city: "경상남도",
    dpName: "경남",
    count: 0,
  },
  {
    city: "제주",
    dpName: "제주",
    count: 0,
  },
];

const regionMap = (infos) => {
  let result = cityList.map(item => {return {...item}})

  infos.forEach((info) => {
    let infoCity = info.address1;
    let findCityIdx = result.findIndex((city) =>
      new RegExp(city.city).test(infoCity)
    );
    if (findCityIdx != -1) {
      result[findCityIdx].count += info.count;
    }
  });

  return result.filter(city => city.count != 0);
};

export { regionMap };
