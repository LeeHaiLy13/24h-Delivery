export const getAllProvinces = async () => {
    const response = await fetch('https://provinces.open-api.vn/api/p/');
    const json = await response.json();
    return json;
};

export const searchDistrictsOfProvince = async (provinceId) => {
    const response = await fetch(`https://provinces.open-api.vn/api/d/search/?q=*&p=${provinceId}`);
    const json = await response.json();
    return json;
};

export const searchWardsOfDistrict = async (provinceId, districtId) => {
    const response = await fetch(`https://provinces.open-api.vn/api/w/search/?q=*&p=${provinceId}&d=${districtId}`);
    const json = await response.json();
    return json;
};