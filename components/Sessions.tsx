import { FlatList, StyleSheet, Text, View } from "react-native";
import GlobalColors from "../constants/Colors";
import { useLayoutEffect } from "react";
import Session from "../components/Session";
import Button from "./HeaderButton";

import { useNavigation } from "@react-navigation/native";

const Sessions = ({ sessions }) => {
  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Session
            date={item.date}
            startTime={item.startTime}
            endTime={item.endTime}
            weightAfter={item.weightAfter}
            weightBefore={item.weightBefore}
            notes={item.notes}
            id={item.id}
          />
        )}
      />
    </View>
  );
};

export default Sessions;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalColors.primary300,
  },
});
