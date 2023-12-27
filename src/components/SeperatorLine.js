import { StyleSheet, View } from "react-native";

export default function SeperatorLine() {
  return (
    <View style={styles.seperatorStyle}/>
  );
};

const styles = StyleSheet.create({
  seperatorStyle: {
    height: 1,
    width: '100%',
    backgroundColor: "#ddd",
  }
});