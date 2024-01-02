import React, { useState, useEffect } from 'react';
import { Dimensions, Modal, StyleSheet, Text, View, Pressable } from 'react-native';
import { Input } from "react-native-elements";
import SelectDropdown from 'react-native-select-dropdown'
import * as locationApi from "../api/locationApi";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const LocationModal = (props) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [currentProvince, setCurrentProvince] = useState({});
    const [currentDistrict, setCurrentDistrict] = useState({});
    const [currentWard, setCurrentWard] = useState({});
    const [address, setAddress] = useState("");

    useEffect(() => {
        fetchProvinces();
    }, [])

    const fetchProvinces = async () => {
        let province = await locationApi.getAllProvinces()
        setProvinces(province);
    }

    const fetchDistrict = async (provinceId) => {
        let dist = await locationApi.searchDistrictsOfProvince(provinceId)
        setDistricts(dist);
    }

    const fetchWard = async (provinceId, distId) => {
        let ward = await locationApi.searchWardsOfDistrict(provinceId, distId)
        setWards(ward);
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    props.close()
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Chọn địa điểm</Text>
                        <SelectDropdown
                            search
                            data={provinces}
                            defaultButtonText="Chọn Tỉnh/Tp"
                            onSelect={(selectedItem, index) => {
                                setCurrentProvince(selectedItem);
                                setDistricts([])
                                setCurrentDistrict({})
                                setWards([])
                                setCurrentWard({})
                                fetchDistrict(selectedItem.code)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.name
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.name
                            }}
                        />
                        <SelectDropdown
                            search
                            data={districts}
                            defaultButtonText="Chọn Quận/huyện"
                            disabled={districts.length == 0}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index);
                                setCurrentDistrict(selectedItem);
                                setWards([])
                                setCurrentWard({})
                                fetchWard(currentProvince.code, selectedItem.code)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.name
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.name
                            }}
                        />
                        <SelectDropdown
                            search
                            data={wards}
                            defaultButtonText="Chọn Xã/Phường"
                            disabled={wards.length == 0}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                                setCurrentWard(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.name
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.name
                            }}
                        />
                        <View>
                            <Input
                                placeholder="Địa chỉ chi tiết"
                                value={address}
                                onChangeText={(text) => setAddress(text)}
                                inputContainerStyle={styles.inputField}
                            />
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                if (address && currentWard && currentDistrict && currentProvince) {
                                    props.setLocation(address + ", " + currentWard.name + ", " + currentDistrict.name + ", " + currentProvince.name)
                                    props.close()
                                } else {
                                    alert("Vui lòng nhập địa chỉ đầy đủ.");
                                }
                            }}
                        >
                            <Text style={styles.textStyle}>Xác nhận địa chỉ</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    inputField: {
        width: deviceWidth * 0.7,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default LocationModal;