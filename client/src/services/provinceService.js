import province from "../constants/provinceDistrictWard/province.json";
import district from "../constants/provinceDistrictWard/district.json";
import ward from "../constants/provinceDistrictWard/ward.json";

class ProvinceService {
  getOptionsProvince() {
    return Object.values(province).map((el) => {
      return {
        ...el,
        label: el.name,
        value: el.code,
      };
    });
  }

  getOptionsDistrict(provinceCode) {
    if (provinceCode) {
      return Object.values(district)
        .map((el) => {
          return {
            ...el,
            label: el.name,
            value: el.code,
          };
        })
        .filter((el) => el.parent_code === provinceCode);
    }

    return [];
  }

  getOptionsWard(districtCode) {
    if (districtCode) {
      return Object.values(ward)
        .map((el) => {
          return {
            ...el,
            label: el.name,
            value: el.code,
          };
        })
        .filter((el) => el.parent_code === districtCode);
    }

    return [];
  }
}

export default new ProvinceService();
